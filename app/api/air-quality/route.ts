import { NextRequest, NextResponse } from 'next/server'
import { calculateAQI } from '@/lib/airQuality'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')

    // Mock air quality data (in production, use real API like OpenWeatherMap)
    const mockPollutants = {
      pm25: 25 + Math.random() * 50,
      pm10: 40 + Math.random() * 60,
      o3: 60 + Math.random() * 40,
      no2: 30 + Math.random() * 30,
      so2: 10 + Math.random() * 20,
      co: 500 + Math.random() * 1000
    }

    const aqiData = calculateAQI(mockPollutants)
    
    return NextResponse.json({
      success: true,
      data: {
        location: { lat, lon },
        ...aqiData,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Air quality API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}