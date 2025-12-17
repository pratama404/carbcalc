import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Challenge from '@/models/Challenge'
import User from '@/models/User'

// Challenge templates with carbon impact calculations
const CHALLENGE_TEMPLATES = {
  tree_planting: {
    title: 'Plant Trees',
    description: 'Plant trees in your community',
    carbonImpact: 22, // kg CO2 absorbed per tree per year
    ecoPoints: 50
  },
  waste_donation: {
    title: 'Donate to Waste Bank',
    description: 'Donate recyclable materials to waste bank',
    carbonImpact: 2.5, // kg CO2 saved per kg of waste
    ecoPoints: 20
  },
  recycling: {
    title: 'Recycling Program',
    description: 'Participate in recycling programs',
    carbonImpact: 1.8,
    ecoPoints: 15
  },
  public_transport: {
    title: 'Use Public Transport',
    description: 'Use public transport instead of private vehicle',
    carbonImpact: 4.6, // kg CO2 saved per day
    ecoPoints: 25
  },
  cycling: {
    title: 'Cycle to Work',
    description: 'Use bicycle for daily commute',
    carbonImpact: 5.2,
    ecoPoints: 30
  },
  energy_saving: {
    title: 'Energy Conservation',
    description: 'Implement energy-saving measures at home',
    carbonImpact: 3.5,
    ecoPoints: 20
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { type, evidence, quantity = 1, userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }
    
    if (!CHALLENGE_TEMPLATES[type as keyof typeof CHALLENGE_TEMPLATES]) {
      return NextResponse.json({ error: 'Invalid challenge type' }, { status: 400 })
    }

    const template = CHALLENGE_TEMPLATES[type as keyof typeof CHALLENGE_TEMPLATES]
    
    const challenge = new Challenge({
      userId,
      type,
      title: template.title,
      description: template.description,
      carbonImpact: template.carbonImpact * quantity,
      ecoPoints: template.ecoPoints * quantity,
      status: 'pending',
      evidence
    })

    await challenge.save()
    
    return NextResponse.json({
      success: true,
      data: challenge
    })
  } catch (error) {
    console.error('Challenge creation error:', error)
    return NextResponse.json({ error: 'Failed to create challenge' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const userRole = searchParams.get('userRole')

    let query: any = {}
    
    // Role-based filtering
    if (userRole === 'admin') {
      // Admins can see all challenges
      if (status) query.status = status
    } else {
      // Users can only see their own challenges
      if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 })
      }
      query.userId = userId
      if (status) query.status = status
    }

    const challenges = await Challenge.find(query)
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: challenges
    })
  } catch (error) {
    console.error('Challenge fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}