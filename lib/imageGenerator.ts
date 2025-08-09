import { createCanvas, loadImage } from 'canvas'

export async function generateShareImage(carbonData: any) {
  const canvas = createCanvas(1200, 630) // Social media optimal size
  const ctx = canvas.getContext('2d')

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
  gradient.addColorStop(0, '#667eea')
  gradient.addColorStop(1, '#764ba2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1200, 630)

  // Title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('My Carbon Footprint', 600, 100)

  // Main CO2 value
  ctx.font = 'bold 72px Arial'
  ctx.fillText(`${carbonData.total.toFixed(1)} kg CO2`, 600, 200)

  // Date
  ctx.font = '24px Arial'
  ctx.fillText(`Today: ${new Date().toLocaleDateString()}`, 600, 240)

  // Breakdown bars
  const categories = ['Transportation', 'Energy', 'Food', 'Waste']
  const values = [
    carbonData.breakdown.transportation,
    carbonData.breakdown.energy,
    carbonData.breakdown.food,
    carbonData.breakdown.waste
  ]
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']

  const maxValue = Math.max(...values)
  const barWidth = 200
  const barHeight = 30
  const startY = 320

  categories.forEach((category, index) => {
    const x = 200 + (index * 220)
    const y = startY
    const width = (values[index] / maxValue) * barWidth
    
    // Bar background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.fillRect(x, y, barWidth, barHeight)
    
    // Bar fill
    ctx.fillStyle = colors[index]
    ctx.fillRect(x, y, width, barHeight)
    
    // Category label
    ctx.fillStyle = '#ffffff'
    ctx.font = '18px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(category, x + barWidth/2, y - 10)
    
    // Value label
    ctx.fillText(`${values[index].toFixed(1)} kg`, x + barWidth/2, y + barHeight + 25)
  })

  // Footer
  ctx.font = '20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Track your carbon footprint daily! 🌱', 600, 550)

  return canvas.toBuffer('image/png')
}