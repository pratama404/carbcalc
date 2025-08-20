'use client'

import { useState, useEffect } from 'react'
import { MapPin, Thermometer, Droplets, Wind, Calendar, RefreshCw, Info, X, AlertTriangle } from 'lucide-react'
import { AirQualityData, AirQualityForecast, AQI_LEVELS } from '@/lib/airQuality'

export default function AirQualityDashboard() {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null)
  const [forecast, setForecast] = useState<AirQualityForecast[]>([])
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showPollutantInfo, setShowPollutantInfo] = useState<string | null>(null)
  const [calculatedAQI, setCalculatedAQI] = useState<number>(0)

  const getCurrentLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
          fetchAirQuality(latitude, longitude)
        },
        (error) => {
          setError('Unable to get your location')
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported')
      setLoading(false)
    }
  }

  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      setLoading(true)
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`/api/air-quality?lat=${lat}&lon=${lon}`),
        fetch(`/api/air-quality?lat=${lat}&lon=${lon}&forecast=true`)
      ])

      const currentData = await currentResponse.json()
      const forecastData = await forecastResponse.json()

      if (currentData.success) {
        setAirQuality(currentData.data)
      }
      if (forecastData.success) {
        setForecast(forecastData.data)
      }
      
      // Calculate AQI from current data
      if (currentData.success && currentData.data) {
        const calculatedAQI = calculateAQI(currentData.data)
        setCalculatedAQI(calculatedAQI)
      }
    } catch (error) {
      setError('Failed to fetch air quality data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const calculateAQI = (pollutants: any) => {
    if (!pollutants) return 1
    
    // AQI calculation based on pollutant concentrations
    const pm25AQI = Math.min(Math.floor(pollutants.pm25 / 12 * 50) + 1, 500)
    const pm10AQI = Math.min(Math.floor(pollutants.pm10 / 54 * 50) + 1, 500)
    const coAQI = Math.min(Math.floor(pollutants.co / 4400 * 50) + 1, 500)
    const no2AQI = Math.min(Math.floor(pollutants.no2 / 53 * 50) + 1, 500)
    const so2AQI = Math.min(Math.floor(pollutants.so2 / 35 * 50) + 1, 500)
    const o3AQI = Math.min(Math.floor(pollutants.o3 / 70 * 50) + 1, 500)
    
    return Math.max(pm25AQI, pm10AQI, coAQI, no2AQI, so2AQI, o3AQI)
  }

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { ...AQI_LEVELS[1], level: 1 }
    if (aqi <= 100) return { ...AQI_LEVELS[2], level: 2 }
    if (aqi <= 150) return { ...AQI_LEVELS[3], level: 3 }
    if (aqi <= 200) return { ...AQI_LEVELS[4], level: 4 }
    return { ...AQI_LEVELS[5], level: 5 }
  }

  const getRecommendations = (aqiLevel: number) => {
    const recommendations = {
      1: {
        title: "Good Air Quality",
        actions: [
          "Perfect for outdoor activities",
          "Great time for exercise outside",
          "Open windows for fresh air",
          "Ideal for children to play outdoors"
        ]
      },
      2: {
        title: "Moderate Air Quality", 
        actions: [
          "Generally safe for outdoor activities",
          "Sensitive individuals should limit prolonged outdoor exertion",
          "Consider indoor exercise if you have respiratory issues",
          "Monitor air quality if planning long outdoor activities"
        ]
      },
      3: {
        title: "Unhealthy for Sensitive Groups",
        actions: [
          "Sensitive groups should reduce outdoor activities",
          "Wear N95 masks when going outside",
          "Keep windows closed, use air purifier",
          "Children and elderly should stay indoors"
        ]
      },
      4: {
        title: "Unhealthy Air Quality",
        actions: [
          "Everyone should limit outdoor activities",
          "Wear N95 or P100 masks outdoors",
          "Use air purifiers indoors",
          "Avoid outdoor exercise completely"
        ]
      },
      5: {
        title: "Very Unhealthy Air Quality",
        actions: [
          "Stay indoors as much as possible",
          "Seal windows and doors",
          "Use high-quality air purifiers",
          "Seek medical attention if experiencing symptoms"
        ]
      }
    }
    return recommendations[aqiLevel as keyof typeof recommendations] || recommendations[1]
  }

  const getPollutantInfo = (pollutant: string) => {
    const info = {
      pm25: {
        name: "PM2.5",
        description: "Fine particles smaller than 2.5 micrometers",
        healthEffects: "Can penetrate deep into lungs and bloodstream",
        safeLevel: "< 12 μg/m³",
        dangerLevel: "> 35 μg/m³"
      },
      pm10: {
        name: "PM10", 
        description: "Particles smaller than 10 micrometers",
        healthEffects: "Can cause respiratory irritation",
        safeLevel: "< 54 μg/m³",
        dangerLevel: "> 154 μg/m³"
      },
      co: {
        name: "Carbon Monoxide",
        description: "Colorless, odorless gas from combustion",
        healthEffects: "Reduces oxygen delivery to organs",
        safeLevel: "< 4.4 mg/m³",
        dangerLevel: "> 15.4 mg/m³"
      },
      no2: {
        name: "Nitrogen Dioxide",
        description: "Reddish-brown gas from vehicle emissions",
        healthEffects: "Can cause respiratory problems",
        safeLevel: "< 53 μg/m³",
        dangerLevel: "> 100 μg/m³"
      },
      so2: {
        name: "Sulfur Dioxide",
        description: "Gas from fossil fuel burning",
        healthEffects: "Can trigger asthma attacks",
        safeLevel: "< 35 μg/m³",
        dangerLevel: "> 75 μg/m³"
      },
      o3: {
        name: "Ozone",
        description: "Ground-level ozone from chemical reactions",
        healthEffects: "Can cause breathing difficulties",
        safeLevel: "< 70 μg/m³",
        dangerLevel: "> 147 μg/m³"
      }
    }
    return info[pollutant as keyof typeof info]
  }

  const currentAQI = calculatedAQI || airQuality?.aqi || 1
  const aqiLevel = getAQILevel(currentAQI)
  const recommendations = getRecommendations(aqiLevel.level)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Air Quality Dashboard</h2>
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading && !airQuality && (
        <div className="text-center py-8">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading air quality data...</p>
        </div>
      )}

      {airQuality && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold">{airQuality.location}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className={`inline-block p-6 sm:p-8 rounded-2xl mb-4 ${aqiLevel.bgColor} relative`}>
                  <div className="text-5xl sm:text-6xl font-bold mb-2">{currentAQI}</div>
                  <div className={`px-4 py-2 rounded-full text-lg font-semibold ${aqiLevel.color} text-white mb-2`}>
                    {aqiLevel.label}
                  </div>
                  <p className="text-sm text-gray-600 max-w-xs">
                    {aqiLevel.description}
                  </p>
                  <button
                    onClick={() => setShowRecommendations(true)}
                    className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    title="View Recommendations"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Conditions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <Thermometer className="w-5 h-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="text-xl font-semibold">{airQuality.temperature.toFixed(1)}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="text-xl font-semibold">{airQuality.humidity}%</p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-l-4 ${aqiLevel.level >= 3 ? 'bg-red-50 border-red-400' : aqiLevel.level >= 2 ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-green-400'}`}>
                  <div className="flex items-center">
                    <AlertTriangle className={`w-5 h-5 mr-2 ${aqiLevel.level >= 3 ? 'text-red-500' : aqiLevel.level >= 2 ? 'text-yellow-500' : 'text-green-500'}`} />
                    <p className="font-medium">{recommendations.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{recommendations.actions[0]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Wind className="w-5 h-5 mr-2" />
              Pollutant Levels
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { key: 'pm25', name: 'PM2.5', value: airQuality.pm25, unit: 'μg/m³', color: 'bg-red-100 text-red-700' },
                { key: 'pm10', name: 'PM10', value: airQuality.pm10, unit: 'μg/m³', color: 'bg-orange-100 text-orange-700' },
                { key: 'co', name: 'CO', value: airQuality.co, unit: 'mg/m³', color: 'bg-yellow-100 text-yellow-700' },
                { key: 'no2', name: 'NO₂', value: airQuality.no2, unit: 'μg/m³', color: 'bg-green-100 text-green-700' },
                { key: 'so2', name: 'SO₂', value: airQuality.so2, unit: 'μg/m³', color: 'bg-blue-100 text-blue-700' },
                { key: 'o3', name: 'O₃', value: airQuality.o3, unit: 'μg/m³', color: 'bg-purple-100 text-purple-700' }
              ].map((pollutant) => (
                <div key={pollutant.key} className={`p-3 rounded-lg ${pollutant.color} relative cursor-pointer hover:shadow-md transition-shadow`}
                     onClick={() => setShowPollutantInfo(pollutant.key)}>
                  <div className="text-sm font-medium">{pollutant.name}</div>
                  <div className="text-lg font-bold">{pollutant.value.toFixed(1)}</div>
                  <div className="text-xs">{pollutant.unit}</div>
                  <Info className="w-4 h-4 absolute top-2 right-2 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

          {forecast.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                5-Day Air Quality Forecast
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {forecast.map((day, index) => {
                  const dayAqiLevel = getAQILevel(day.aqi)
                  return (
                    <div key={index} className="text-center p-3 sm:p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <p className="text-sm font-medium text-gray-700 mb-3">{day.date}</p>
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-lg sm:text-xl font-bold ${dayAqiLevel.color}`}>
                        {day.aqi}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700">{dayAqiLevel.label}</p>
                      <p className="text-xs text-gray-500 mt-1">AQI {day.aqi}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Air Quality Index Guide</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(AQI_LEVELS).map(([level, info]) => (
            <div key={level} className={`p-3 rounded-lg text-center ${info.bgColor}`}>
              <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${info.color}`}></div>
              <p className="text-xs font-medium">{info.label}</p>
              <p className="text-xs text-gray-600">AQI {level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Popup */}
      {showRecommendations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{recommendations.title}</h3>
                <button onClick={() => setShowRecommendations(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3">
                {recommendations.actions.map((action, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pollutant Info Popup */}
      {showPollutantInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{getPollutantInfo(showPollutantInfo)?.name}</h3>
                <button onClick={() => setShowPollutantInfo(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{getPollutantInfo(showPollutantInfo)?.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Health Effects</h4>
                  <p className="text-gray-600">{getPollutantInfo(showPollutantInfo)?.healthEffects}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-1">Safe Level</h5>
                    <p className="text-green-600 text-sm">{getPollutantInfo(showPollutantInfo)?.safeLevel}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h5 className="font-medium text-red-800 mb-1">Danger Level</h5>
                    <p className="text-red-600 text-sm">{getPollutantInfo(showPollutantInfo)?.dangerLevel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}