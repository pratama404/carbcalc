'use client'

import { useState, useEffect, useCallback } from 'react'
import { MapPin, Thermometer, Droplets, Wind, Calendar, RefreshCw, Info, X, AlertTriangle, BookOpen, Search } from 'lucide-react'
import { AQI_LEVELS } from '@/lib/airQuality'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import AirQualityGuidePopup from './AirQualityGuidePopup'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AirQualityDashboard() {
  const [airQuality, setAirQuality] = useState<any>(null)
  const [forecast, setForecast] = useState<any[]>([])
  const [location, setLocation] = useState({ lat: 0, lon: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showPollutantInfo, setShowPollutantInfo] = useState<string | null>(null)
  const [calculatedAQI, setCalculatedAQI] = useState<number>(0)
  const [placeName, setPlaceName] = useState('Locating...')
  const [displayCoordinates, setDisplayCoordinates] = useState<string>('')
  const [showGuide, setShowGuide] = useState(false)

  const fetchPlaceName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      const data = await response.json()
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || data.address.county
        const country = data.address.country
        setPlaceName(city ? `${city}, ${country}` : data.display_name.split(',')[0])
      } else {
        setPlaceName(`${lat.toFixed(4)}, ${lon.toFixed(4)}`)
      }
      setDisplayCoordinates(`${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`)
    } catch (e) {
      setPlaceName(`${lat.toFixed(4)}, ${lon.toFixed(4)}`)
      setDisplayCoordinates(`${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`)
    }
  }

  const fetchAirQuality = useCallback(async (lat: number, lon: number, isSearch = false) => {
    try {
      setLoading(true)
      if (!isSearch) {
        fetchPlaceName(lat, lon)
      }

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
  }, [])

  const getCurrentLocation = useCallback(() => {
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
  }, [fetchAirQuality])
  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

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
    if (aqi <= 50) return { ...AQI_LEVELS.GOOD, level: 1 }
    if (aqi <= 100) return { ...AQI_LEVELS.MODERATE, level: 2 }
    if (aqi <= 150) return { ...AQI_LEVELS.UNHEALTHY_SENSITIVE, level: 3 }
    if (aqi <= 200) return { ...AQI_LEVELS.UNHEALTHY, level: 4 }
    return { ...AQI_LEVELS.VERY_UNHEALTHY, level: 5 }
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

  // Find dominant pollutant
  const getDominantPollutant = () => {
    if (!airQuality) return null
    const pollutants = ['pm25', 'pm10', 'co', 'no2', 'so2', 'o3']
    let maxVal = 0
    let dominant = ''
    // This is a simplified logic; ideally use sub-indices
    pollutants.forEach(p => {
      if (airQuality[p] > maxVal) {
        maxVal = airQuality[p]
        dominant = p
      }
    })
    return dominant || 'pm25'
  }
  const dominantPollutant = getDominantPollutant()
  const dominantInfo = dominantPollutant ? getPollutantInfo(dominantPollutant) : null

  // Chart Data
  const chartData = {
    labels: forecast.map(d => new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'AQI Forecast',
        data: forecast.map(d => d.aqi),
        fill: true,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'AQI' }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search city..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-full md:w-64"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value;
                  if (val) {
                    setPlaceName(val);
                    // Simulate fetching new data for this 'city'
                    fetchAirQuality(0, 0);
                  }
                }
              }}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Guide
          </button>
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <AirQualityGuidePopup isOpen={showGuide} onClose={() => setShowGuide(false)} />

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
              <h3 className="text-xl font-semibold">{placeName}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className={`inline-block p-6 sm:p-8 rounded-2xl mb-4 bg-gray-100 relative`}>
                  <div className="text-5xl sm:text-6xl font-bold mb-2">{currentAQI}</div>
                  <div className={`px-4 py-2 rounded-full text-lg font-semibold bg-green-500 text-white mb-2`}>
                    {aqiLevel.label}
                  </div>
                  <p className="text-sm text-gray-600 max-w-xs mb-2">
                    Air Quality Level
                  </p>
                  {dominantInfo && (
                    <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                      Dominant: {dominantInfo.name}
                    </p>
                  )}
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
                      <p className="text-xl font-semibold">{airQuality.temperature?.toFixed(1) ?? 'N/A'}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="text-xl font-semibold">{airQuality.humidity ?? 'N/A'}%</p>
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
                  <div className="text-lg font-bold">{pollutant.value ? pollutant.value.toFixed(1) : 'N/A'}</div>
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

          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

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