'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Award, Target, Calendar, Leaf } from 'lucide-react'

interface DashboardStats {
  totalCO2ThisMonth: number
  totalCO2LastMonth: number
  challengesCompleted: number
  ecoPoints: number
  streak: number
}

export default function DashboardOverview({ userId }: { userId: string }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalCO2ThisMonth: 0,
    totalCO2LastMonth: 0,
    challengesCompleted: 0,
    ecoPoints: 0,
    streak: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchOverview = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/overview?userId=${userId}`)
      const result = await response.json()
      
      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch overview:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchOverview()
    }
  }, [userId])

  const carbonTrend = stats.totalCO2ThisMonth < stats.totalCO2LastMonth ? 'down' : 'up'
  const carbonChange = Math.abs(stats.totalCO2ThisMonth - stats.totalCO2LastMonth)
  const carbonPercentage = ((carbonChange / stats.totalCO2LastMonth) * 100).toFixed(1)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Carbon Impact Dashboard</h2>
        <p className="text-lg text-gray-600">Track your progress and environmental impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Carbon Footprint This Month */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center text-sm ${carbonTrend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {carbonTrend === 'down' ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : (
                <TrendingUp className="w-4 h-4 mr-1" />
              )}
              {carbonPercentage}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalCO2ThisMonth} kg
          </div>
          <div className="text-sm text-gray-600">CO₂ This Month</div>
        </div>

        {/* Challenges Completed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-blue-600 font-medium">+3 this week</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.challengesCompleted}
          </div>
          <div className="text-sm text-gray-600">Challenges Completed</div>
        </div>

        {/* Eco Points */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm text-yellow-600 font-medium">+150 today</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.ecoPoints.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Eco Points</div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-sm text-purple-600 font-medium">🔥</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stats.streak}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-2">🧮</div>
            <div className="text-sm font-medium text-gray-700">Calculate Carbon</div>
          </button>
          <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-sm font-medium text-gray-700">Take Challenge</div>
          </button>
          <button className="p-4 text-center bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <div className="text-2xl mb-2">🌬️</div>
            <div className="text-sm font-medium text-gray-700">Check Air Quality</div>
          </button>
          <button className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-2xl mb-2">📰</div>
            <div className="text-sm font-medium text-gray-700">Read Articles</div>
          </button>
        </div>
      </div>
    </div>
  )
}