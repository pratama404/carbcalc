'use client'

import { useState } from 'react'
import { Share2, Download, Twitter, Instagram } from 'lucide-react'

interface Props {
  carbonData: {
    total: number
    breakdown: {
      transportation: number
      energy: number
      food: number
      waste: number
    }
  }
  airQualityData?: {
    aqi: number
    location: string
    temperature: number
    humidity: number
  }
}

export default function ShareButton({ carbonData, airQualityData }: Props) {
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [shareMode, setShareMode] = useState<'carbon' | 'air' | 'combined'>('carbon')

  const generateShareImage = async (transparent = false) => {
    setLoading(true)
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carbonData,
          airQualityData,
          shareMode,
          transparent,
          format: 'instagram'
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.href = url
        a.download = `environmental-impact-${shareMode}-${new Date().toISOString().split('T')[0]}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to generate share image:', error)
    } finally {
      setLoading(false)
    }
  }

  const getImpactLevel = (total: number) => {
    if (total < 5) return { level: 'EXCELLENT', emoji: '🌟', message: 'Leading by example!' }
    if (total < 15) return { level: 'GOOD', emoji: '🌱', message: 'Making a difference!' }
    if (total < 25) return { level: 'MODERATE', emoji: '⚖️', message: 'Room for improvement!' }
    return { level: 'HIGH', emoji: '🚨', message: 'Time for action!' }
  }

  const getPersonalizedMessage = () => {
    const impact = getImpactLevel(carbonData.total)
    const highest = Object.entries(carbonData.breakdown)
      .sort(([,a], [,b]) => b - a)[0]
    
    const categoryEmojis = {
      transportation: '🚗',
      energy: '⚡',
      food: '🍽️',
      waste: '🗑️'
    }

    const tips = {
      transportation: 'Try biking or public transport! 🚲',
      energy: 'Switch to renewable energy! ☀️',
      food: 'Consider plant-based meals! 🥗',
      waste: 'Reduce, reuse, recycle! ♻️'
    }

    return {
      impact,
      highestCategory: highest[0],
      highestValue: highest[1],
      tip: tips[highest[0] as keyof typeof tips],
      emoji: categoryEmojis[highest[0] as keyof typeof categoryEmojis]
    }
  }

  const getShareContent = () => {
    const analysis = getPersonalizedMessage()
    const globalAvg = 16.4
    const comparison = carbonData.total < globalAvg ? 'below' : 'above'
    const percentage = Math.abs(((carbonData.total - globalAvg) / globalAvg) * 100).toFixed(0)
    
    const getAQIEmoji = (aqi: number) => {
      if (aqi <= 50) return '😊'
      if (aqi <= 100) return '😐'
      if (aqi <= 150) return '😷'
      return '😰'
    }
    
    const carbonContent = `🌍 Carbon: ${carbonData.total.toFixed(1)}kg CO₂ (${percentage}% ${comparison} avg) ${analysis.impact.emoji}
🚗${carbonData.breakdown.transportation.toFixed(1)} ⚡${carbonData.breakdown.energy.toFixed(1)} 🍽️${carbonData.breakdown.food.toFixed(1)} 🗑️${carbonData.breakdown.waste.toFixed(1)}
${analysis.impact.message}`
    
    const airContent = airQualityData ? 
      `🌬️ Air Quality in ${airQualityData.location}: AQI ${airQualityData.aqi} ${getAQIEmoji(airQualityData.aqi)}
🌡️ ${airQualityData.temperature}°C | 💧 ${airQualityData.humidity}%
${airQualityData.aqi <= 50 ? 'Great air today!' : airQualityData.aqi <= 100 ? 'Moderate air quality' : 'Stay safe, wear a mask!'}` : ''
    
    const combinedContent = airQualityData ? 
      `🌍 Today's Impact:
📊 Carbon: ${carbonData.total.toFixed(1)}kg CO₂ ${analysis.impact.emoji}
🌬️ Air Quality: ${airQualityData.aqi} AQI ${getAQIEmoji(airQualityData.aqi)}
📍 ${airQualityData.location}` : carbonContent
    
    switch (shareMode) {
      case 'carbon': return carbonContent
      case 'air': return airContent
      case 'combined': return combinedContent
      default: return carbonContent
    }
  }

  const shareToTwitter = async () => {
    const content = getShareContent()
    const text = `${content}

Track your environmental impact! 👇
#CarbonFootprint #AirQuality #ClimateAction`
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToInstagram = () => {
    // Instagram doesn't support direct sharing via URL, so we'll generate the image for manual sharing
    generateShareImage()
    alert('Image downloaded! You can now share it on Instagram.')
  }

  const copyToClipboard = () => {
    const content = getShareContent()
    const text = `${content}

Track your environmental impact and make a difference! 🌍

#CarbonFootprint #AirQuality #ClimateAction #Sustainability`

    navigator.clipboard.writeText(text).then(() => {
      alert('🎉 Environmental report copied! Ready to inspire others!')
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Results
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
          <div className="p-4">
            <h4 className="font-semibold mb-3">Share Your Environmental Impact</h4>
            
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
              <button
                onClick={() => setShareMode('carbon')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  shareMode === 'carbon' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Carbon
              </button>
              {airQualityData && (
                <button
                  onClick={() => setShareMode('air')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    shareMode === 'air' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Air Quality
                </button>
              )}
              {airQualityData && (
                <button
                  onClick={() => setShareMode('combined')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    shareMode === 'combined' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Combined
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center p-3 text-left hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
              >
                <Twitter className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <div className="font-medium text-gray-900">Share on Twitter/X</div>
                  <div className="text-xs text-gray-500">Engaging report with tips & comparison</div>
                </div>
              </button>
              
              <button
                onClick={shareToInstagram}
                disabled={loading}
                className="w-full flex items-center p-3 text-left hover:bg-pink-50 rounded-lg border border-pink-200 transition-colors disabled:opacity-50"
              >
                <Instagram className="w-5 h-5 mr-3 text-pink-500" />
                <div>
                  <div className="font-medium text-gray-900">{loading ? 'Generating...' : 'Share on Instagram'}</div>
                  <div className="text-xs text-gray-500">Beautiful visual infographic</div>
                </div>
              </button>
              
              <button
                onClick={() => generateShareImage(false)}
                disabled={loading}
                className="w-full flex items-center p-3 text-left hover:bg-green-50 rounded-lg border border-green-200 transition-colors disabled:opacity-50"
              >
                <Download className="w-5 h-5 mr-3 text-green-500" />
                <div>
                  <div className="font-medium text-gray-900">{loading ? 'Generating...' : 'Download Image'}</div>
                  <div className="text-xs text-gray-500">Instagram-style with charts & stats</div>
                </div>
              </button>
              
              <button
                onClick={() => generateShareImage(true)}
                disabled={loading}
                className="w-full flex items-center p-3 text-left hover:bg-purple-50 rounded-lg border border-purple-200 transition-colors disabled:opacity-50"
              >
                <Download className="w-5 h-5 mr-3 text-purple-500" />
                <div>
                  <div className="font-medium text-gray-900">{loading ? 'Generating...' : 'Transparent PNG'}</div>
                  <div className="text-xs text-gray-500">For Instagram stories overlay</div>
                </div>
              </button>
              
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-3 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Copy Enhanced Text</div>
                  <div className="text-xs text-gray-500">Formatted report with insights</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="border-t p-4 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-sm font-medium text-gray-700 mb-1">🌟 Make an Impact!</div>
            <div className="text-xs text-gray-600">
              Your share could inspire friends to start their own carbon tracking journey. 
              Every person matters in fighting climate change! 🌍
            </div>
          </div>
        </div>
      )}

      {showOptions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  )
}