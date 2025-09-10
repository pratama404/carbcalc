// Simple share image generator without canvas dependency
export async function generateShareImage(carbonData: any): Promise<Buffer> {
  // For Vercel deployment, we'll use a simple SVG-based approach
  const svgContent = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="800" height="600" fill="url(#bg)"/>
      
      <!-- Content -->
      <text x="400" y="100" text-anchor="middle" fill="white" font-size="48" font-weight="bold">
        My Carbon Footprint
      </text>
      
      <text x="400" y="200" text-anchor="middle" fill="white" font-size="72" font-weight="bold">
        ${carbonData.total.toFixed(1)} kg CO₂
      </text>
      
      <text x="400" y="250" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="24">
        Daily Carbon Emissions
      </text>
      
      <!-- Breakdown -->
      <text x="200" y="350" fill="white" font-size="20">
        🚗 Transport: ${carbonData.breakdown.transportation.toFixed(1)} kg
      </text>
      <text x="200" y="380" fill="white" font-size="20">
        ⚡ Energy: ${carbonData.breakdown.energy.toFixed(1)} kg
      </text>
      <text x="200" y="410" fill="white" font-size="20">
        🍽️ Food: ${carbonData.breakdown.food.toFixed(1)} kg
      </text>
      <text x="200" y="440" fill="white" font-size="20">
        🗑️ Waste: ${carbonData.breakdown.waste.toFixed(1)} kg
      </text>
      
      <!-- Footer -->
      <text x="400" y="520" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="24">
        Track your impact with CarbCalc
      </text>
      
      <text x="400" y="550" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="18">
        🌱 Making a difference, one calculation at a time
      </text>
    </svg>
  `
  
  // Convert SVG to buffer (simple approach for Vercel)
  return Buffer.from(svgContent, 'utf-8')
}