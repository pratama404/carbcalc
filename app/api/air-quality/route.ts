import { NextRequest, NextResponse } from 'next/server'
import { calculateAQI } from '@/lib/airQuality'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')
    const forecast = searchParams.get('forecast') === 'true'

    // Mock air quality data (in production, use real API like OpenWeatherMap)
    const mockPollutants = {
      pm25: parseFloat((25 + Math.random() * 50).toFixed(1)),
      pm10: parseFloat((40 + Math.random() * 60).toFixed(1)),
      o3: parseFloat((60 + Math.random() * 40).toFixed(1)),
      no2: parseFloat((30 + Math.random() * 30).toFixed(1)),
      so2: parseFloat((10 + Math.random() * 20).toFixed(1)),
      co: parseFloat((500 + Math.random() * 1000).toFixed(0))
    }

    const aqiData = calculateAQI(mockPollutants)

    // Generate mock location name based on coordinates
    const locationName = lat !== 0 && lon !== 0
      ? `Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`
      : 'Your Location'

    // If forecast is requested, return forecast data
    if (forecast) {
      const forecastData = []
      for (let i = 0; i < 5; i++) {
        const date = new Date()
        date.setHours(date.getHours() + i * 3)
        const futurePollutants = {
          pm25: mockPollutants.pm25 + (Math.random() - 0.5) * 10,
          pm10: mockPollutants.pm10 + (Math.random() - 0.5) * 15,
          o3: mockPollutants.o3 + (Math.random() - 0.5) * 10,
          no2: mockPollutants.no2 + (Math.random() - 0.5) * 5,
          so2: mockPollutants.so2 + (Math.random() - 0.5) * 5,
          co: mockPollutants.co + (Math.random() - 0.5) * 200
        }
        const futureAQI = calculateAQI(futurePollutants)
        forecastData.push({
          timestamp: date.toISOString(),
          aqi: futureAQI.aqi,
          level: futureAQI.level,
          ...futurePollutants
        })
      }
      return NextResponse.json({
        success: true,
        data: forecastData
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        location: locationName,
        ...aqiData,
        ...mockPollutants,
        temperature: parseFloat((25 + Math.random() * 10).toFixed(1)), // Mock temperature in Celsius
        humidity: Math.round(60 + Math.random() * 30), // Mock humidity percentage
        windSpeed: parseFloat((5 + Math.random() * 10).toFixed(1)), // Mock wind speed in km/h
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Air quality API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}