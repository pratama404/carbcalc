'use client'

import { useState } from 'react'
import { Share2, Download, Twitter, Instagram } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

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
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [shareMode, setShareMode] = useState<'carbon' | 'air' | 'combined'>('carbon')

  const generateShareImage = async (transparent = false) => {
    setLoading(true)
    try {
      // Create canvas element
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      // Set canvas size (Instagram square)
      canvas.width = 1080
      canvas.height = 1080

      // Background
      if (!transparent) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#10b981')
        gradient.addColorStop(0.5, '#059669')
        gradient.addColorStop(1, '#3b82f6')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Title
      ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
      ctx.font = 'bold 64px Arial'
      ctx.textAlign = 'center'

      if (shareMode === 'combined') {
        ctx.fillText('Environmental Impact', canvas.width / 2, 180)
      } else if (shareMode === 'air') {
        ctx.fillText('Air Quality Report', canvas.width / 2, 180)
      } else {
        ctx.fillText('Carbon Footprint', canvas.width / 2, 180)
      }

      // Carbon data
      if (shareMode !== 'air') {
        ctx.font = 'bold 120px Arial'
        ctx.fillStyle = transparent ? '#ef4444' : '#fef3c7'
        ctx.fillText(`${carbonData.total.toFixed(1)}`, canvas.width / 2, 350)

        ctx.font = 'bold 48px Arial'
        ctx.fillStyle = transparent ? '#6b7280' : '#ffffff'
        ctx.fillText('kg CO₂', canvas.width / 2, 420)

        // Category breakdown
        const categories = [
          { key: 'transportation', emoji: '🚗', color: '#ef4444' },
          { key: 'energy', emoji: '⚡', color: '#f59e0b' },
          { key: 'food', emoji: '🍽️', color: '#10b981' },
          { key: 'waste', emoji: '🗑️', color: '#3b82f6' }
        ]

        categories.forEach((cat, index) => {
          const value = (carbonData.breakdown as any)[cat.key]
          const x = 200 + index * 170
          const y = 600

          // Circle
          ctx.fillStyle = cat.color
          ctx.beginPath()
          ctx.arc(x, y, 40, 0, 2 * Math.PI)
          ctx.fill()

          // Emoji
          ctx.font = '32px Arial'
          ctx.fillText(cat.emoji, x, y + 10)

          // Value
          ctx.font = 'bold 24px Arial'
          ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
          ctx.fillText(`${value.toFixed(1)}kg`, x, y + 70)
        })
      }

      // Air quality data
      if (shareMode !== 'carbon' && airQualityData) {
        const y = shareMode === 'combined' ? 800 : 500

        // AQI Circle
        let aqiColor = '#10b981'
        if (airQualityData.aqi > 150) aqiColor = '#ef4444'
        else if (airQualityData.aqi > 100) aqiColor = '#f59e0b'
        else if (airQualityData.aqi > 50) aqiColor = '#eab308'

        ctx.fillStyle = aqiColor
        ctx.beginPath()
        ctx.arc(canvas.width / 2, y, 80, 0, 2 * Math.PI)
        ctx.fill()

        // AQI number
        ctx.font = 'bold 48px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(airQualityData.aqi.toString(), canvas.width / 2, y + 15)

        // Location
        ctx.font = 'bold 36px Arial'
        ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
        ctx.fillText(airQualityData.location, canvas.width / 2, y + 150)
      }

      // Footer
      ctx.font = 'bold 32px Arial'
      ctx.fillStyle = transparent ? '#6b7280' : 'rgba(255,255,255,0.9)'
      ctx.fillText('Track your environmental impact 🌍', canvas.width / 2, canvas.height - 80)

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const filename = `carbcalc-${shareMode}-${transparent ? 'transparent-' : ''}${new Date().toISOString().split('T')[0]}.png`

          const a = document.createElement('a')
          a.href = url
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)

          setTimeout(() => URL.revokeObjectURL(url), 1000)
          addToast(`✅ PNG image downloaded: ${filename}`, 'success')
        }
      }, 'image/png')

    } catch (error) {
      console.error('Failed to generate share image:', error)
      addToast('❌ Failed to generate PNG image. Please try again.', 'error')
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
      .sort(([, a], [, b]) => b - a)[0]

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
    generateShareImage(false)
    addToast('PNG image downloaded! Perfect for Instagram sharing.', 'success')
  }

  const copyToClipboard = () => {
    const content = getShareContent()
    const text = `${content}

Track your environmental impact and make a difference! 🌍

#CarbonFootprint #AirQuality #ClimateAction #Sustainability`

    navigator.clipboard.writeText(text).then(() => {
      addToast('🎉 Environmental report copied! Ready to inspire others!', 'success')
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
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${shareMode === 'carbon' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
              >
                Carbon
              </button>
              {airQualityData && (
                <button
                  onClick={() => setShareMode('air')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${shareMode === 'air' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  Air Quality
                </button>
              )}
              {airQualityData && (
                <button
                  onClick={() => setShareMode('combined')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${shareMode === 'combined' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
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