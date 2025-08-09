import { NextRequest, NextResponse } from 'next/server'
import { calculateCarbonFootprint } from '@/lib/carbonCalculator'
import { localDB } from '@/lib/localData'

// Force local storage for now to bypass MongoDB issues
let useLocal = true

async function tryMongoDB() {
  // Temporarily disabled MongoDB to debug
  console.log('Using local storage for debugging')
  useLocal = true
  return null
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, ...carbonData } = data
    
    console.log('Received data:', JSON.stringify(data, null, 2))
    
    // Calculate carbon footprint
    console.log('Calculating carbon footprint...')
    const calculation = calculateCarbonFootprint(carbonData)
    console.log('Calculation result:', calculation)
    
    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      // Use MongoDB
      const entry = new mongo.CarbonEntry({
        userId: userId || 'anonymous',
        transportation: carbonData.transportation || {},
        energy: carbonData.energy || {},
        food: carbonData.food || {},
        waste: carbonData.waste || {},
        totalCO2: calculation.total,
        breakdown: calculation.breakdown
      })
      
      await entry.save()
      
      return NextResponse.json({
        success: true,
        data: {
          id: entry._id,
          total: calculation.total,
          breakdown: calculation.breakdown
        }
      })
    } else {
      // Use local storage
      console.log('Using local storage...')
      const entry = localDB.carbonEntries.create({
        userId: userId || 'anonymous',
        ...carbonData,
        totalCO2: calculation.total,
        breakdown: calculation.breakdown
      })
      
      console.log('Created entry:', entry)
      
      return NextResponse.json({
        success: true,
        data: {
          id: entry._id,
          total: calculation.total,
          breakdown: calculation.breakdown
        }
      })
    }
  } catch (error) {
    console.error('Carbon calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate carbon footprint' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'anonymous'
    
    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      // Use MongoDB
      const days = parseInt(searchParams.get('days') || '30')
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      const entries = await mongo.CarbonEntry.find({
        userId,
        createdAt: { $gte: startDate }
      }).sort({ createdAt: -1 })
      
      return NextResponse.json({
        success: true,
        data: entries
      })
    } else {
      // Use local storage
      const entries = localDB.carbonEntries.find({ userId })
      
      return NextResponse.json({
        success: true,
        data: entries
      })
    }
  } catch (error) {
    console.error('Fetch carbon data error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carbon data' },
      { status: 500 }
    )
  }
}