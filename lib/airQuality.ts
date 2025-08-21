// Air Quality Index calculation and analysis
export const AQI_LEVELS = {
  GOOD: { min: 0, max: 50, color: '#00E400', label: 'Good' },
  MODERATE: { min: 51, max: 100, color: '#FFFF00', label: 'Moderate' },
  UNHEALTHY_SENSITIVE: { min: 101, max: 150, color: '#FF7E00', label: 'Unhealthy for Sensitive Groups' },
  UNHEALTHY: { min: 151, max: 200, color: '#FF0000', label: 'Unhealthy' },
  VERY_UNHEALTHY: { min: 201, max: 300, color: '#8F3F97', label: 'Very Unhealthy' },
  HAZARDOUS: { min: 301, max: 500, color: '#7E0023', label: 'Hazardous' }
}

export function calculateAQI(pollutants: {
  pm25?: number
  pm10?: number
  o3?: number
  no2?: number
  so2?: number
  co?: number
}) {
  const aqiValues: number[] = []

  // PM2.5 AQI calculation
  if (pollutants.pm25) {
    aqiValues.push(calculatePollutantAQI(pollutants.pm25, [
      [0, 12, 0, 50],
      [12.1, 35.4, 51, 100],
      [35.5, 55.4, 101, 150],
      [55.5, 150.4, 151, 200],
      [150.5, 250.4, 201, 300],
      [250.5, 500.4, 301, 500]
    ]))
  }

  // PM10 AQI calculation
  if (pollutants.pm10) {
    aqiValues.push(calculatePollutantAQI(pollutants.pm10, [
      [0, 54, 0, 50],
      [55, 154, 51, 100],
      [155, 254, 101, 150],
      [255, 354, 151, 200],
      [355, 424, 201, 300],
      [425, 604, 301, 500]
    ]))
  }

  const maxAQI = Math.max(...aqiValues)
  return {
    aqi: Math.round(maxAQI),
    level: getAQILevel(maxAQI),
    pollutants: pollutants,
    healthRecommendations: getHealthRecommendations(maxAQI)
  }
}

function calculatePollutantAQI(concentration: number, breakpoints: number[][]) {
  for (const [cLow, cHigh, iLow, iHigh] of breakpoints) {
    if (concentration >= cLow && concentration <= cHigh) {
      return ((iHigh - iLow) / (cHigh - cLow)) * (concentration - cLow) + iLow
    }
  }
  return 500 // Maximum AQI
}

function getAQILevel(aqi: number) {
  for (const [key, level] of Object.entries(AQI_LEVELS)) {
    if (aqi >= level.min && aqi <= level.max) {
      return level
    }
  }
  return AQI_LEVELS.HAZARDOUS
}

function getHealthRecommendations(aqi: number) {
  if (aqi <= 50) return ['Air quality is good. Enjoy outdoor activities!']
  if (aqi <= 100) return ['Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.']
  if (aqi <= 150) return ['Sensitive groups should reduce outdoor activities.', 'Consider wearing a mask when outdoors.']
  if (aqi <= 200) return ['Everyone should limit outdoor activities.', 'Wear a mask when going outside.', 'Keep windows closed.']
  if (aqi <= 300) return ['Avoid all outdoor activities.', 'Stay indoors with air purifier.', 'Seek medical attention if experiencing symptoms.']
  return ['Health emergency! Avoid all outdoor exposure.', 'Stay indoors with sealed windows.', 'Seek immediate medical attention if needed.']
}

export function analyzeAirQualityImpact(carbonData: any, location?: string) {
  // Estimate air quality impact based on carbon emissions
  const transportationImpact = carbonData.breakdown.transportation * 0.8
  const energyImpact = carbonData.breakdown.energy * 0.6
  const totalImpact = transportationImpact + energyImpact

  return {
    estimatedPM25Contribution: Math.round(totalImpact * 2.5),
    recommendations: [
      'Reduce vehicle usage to improve local air quality',
      'Switch to renewable energy sources',
      'Use public transportation or cycling',
      'Plant trees to offset emissions'
    ],
    airQualityScore: Math.max(0, 100 - totalImpact * 5)
  }
}