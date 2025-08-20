'use client'

import { useState, useEffect } from 'react'
import { MapPin, Thermometer, Droplets, Wind, Calendar, RefreshCw } from 'lucide-react'
import { AirQualityData, AirQualityForecast, AQI_LEVELS } from '@/lib/airQuality'

export default function AirQualityDashboard() {
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null)
  const [forecast, setForecast] = useState<AirQualityForecast[]>([])
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'current' | 'forecast'>('current')

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
    } catch (error) {
      setError('Failed to fetch air quality data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getAQILevel = (aqi: number) => {
    return AQI_LEVELS[aqi as keyof typeof AQI_LEVELS] || AQI_LEVELS[1]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Air Quality Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'current'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Current
            </button>
            <button
              onClick={() => setActiveTab('forecast')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'forecast'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Forecast
            </button>
          </div>
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
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

      {airQuality && activeTab === 'current' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold">{airQuality.location}</h3>
            </div>
            
            <div className={`inline-block p-8 rounded-2xl mb-4 ${getAQILevel(airQuality.aqi).bgColor}`}>
              <div className="text-6xl font-bold mb-2">{airQuality.aqi}</div>
              <div className={`px-4 py-2 rounded-full text-lg font-semibold ${getAQILevel(airQuality.aqi).color} text-white mb-2`}>
                {getAQILevel(airQuality.aqi).label}
              </div>
              <p className="text-sm text-gray-600 max-w-xs">
                {getAQILevel(airQuality.aqi).description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Weather Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-xl font-semibold">{airQuality.temperature.toFixed(1)}°C</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-xl font-semibold">{airQuality.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Wind className="w-5 h-5 mr-2" />
                Pollutant Levels
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PM2.5</span>
                  <span className="font-semibold">{airQuality.pm25.toFixed(1)} μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PM10</span>
                  <span className="font-semibold">{airQuality.pm10.toFixed(1)} μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CO</span>
                  <span className="font-semibold">{airQuality.co.toFixed(1)} μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">NO₂</span>
                  <span className="font-semibold">{airQuality.no2.toFixed(1)} μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SO₂</span>
                  <span className="font-semibold">{airQuality.so2.toFixed(1)} μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">O₃</span>
                  <span className="font-semibold">{airQuality.o3.toFixed(1)} μg/m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecast.length > 0 && activeTab === 'forecast' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">5-Day Air Quality Forecast</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-3">{day.date}</p>
                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold ${getAQILevel(day.aqi).color}`}>
                  {day.aqi}
                </div>
                <p className="text-sm font-medium text-gray-700">{day.main}</p>
                <p className="text-xs text-gray-500 mt-1">AQI {day.aqi}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Air Quality Index Guide</h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(AQI_LEVELS).map(([level, info]) => (
            <div key={level} className={`p-3 rounded-lg text-center ${info.bgColor}`}>
              <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${info.color}`}></div>
              <p className="text-xs font-medium">{info.label}</p>
              <p className="text-xs text-gray-600">AQI {level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}