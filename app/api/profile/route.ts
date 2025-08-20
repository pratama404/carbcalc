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

    const user = await User.findOne({ email: userId }).select('-password')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate carbon footprint stats
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const lastMonth = new Date(thisMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const [thisMonthEntries, lastMonthEntries, totalChallenges] = await Promise.all([
      CarbonEntry.find({ userId, createdAt: { $gte: thisMonth } }),
      CarbonEntry.find({ userId, createdAt: { $gte: lastMonth, $lt: thisMonth } }),
      Challenge.countDocuments({ userId, status: 'approved' })
    ])

    const thisMonthTotal = thisMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const lastMonthTotal = lastMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const totalCO2 = await CarbonEntry.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$totalCO2' } } }
    ])

    const profile = {
      ...user.toObject(),
      carbonFootprint: {
        total: totalCO2[0]?.total || 0,
        thisMonth: thisMonthTotal,
        lastMonth: lastMonthTotal,
        trend: thisMonthTotal < lastMonthTotal ? 'down' : thisMonthTotal > lastMonthTotal ? 'up' : 'stable'
      },
      achievements: {
        challengesCompleted: totalChallenges,
        carbonSaved: user.achievements?.carbonSaved || 0,
        treesPlanted: user.achievements?.treesPlanted || 0,
        wasteRecycled: user.achievements?.wasteRecycled || 0
      }
    }

    return NextResponse.json({
      success: true,
      data: profile
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { userId, updates } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { email: userId },
      { $set: updates },
      { new: true, select: '-password' }
    )
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}