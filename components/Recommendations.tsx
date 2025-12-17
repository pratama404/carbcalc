'use client'

import { useState, useEffect, useCallback } from 'react'
import { Lightbulb, Plus, CheckCircle } from 'lucide-react'

interface Recommendation {
  title: string
  description: string
  impact: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface Props {
  userId: string
  onAddTodo: (recommendation: Recommendation) => void
}

export default function Recommendations({ userId, onAddTodo }: Props) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRecommendations = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      const result = await response.json()
      if (result.success) {
        setRecommendations(result.data.recommendations)
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchRecommendations()
  }, [fetchRecommendations])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2">Getting AI recommendations...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-semibold">AI Recommendations</h3>
        </div>
        <button
          onClick={fetchRecommendations}
          className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{rec.title}</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                  {rec.difficulty}
                </span>
                <button
                  onClick={() => onAddTodo(rec)}
                  className="text-green-600 hover:text-green-700 p-1"
                  title="Add to todos"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-2">{rec.description}</p>

            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Potential impact: {rec.impact}</span>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Add some carbon footprint data to get personalized recommendations!</p>
        </div>
      )}
    </div>
  )
}