import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/localData'

let useLocal = false

async function tryMongoDB() {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default
    const User = (await import('@/models/User')).default
    const CarbonEntry = (await import('@/models/CarbonEntry')).default
    await dbConnect()
    return { dbConnect, User, CarbonEntry }
  } catch (error) {
    console.log('MongoDB unavailable, using local storage')
    useLocal = true
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 })
    }

    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      const user = await mongo.User.findOne({ email })
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
      }

      const carbonEntries = await mongo.CarbonEntry.find({ userId: email })
      const totalEntries = carbonEntries.length
      const avgCO2 = totalEntries > 0 ? 
        carbonEntries.reduce((sum: number, entry: any) => sum + entry.totalCO2, 0) / totalEntries : 0

      return NextResponse.json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          joinDate: user.joinDate,
          bio: user.bio || '',
          location: user.location || '',
          totalEntries,
          avgCO2: Math.round(avgCO2 * 10) / 10
        }
      })
    } else {
      const carbonEntries = localDB.carbonEntries.find({ userId: email })
      const totalEntries = carbonEntries.length
      const avgCO2 = totalEntries > 0 ? 
        carbonEntries.reduce((sum: number, entry: any) => sum + entry.totalCO2, 0) / totalEntries : 0

      return NextResponse.json({
        success: true,
        data: {
          name: 'Demo User',
          email: email,
          joinDate: new Date(),
          bio: '',
          location: '',
          totalEntries,
          avgCO2: Math.round(avgCO2 * 10) / 10
        }
      })
    }
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { email, name, bio, location } = await request.json()
    
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 })
    }

    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      const user = await mongo.User.findOneAndUpdate(
        { email },
        { name, bio, location },
        { new: true, upsert: true }
      )

      return NextResponse.json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          bio: user.bio,
          location: user.location
        }
      })
    } else {
      return NextResponse.json({
        success: true,
        data: { name, email, bio, location }
      })
    }
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}