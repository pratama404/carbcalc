import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { carbonData, airQualityData, shareMode, transparent, format } = await request.json()
    
    const canvas = await createInstagramImage({
      carbonData,
      airQualityData,
      shareMode,
      transparent,
      format
    })
    
    const buffer = canvas.toBuffer('image/png')
    const uint8Array = new Uint8Array(buffer)
    
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    console.error('Share image generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate share image' },
      { status: 500 }
    )
  }
}

async function createInstagramImage({ carbonData, airQualityData, shareMode, transparent, format }: any) {
  const { createCanvas } = await import('canvas')
  
  const width = 1080
  const height = 1080
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  
  const drawFootprintIcon = (x: number, y: number, size: number, color: string) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(x, y, size * 0.6, size * 0.8, 0, 0, 2 * Math.PI)
    ctx.fill()
    for (let i = 0; i < 5; i++) {
      const toeX = x - size * 0.4 + (i * size * 0.2)
      const toeY = y - size * 0.6
      ctx.beginPath()
      ctx.arc(toeX, toeY, size * 0.1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  
  const drawIndonesiaMap = (x: number, y: number, scale: number) => {
    ctx.strokeStyle = transparent ? '#10b981' : '#ffffff'
    ctx.fillStyle = transparent ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 3
    
    const islands = [
      { x: x - 120 * scale, y: y - 50 * scale, w: 40 * scale, h: 120 * scale },
      { x: x - 60 * scale, y: y + 40 * scale, w: 80 * scale, h: 20 * scale },
      { x: x - 40 * scale, y: y - 80 * scale, w: 100 * scale, h: 100 * scale },
      { x: x + 80 * scale, y: y - 40 * scale, w: 60 * scale, h: 80 * scale },
      { x: x + 160 * scale, y: y - 20 * scale, w: 80 * scale, h: 60 * scale }
    ]
    
    islands.forEach(island => {
      ctx.beginPath()
      ctx.roundRect(island.x, island.y, island.w, island.h, 10 * scale)
      ctx.fill()
      ctx.stroke()
    })
    
    if (airQualityData?.location) {
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(x, y, 8 * scale, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  
  if (!transparent) {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#10b981')
    gradient.addColorStop(0.5, '#059669')
    gradient.addColorStop(1, '#3b82f6')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      drawFootprintIcon(x, y, 20, 'rgba(255, 255, 255, 0.1)')
    }
  }
  
  const contentY = 100
  
  ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
  ctx.font = 'bold 64px Arial'
  ctx.textAlign = 'center'
  
  if (shareMode === 'combined') {
    ctx.fillText('Environmental Impact', width / 2, contentY + 80)
  } else if (shareMode === 'air') {
    ctx.fillText('Air Quality Report', width / 2, contentY + 80)
  } else {
    ctx.fillText('Carbon Footprint', width / 2, contentY + 80)
  }
  
  if (shareMode !== 'air') {
    const carbonY = contentY + 180
    
    drawFootprintIcon(width / 2, carbonY + 60, 80, transparent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.2)')
    
    ctx.font = 'bold 120px Arial'
    ctx.fillStyle = transparent ? '#ef4444' : '#fef3c7'
    ctx.fillText(`${carbonData.total.toFixed(1)}`, width / 2, carbonY + 120)
    
    ctx.font = 'bold 48px Arial'
    ctx.fillStyle = transparent ? '#6b7280' : '#ffffff'
    ctx.fillText('kg CO₂', width / 2, carbonY + 180)
    
    const iconY = carbonY + 300
    const categories = [
      { key: 'transportation', emoji: '🚗', color: '#ef4444' },
      { key: 'energy', emoji: '⚡', color: '#f59e0b' },
      { key: 'food', emoji: '🍽️', color: '#10b981' },
      { key: 'waste', emoji: '🗑️', color: '#3b82f6' }
    ]
    
    categories.forEach((cat, index) => {
      const value = carbonData.breakdown[cat.key]
      const x = 200 + index * 170
      
      ctx.fillStyle = cat.color
      ctx.beginPath()
      ctx.arc(x, iconY, 40, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.font = '32px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(cat.emoji, x, iconY + 10)
      
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
      ctx.fillText(`${value.toFixed(1)}kg`, x, iconY + 70)
    })
  }
  
  if (shareMode !== 'carbon' && airQualityData) {
    const airY = shareMode === 'combined' ? contentY + 600 : contentY + 300
    
    drawIndonesiaMap(width / 2, airY + 100, 1.2)
    
    const centerX = width / 2
    const centerY = airY + 100
    const radius = 80
    
    let aqiColor = '#10b981'
    if (airQualityData.aqi > 150) aqiColor = '#ef4444'
    else if (airQualityData.aqi > 100) aqiColor = '#f59e0b'
    else if (airQualityData.aqi > 50) aqiColor = '#eab308'
    
    ctx.shadowColor = aqiColor
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = aqiColor
    ctx.fill()
    ctx.shadowBlur = 0
    
    ctx.font = 'bold 48px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText(airQualityData.aqi.toString(), centerX, centerY + 15)
    
    ctx.font = 'bold 20px Arial'
    ctx.fillText('AQI', centerX, centerY - 20)
    
    ctx.font = 'bold 36px Arial'
    ctx.fillStyle = transparent ? '#1f2937' : '#ffffff'
    ctx.fillText(`📍 ${airQualityData.location}`, centerX, airY + 250)
    
    ctx.font = '28px Arial'
    ctx.fillText(`🌡️ ${airQualityData.temperature}°C  💧 ${airQualityData.humidity}%`, centerX, airY + 290)
  }
  
  const footprintY = height - 120
  for (let i = 0; i < 5; i++) {
    const x = 200 + i * 160
    const size = 15 - i * 2
    const opacity = 0.8 - i * 0.15
    drawFootprintIcon(x, footprintY, size, transparent ? `rgba(16, 185, 129, ${opacity})` : `rgba(255, 255, 255, ${opacity})`)
  }
  
  ctx.font = 'bold 32px Arial'
  ctx.fillStyle = transparent ? '#6b7280' : 'rgba(255,255,255,0.9)'
  ctx.textAlign = 'center'
  ctx.fillText('Track your environmental impact 🌍', width / 2, height - 80)
  
  ctx.font = '24px Arial'
  ctx.fillText('#CarbonFootprint #ClimateAction #Indonesia', width / 2, height - 40)
  
  return canvas
}