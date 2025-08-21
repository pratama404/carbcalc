import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import CarbonEntry from '@/models/CarbonEntry'
import Challenge from '@/models/Challenge'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const user = await User.findOne({ email }).select('-password')
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate carbon footprint stats
    const thisMonth = new Date()
    thisMonth.setDate(1)
    const lastMonth = new Date(thisMonth)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const [thisMonthEntries, lastMonthEntries, totalChallenges] = await Promise.all([
      CarbonEntry.find({ userId: email, createdAt: { $gte: thisMonth } }),
      CarbonEntry.find({ userId: email, createdAt: { $gte: lastMonth, $lt: thisMonth } }),
      Challenge.countDocuments({ userId: email, status: 'approved' })
    ])

    const thisMonthTotal = thisMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const lastMonthTotal = lastMonthEntries.reduce((sum, entry) => sum + entry.totalCO2, 0)
    const totalCO2 = await CarbonEntry.aggregate([
      { $match: { userId: email } },
      { $group: { _id: null, total: { $sum: '$totalCO2' } } }
    ])

    const profile = {
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      location: user.location || '',
      role: user.role || 'user',
      joinDate: user.joinDate,
      ecoPoints: user.ecoPoints || 0,
      badges: user.badges || [],
      achievements: user.achievements || [],
      challengesCompleted: user.challengesCompleted || totalChallenges,
      totalCO2Saved: user.totalCO2Saved || 0,
      treesPlanted: user.treesPlanted || 0,
      wasteRecycled: user.wasteRecycled || 0,
      totalEntries: thisMonthEntries.length + lastMonthEntries.length,
      avgCO2: thisMonthEntries.length > 0 ? thisMonthTotal / thisMonthEntries.length : 0,
      carbonFootprint: {
        total: totalCO2[0]?.total || 0,
        thisMonth: thisMonthTotal,
        lastMonth: lastMonthTotal,
        trend: thisMonthTotal < lastMonthTotal ? 'down' : thisMonthTotal > lastMonthTotal ? 'up' : 'stable'
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
    
    const { email, name, bio, location } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, bio, location } },
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