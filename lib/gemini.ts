import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getAIRecommendations(carbonData: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `
    Based on this carbon footprint data: ${JSON.stringify(carbonData)}
    
    Provide 3-5 specific, actionable recommendations to reduce carbon emissions.
    Focus on the highest impact areas. Format as a JSON array with objects containing:
    - title: short recommendation title
    - description: detailed explanation
    - impact: estimated CO2 reduction potential
    - difficulty: easy/medium/hard
    
    Return only valid JSON.
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean and parse JSON response
    const cleanText = text.replace(/```json|```/g, '').trim()
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('AI recommendation error:', error)
    return [
      {
        title: "Use Public Transport",
        description: "Replace car trips with public transport to reduce emissions",
        impact: "2-5 kg CO2/day",
        difficulty: "easy"
      }
    ]
  }
}