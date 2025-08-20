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
  1: { 
    label: 'Good', 
    color: 'bg-green-500', 
    textColor: 'text-green-700', 
    bgColor: 'bg-green-50',
    description: 'Air quality is satisfactory for most people'
  },
  2: { 
    label: 'Moderate', 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-700', 
    bgColor: 'bg-yellow-50',
    description: 'Acceptable for most, sensitive individuals may experience minor issues'
  },
  3: { 
    label: 'Unhealthy for Sensitive Groups', 
    color: 'bg-orange-500', 
    textColor: 'text-orange-700', 
    bgColor: 'bg-orange-50',
    description: 'Sensitive groups may experience health effects'
  },
  4: { 
    label: 'Unhealthy', 
    color: 'bg-red-500', 
    textColor: 'text-red-700', 
    bgColor: 'bg-red-50',
    description: 'Everyone may experience health effects'
  },
  5: { 
    label: 'Very Unhealthy', 
    color: 'bg-purple-500', 
    textColor: 'text-purple-700', 
    bgColor: 'bg-purple-50',
    description: 'Health alert: everyone may experience serious health effects'
  }
}

// Calculate unified AQI based on dominant pollutant
function calculateUnifiedAQI(components: any): number {
  const { pm2_5, pm10, co, no2, so2, o3 } = components
  
  // AQI breakpoints for different pollutants (simplified)
  const getAQI = (concentration: number, breakpoints: number[]) => {
    for (let i = 0; i < breakpoints.length; i++) {
      if (concentration <= breakpoints[i]) return i + 1
    }
    return 5
  }
  
  const pm25AQI = getAQI(pm2_5, [12, 35.4, 55.4, 150.4])
  const pm10AQI = getAQI(pm10, [54, 154, 254, 354])
  const coAQI = getAQI(co / 1000, [4.4, 9.4, 12.4, 15.4]) // Convert to mg/m³
  const no2AQI = getAQI(no2, [53, 100, 360, 649])
  const so2AQI = getAQI(so2, [35, 75, 185, 304])
  const o3AQI = getAQI(o3, [54, 70, 85, 105])
  
  return Math.max(pm25AQI, pm10AQI, coAQI, no2AQI, so2AQI, o3AQI)
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
    const unifiedAQI = calculateUnifiedAQI(data.list[0].components)
    
    return {
      aqi: unifiedAQI,
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