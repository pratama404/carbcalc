import { NextRequest, NextResponse } from 'next/server'

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
    const { type, evidence, quantity = 1, userId } = await request.json()
    
    if (!CHALLENGE_TEMPLATES[type as keyof typeof CHALLENGE_TEMPLATES]) {
      return NextResponse.json({ error: 'Invalid challenge type' }, { status: 400 })
    }

    const template = CHALLENGE_TEMPLATES[type as keyof typeof CHALLENGE_TEMPLATES]
    
    // For local storage (replace with MongoDB when ready)
    const challenge = {
      _id: Date.now().toString(),
      userId: userId || 'anonymous',
      type,
      title: template.title,
      description: template.description,
      carbonImpact: template.carbonImpact * quantity,
      ecoPoints: template.ecoPoints * quantity,
      status: 'pending',
      evidence,
      createdAt: new Date()
    }

    // Store in local storage for now
    // TODO: Replace with MongoDB when schema is fixed
    
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
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'anonymous'
    const status = searchParams.get('status')

    // Mock data for now
    const challenges = [
      {
        _id: '1',
        userId,
        type: 'tree_planting',
        title: 'Plant Trees',
        carbonImpact: 22,
        ecoPoints: 50,
        status: 'approved',
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        _id: '2',
        userId,
        type: 'cycling',
        title: 'Cycle to Work',
        carbonImpact: 5.2,
        ecoPoints: 30,
        status: 'pending',
        createdAt: new Date()
      }
    ]

    const filteredChallenges = status 
      ? challenges.filter(c => c.status === status)
      : challenges

    return NextResponse.json({
      success: true,
      data: filteredChallenges
    })
  } catch (error) {
    console.error('Challenge fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 })
  }
}