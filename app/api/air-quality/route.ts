import { NextRequest, NextResponse } from 'next/server'
import { getAirQuality, getAirQualityForecast } from '@/lib/airQuality'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')
    const forecast = searchParams.get('forecast') === 'true'

    if (!lat || !lon) {
      return NextResponse.json({ error: 'Latitude and longitude required' }, { status: 400 })
    }

    if (forecast) {
      const forecastData = await getAirQualityForecast(lat, lon)
      return NextResponse.json({ success: true, data: forecastData })
    } else {
      const airQualityData = await getAirQuality(lat, lon)
      if (!airQualityData) {
        return NextResponse.json({ error: 'Failed to fetch air quality data' }, { status: 500 })
      }
      return NextResponse.json({ success: true, data: airQualityData })
    }
  } catch (error) {
    console.error('Air quality API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}