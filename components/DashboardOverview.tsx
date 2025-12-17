'use client'

import { useState, useEffect, useCallback } from 'react'
import { TrendingUp, TrendingDown, Award, Target, Calendar, Leaf, Calculator, Trophy, Wind, BookOpen, Zap, Car, Utensils, Trash2, Info, ArrowRight, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  totalCO2ThisMonth: number
  totalCO2LastMonth: number
  challengesCompleted: number
  totalChallenges: number
  ecoPoints: number
  streak: number
  carbonSaved: number
  recentActivity: number
  trend: 'up' | 'down' | 'stable'
  breakdown?: {
    transportation: number
    energy: number
    food: number
    waste: number
  }
}

export default function DashboardOverview({ userId }: { userId: string }) {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalCO2ThisMonth: 0,
    totalCO2LastMonth: 0,
    challengesCompleted: 0,
    totalChallenges: 0,
    ecoPoints: 0,
    streak: 0,
    carbonSaved: 0,
    recentActivity: 0,
    trend: 'stable'
  })
  const [loading, setLoading] = useState(true)
  const [showInsights, setShowInsights] = useState(false)

  const fetchOverview = useCallback(async () => {
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
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchOverview()
    }
  }, [userId, fetchOverview])

  const carbonChange = Math.abs(stats.totalCO2ThisMonth - stats.totalCO2LastMonth)
  const carbonPercentage = stats.totalCO2LastMonth > 0 ? ((carbonChange / stats.totalCO2LastMonth) * 100).toFixed(1) : '0'

  const getImpactLevel = (co2: number) => {
    if (co2 < 100) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' }
    if (co2 < 300) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (co2 < 500) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { level: 'High Impact', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const impactLevel = getImpactLevel(stats.totalCO2ThisMonth)

  const getRecommendations = () => {
    const recs = []
    if (stats.totalCO2ThisMonth > 300) {
      recs.push('Consider using public transport more often')
      recs.push('Try reducing meat consumption by 1 day per week')
    }
    if (stats.streak < 7) {
      recs.push('Build a daily tracking habit for better insights')
    }
    if (stats.challengesCompleted < 3) {
      recs.push('Complete more challenges to earn eco points')
    }
    return recs.slice(0, 3)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border animate-pulse">
            <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded mb-1 sm:mb-2"></div>
            <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Carbon Impact Dashboard</h2>
        <p className="text-lg text-gray-600 mb-4">Track your progress and environmental impact</p>

        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${impactLevel.bg} ${impactLevel.color}`}>
          <Leaf className="w-4 h-4 mr-2" />
          Current Impact Level: {impactLevel.level}
        </div>

        <button
          onClick={() => setShowInsights(true)}
          className="ml-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          View Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Carbon Footprint This Month */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className={`flex items-center text-xs sm:text-sm font-medium ${stats.trend === 'down' ? 'text-green-600' : stats.trend === 'up' ? 'text-red-600' : 'text-gray-600'}`}>
              {stats.trend === 'down' ? (
                <><TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> -{carbonPercentage}%</>
              ) : stats.trend === 'up' ? (
                <><TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> +{carbonPercentage}%</>
              ) : (
                <span className="text-gray-500">No change</span>
              )}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.totalCO2ThisMonth.toFixed(1)} <span className="text-sm sm:text-base font-normal text-gray-600">kg CO₂</span>
          </div>
          <div className="text-sm text-gray-600">This Month</div>
          <div className="mt-2 text-xs text-gray-500">
            vs {stats.totalCO2LastMonth.toFixed(1)} kg last month
          </div>
        </div>

        {/* Challenges Completed */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="text-xs sm:text-sm text-blue-600 font-medium">
              {stats.totalChallenges > 0 ? `${Math.round((stats.challengesCompleted / stats.totalChallenges) * 100)}%` : '0%'}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.challengesCompleted}
            <span className="text-sm font-normal text-gray-600">/{stats.totalChallenges}</span>
          </div>
          <div className="text-sm text-gray-600">Challenges</div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalChallenges > 0 ? (stats.challengesCompleted / stats.totalChallenges) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Eco Points */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div className="text-xs sm:text-sm text-yellow-600 font-medium">
              {stats.challengesCompleted * 50} earned
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.ecoPoints > 999 ? `${(stats.ecoPoints / 1000).toFixed(1)}k` : stats.ecoPoints}
          </div>
          <div className="text-sm text-gray-600">Eco Points</div>
          <div className="mt-2 text-xs text-gray-500">
            Next reward at {Math.ceil(stats.ecoPoints / 1000) * 1000} points
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div className="text-lg">{stats.streak > 0 ? '🔥' : '📊'}</div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {stats.streak}
            <span className="text-sm font-normal text-gray-600"> days</span>
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
          <div className="mt-2 text-xs text-gray-500">
            {stats.streak > 0 ? 'Keep it up!' : 'Start tracking daily'}
          </div>
        </div>
      </div>

      {/* Carbon Saved Impact */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Environmental Impact</h3>
          <div className="text-4xl font-bold mb-2">{stats.carbonSaved.toFixed(1)} kg CO₂</div>
          <p className="text-green-100 mb-4">Total Carbon Saved Through Your Actions</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{Math.round(stats.carbonSaved * 2.3)}</div>
              <div className="text-xs text-green-100">Miles driven equivalent</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(stats.carbonSaved * 0.04)}</div>
              <div className="text-xs text-green-100">Trees planted equivalent</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(stats.carbonSaved * 0.5)}</div>
              <div className="text-xs text-green-100">Plastic bottles saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/dashboard/calculator')}
            className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-all hover:scale-105 group"
          >
            <Calculator className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-medium text-gray-700">Calculate Carbon</div>
            <div className="text-xs text-gray-500 mt-1">Track daily emissions</div>
          </button>
          <button
            onClick={() => router.push('/dashboard/challenges')}
            className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-all hover:scale-105 group"
          >
            <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-medium text-gray-700">Take Challenge</div>
            <div className="text-xs text-gray-500 mt-1">Earn eco points</div>
          </button>
          <button
            onClick={() => router.push('/dashboard/air-quality')}
            className="p-4 text-center bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all hover:scale-105 group"
          >
            <Wind className="w-8 h-8 mx-auto mb-2 text-yellow-600 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-medium text-gray-700">Air Quality</div>
            <div className="text-xs text-gray-500 mt-1">Check local AQI</div>
          </button>
          <button
            onClick={() => router.push('/dashboard/articles')}
            className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-all hover:scale-105 group"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-medium text-gray-700">Articles</div>
            <div className="text-xs text-gray-500 mt-1">Learn & explore</div>
          </button>
        </div>
      </div>

      {/* Insights Modal */}
      {showInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                  Your Carbon Insights
                </h3>
                <button onClick={() => setShowInsights(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Impact Assessment */}
                <div className={`p-4 rounded-lg ${impactLevel.bg} border border-opacity-20`}>
                  <h4 className={`font-semibold mb-2 ${impactLevel.color}`}>Current Impact: {impactLevel.level}</h4>
                  <p className="text-sm text-gray-700">
                    Your monthly carbon footprint is {stats.totalCO2ThisMonth.toFixed(1)} kg CO₂.
                    {stats.trend === 'down' ?
                      `Great job! You&apos;ve reduced your emissions by ${carbonPercentage}% compared to last month.` :
                      stats.trend === 'up' ?
                        `Your emissions increased by ${carbonPercentage}% from last month. Let&apos;s work on reducing them.` :
                        'Your emissions are stable compared to last month.'}
                  </p>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personalized Recommendations</h4>
                  <div className="space-y-3">
                    {getRecommendations().map((rec, index) => (
                      <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">This Month&apos;s Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{stats.recentActivity}</div>
                      <div className="text-sm text-gray-600">Entries Logged</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{stats.challengesCompleted}</div>
                      <div className="text-sm text-gray-600">Challenges Done</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}