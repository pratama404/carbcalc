import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function getAIRecommendations(carbonData: any) {
  // If no API key, return default recommendations
  if (!genAI || !apiKey) {
    return [
      {
        title: "Use Public Transport",
        description: "Replace car trips with public transport to reduce emissions",
        impact: "2-5 kg CO2/day",
        difficulty: "easy",
        icon: "🚌"
      },
      {
        title: "Reduce Meat Consumption",
        description: "Try plant-based meals 2-3 times per week",
        impact: "3-7 kg CO2/week",
        difficulty: "medium",
        icon: "🥗"
      },
      {
        title: "Switch to LED Bulbs",
        description: "Replace incandescent bulbs with energy-efficient LEDs",
        impact: "1-2 kg CO2/month",
        difficulty: "easy",
        icon: "💡"
      }
    ]
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
      Based on this carbon footprint data: ${JSON.stringify(carbonData)}
      
      Provide 3-5 specific, actionable recommendations to reduce carbon emissions.
      Focus on the highest impact areas. Format as a JSON array with objects containing:
      - title: short recommendation title
      - description: detailed explanation
      - impact: estimated CO2 reduction potential
      - difficulty: easy/medium/hard
      - icon: emoji icon
      
      Return only valid JSON.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean and parse JSON response
    const cleanText = text.replace(/```json|```/g, '').trim()
    const recommendations = JSON.parse(cleanText)
    
    // Ensure recommendations have icon
    return recommendations.map((rec: any) => ({
      ...rec,
      icon: rec.icon || '🌱'
    }))
  } catch (error) {
    console.error('AI recommendation error:', error)
    return [
      {
        title: "Use Public Transport",
        description: "Replace car trips with public transport to reduce emissions",
        impact: "2-5 kg CO2/day",
        difficulty: "easy",
        icon: "🚌"
      },
      {
        title: "Reduce Meat Consumption",
        description: "Try plant-based meals 2-3 times per week",
        impact: "3-7 kg CO2/week",
        difficulty: "medium",
        icon: "🥗"
      }
    ]
  }
}