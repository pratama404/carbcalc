import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import CarbonEntry from '@/models/CarbonEntry'
import Challenge from '@/models/Challenge'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await User.findOne({ email: userId })
    if (!user) {
      // If user doesn't exist, return empty overview (user might be new)
      return NextResponse.json({
        success: true,
        data: {
          totalCO2ThisMonth: 0,
          totalCO2LastMonth: 0,
          challengesCompleted: 0,
          totalChallenges: 0,
          ecoPoints: 0,
          streak: 0,
          carbonSaved: 0,
          recentActivity: 0,
          trend: 'stable'
        }
      })
    }

    // Calculate this month's data
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const lastMonth = new Date(thisMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const [
      thisMonthEntries,
      lastMonthEntries,
      totalChallenges,
      approvedChallenges,
      totalCarbonSaved
    ] = await Promise.all([
      CarbonEntry.find({ userId, createdAt: { $gte: thisMonth } }),
      CarbonEntry.find({ userId, createdAt: { $gte: lastMonth, $lt: thisMonth } }),
      Challenge.countDocuments({ userId }),
      Challenge.countDocuments({ userId, status: 'approved' }),
      Challenge.aggregate([
        { $match: { userId, status: 'approved' } },
        { $group: { _id: null, total: { $sum: '$carbonImpact' } } }
      ])
    ])

    const thisMonthCO2 = thisMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const lastMonthCO2 = lastMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const carbonSaved = totalCarbonSaved[0]?.total || 0

    // Calculate streak (consecutive days with entries)
    const recentEntries = await CarbonEntry.find({ userId })
      .sort({ createdAt: -1 })
      .limit(30)
    
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const hasEntry = recentEntries.some(entry => 
        entry.createdAt.toDateString() === checkDate.toDateString()
      )
      if (hasEntry) {
        streak++
      } else if (i > 0) {
        break
      }
    }

    const overview = {
      totalCO2ThisMonth: thisMonthCO2,
      totalCO2LastMonth: lastMonthCO2,
      challengesCompleted: approvedChallenges,
      totalChallenges,
      ecoPoints: user.ecoPoints || 0,
      streak,
      carbonSaved,
      recentActivity: thisMonthEntries.length,
      trend: thisMonthCO2 < lastMonthCO2 ? 'down' : thisMonthCO2 > lastMonthCO2 ? 'up' : 'stable'
    }

    return NextResponse.json({
      success: true,
      data: overview
    })
  } catch (error) {
    console.error('Overview fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch overview' }, { status: 500 })
  }
}