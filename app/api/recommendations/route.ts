import { NextRequest, NextResponse } from 'next/server'
import { getAIRecommendations } from '@/lib/gemini'
import { localDB } from '@/lib/localData'

// Try MongoDB first, fallback to local storage
let useLocal = false

async function tryMongoDB() {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default
    const CarbonEntry = (await import('@/models/CarbonEntry')).default
    await dbConnect()
    return { dbConnect, CarbonEntry }
  } catch (error) {
    console.log('MongoDB unavailable, using local storage')
    useLocal = true
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
    const mongo = await tryMongoDB()
    let recentEntries: any[] = []
    
    if (mongo && !useLocal) {
      // Get recent carbon data from MongoDB
      recentEntries = await mongo.CarbonEntry.find({
        userId: userId || 'anonymous'
      })
      .sort({ createdAt: -1 })
      .limit(7) // Last 7 days
    } else {
      // Get recent carbon data from local storage
      recentEntries = localDB.carbonEntries.find({ userId: userId || 'anonymous' }).slice(0, 7)
    }
    
    if (recentEntries.length === 0) {
      // Return default recommendations if no data
      const defaultRecommendations = [
        {
          title: "Use Public Transport",
          description: "Replace car trips with public transport to reduce emissions",
          impact: "2-5 kg CO2/day",
          difficulty: "easy"
        },
        {
          title: "Reduce Meat Consumption",
          description: "Try plant-based meals 2-3 times per week",
          impact: "3-7 kg CO2/week",
          difficulty: "medium"
        },
        {
          title: "Switch to LED Bulbs",
          description: "Replace incandescent bulbs with energy-efficient LEDs",
          impact: "1-2 kg CO2/month",
          difficulty: "easy"
        }
      ]
      
      return NextResponse.json({
        success: true,
        data: {
          recommendations: defaultRecommendations,
          analysis: { message: "Add carbon data to get personalized recommendations" }
        }
      })
    }
    
    // Calculate averages and trends
    const avgData = {
      totalCO2: recentEntries.reduce((sum, entry) => sum + entry.totalCO2, 0) / recentEntries.length,
      breakdown: {
        transportation: recentEntries.reduce((sum, entry) => sum + entry.breakdown.transportation, 0) / recentEntries.length,
        energy: recentEntries.reduce((sum, entry) => sum + entry.breakdown.energy, 0) / recentEntries.length,
        food: recentEntries.reduce((sum, entry) => sum + entry.breakdown.food, 0) / recentEntries.length,
        waste: recentEntries.reduce((sum, entry) => sum + entry.breakdown.waste, 0) / recentEntries.length
      },
      trend: recentEntries.length > 1 ? 
        (recentEntries[0].totalCO2 - recentEntries[recentEntries.length - 1].totalCO2) / recentEntries.length : 0
    }
    
    // Get AI recommendations
    const recommendations = await getAIRecommendations(avgData)
    
    return NextResponse.json({
      success: true,
      data: {
        recommendations,
        analysis: avgData
      }
    })
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}