export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  co: number
  no2: number
  so2: number
  o3: number
  temperature: number
  humidity: number
  location: string
}

export interface AirQualityForecast {
  date: string
  aqi: number
  main: string
}

export const AQI_LEVELS = {
  1: { label: 'Good', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  2: { label: 'Fair', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  3: { label: 'Moderate', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50' },
  4: { label: 'Poor', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  5: { label: 'Very Poor', color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' }
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQualityData | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) return null
    
    const data = await response.json()
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    )
    
    const weatherData = await weatherResponse.json()
    
    return {
      aqi: data.list[0].main.aqi,
      pm25: data.list[0].components.pm2_5,
      pm10: data.list[0].components.pm10,
      co: data.list[0].components.co,
      no2: data.list[0].components.no2,
      so2: data.list[0].components.so2,
      o3: data.list[0].components.o3,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      location: weatherData.name
    }
  } catch (error) {
    console.error('Air quality fetch error:', error)
    return null
  }
}

export async function getAirQualityForecast(lat: number, lon: number): Promise<AirQualityForecast[]> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) return []
    
    const data = await response.json()
    
    return data.list.slice(0, 5).map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      aqi: item.main.aqi,
      main: AQI_LEVELS[item.main.aqi as keyof typeof AQI_LEVELS].label
    }))
  } catch (error) {
    console.error('Air quality forecast error:', error)
    return []
  }
}