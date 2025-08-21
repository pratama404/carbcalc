'use client'

import { useState, useEffect } from 'react'
import { Wind, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { calculateAQI, analyzeAirQualityImpact, AQI_LEVELS } from '@/lib/airQuality'

interface AirQualityAnalysisProps {
  carbonData?: any
  location?: string
}

export default function AirQualityAnalysis({ carbonData, location }: AirQualityAnalysisProps) {
  const [aqiData, setAqiData] = useState<any>(null)
  const [impactAnalysis, setImpactAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (carbonData) {
      // Simulate air quality data (in real app, fetch from API)
      const mockPollutants = {
        pm25: 25 + (carbonData.total * 2), // Simulate impact
        pm10: 40 + (carbonData.total * 3),
        o3: 60,
        no2: 30
      }
      
      const aqi = calculateAQI(mockPollutants)
      const impact = analyzeAirQualityImpact(carbonData, location)
      
      setAqiData(aqi)
      setImpactAnalysis(impact)
      setLoading(false)
    }
  }, [carbonData, location])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!aqiData || !impactAnalysis) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <Wind className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No carbon data available for air quality analysis</p>
      </div>
    )
  }

  const getStatusIcon = (aqi: number) => {
    if (aqi <= 50) return <CheckCircle className="w-6 h-6 text-green-500" />
    if (aqi <= 100) return <Info className="w-6 h-6 text-yellow-500" />
    return <AlertTriangle className="w-6 h-6 text-red-500" />
  }

  return (
    <div className="space-y-6">
      {/* AQI Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Wind className="w-6 h-6 text-blue-500 mr-2" />
            Air Quality Analysis
          </h3>
          {getStatusIcon(aqiData.aqi)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* AQI Score */}
          <div className="text-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: aqiData.level.color + '20', border: `3px solid ${aqiData.level.color}` }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: aqiData.level.color }}>
                  {aqiData.aqi}
                </div>
                <div className="text-sm text-gray-600">AQI</div>
              </div>
            </div>
            <div className="font-semibold text-gray-900">{aqiData.level.label}</div>
          </div>

          {/* Personal Impact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Your Carbon Impact on Air Quality</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Personal Air Quality Score:</span>
                <span className="font-semibold text-green-600">
                  {impactAnalysis.airQualityScore.toFixed(0)}/100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. PM2.5 Contribution:</span>
                <span className="font-semibold text-orange-600">
                  {impactAnalysis.estimatedPM25Contribution} μg/m³
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${impactAnalysis.airQualityScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Health Recommendations</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">General Health Advice</h5>
            <ul className="space-y-2">
              {aqiData.healthRecommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Reduce Your Impact</h5>
            <ul className="space-y-2">
              {impactAnalysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pollutant Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Pollutant Levels</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(aqiData.pollutants).map(([pollutant, value]) => (
            <div key={pollutant} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700 uppercase">{pollutant}</span>
              <span className="text-lg font-semibold text-gray-900">
                {(value as number).toFixed(1)} μg/m³
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}