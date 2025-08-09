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
}

export default function ShareButton({ carbonData }: Props) {
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const generateShareImage = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carbonData)
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        // Create download link
        const a = document.createElement('a')
        a.href = url
        a.download = `carbon-footprint-${new Date().toISOString().split('T')[0]}.png`
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

  const shareToTwitter = async () => {
    const text = `My daily carbon footprint: ${carbonData.total.toFixed(1)} kg CO2 🌱\n\nBreakdown:\n🚗 Transportation: ${carbonData.breakdown.transportation.toFixed(1)} kg\n⚡ Energy: ${carbonData.breakdown.energy.toFixed(1)} kg\n🍽️ Food: ${carbonData.breakdown.food.toFixed(1)} kg\n🗑️ Waste: ${carbonData.breakdown.waste.toFixed(1)} kg\n\nTrack yours too! #CarbonFootprint #ClimateAction`
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToInstagram = () => {
    // Instagram doesn't support direct sharing via URL, so we'll generate the image for manual sharing
    generateShareImage()
    alert('Image downloaded! You can now share it on Instagram.')
  }

  const copyToClipboard = () => {
    const text = `My daily carbon footprint: ${carbonData.total.toFixed(1)} kg CO2 🌱

Breakdown:
🚗 Transportation: ${carbonData.breakdown.transportation.toFixed(1)} kg
⚡ Energy: ${carbonData.breakdown.energy.toFixed(1)} kg
🍽️ Food: ${carbonData.breakdown.food.toFixed(1)} kg
🗑️ Waste: ${carbonData.breakdown.waste.toFixed(1)} kg

Every small action counts for our planet! #CarbonFootprint #ClimateAction`

    navigator.clipboard.writeText(text).then(() => {
      alert('Carbon footprint data copied to clipboard!')
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
            <h4 className="font-semibold mb-3">Share Your Carbon Footprint</h4>
            
            <div className="space-y-2">
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center p-2 text-left hover:bg-gray-100 rounded"
              >
                <Twitter className="w-4 h-4 mr-3 text-blue-400" />
                Share on Twitter/X
              </button>
              
              <button
                onClick={shareToInstagram}
                disabled={loading}
                className="w-full flex items-center p-2 text-left hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <Instagram className="w-4 h-4 mr-3 text-pink-500" />
                {loading ? 'Generating...' : 'Share on Instagram'}
              </button>
              
              <button
                onClick={generateShareImage}
                disabled={loading}
                className="w-full flex items-center p-2 text-left hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-3 text-green-500" />
                {loading ? 'Generating...' : 'Download Image'}
              </button>
              
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center p-2 text-left hover:bg-gray-100 rounded"
              >
                <Share2 className="w-4 h-4 mr-3 text-gray-500" />
                Copy Text
              </button>
            </div>
          </div>
          
          <div className="border-t p-3 text-xs text-gray-500">
            Share your progress and inspire others to track their carbon footprint!
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