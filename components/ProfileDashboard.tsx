'use client'

import { useState, useEffect } from 'react'
import { User, Award, TrendingDown, TrendingUp, Calendar, MapPin, Edit3, Camera } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface UserProfile {
  name: string
  email: string
  role: string
  ecoPoints: number
  badges: Array<{
    type: string
    name: string
    description: string
    earnedAt: string
    icon: string
  }>
  carbonFootprint: {
    total: number
    thisMonth: number
    lastMonth: number
    trend: 'up' | 'down' | 'stable'
  }
  achievements: {
    challengesCompleted: number
    carbonSaved: number
    treesPlanted: number
    wasteRecycled: number
  }
}

const AVAILABLE_BADGES = {
  public_transport_buddy: {
    name: 'Public Transport Buddy',
    description: 'Used public transport 10 times',
    icon: '🚌',
    color: 'bg-blue-100 text-blue-700'
  },
  fun_cyclist: {
    name: 'Fun Cyclist',
    description: 'Cycled to work 15 times',
    icon: '🚴',
    color: 'bg-green-100 text-green-700'
  },
  recycling_hero: {
    name: 'Recycling Hero',
    description: 'Recycled 50kg of waste',
    icon: '♻️',
    color: 'bg-purple-100 text-purple-700'
  },
  carbon_ambassador: {
    name: 'Carbon Ambassador',
    description: 'Saved 100kg CO2 equivalent',
    icon: '🌱',
    color: 'bg-emerald-100 text-emerald-700'
  },
  tree_planter: {
    name: 'Tree Planter',
    description: 'Planted 5 trees',
    icon: '🌳',
    color: 'bg-green-100 text-green-700'
  },
  energy_saver: {
    name: 'Energy Saver',
    description: 'Reduced energy consumption by 20%',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-700'
  }
}

export default function ProfileDashboard() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock profile data (replace with API call)
  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || 'User',
        email: session.user.email || '',
        role: 'Eco Enthusiast',
        ecoPoints: 1250,
        badges: [
          {
            type: 'public_transport_buddy',
            name: 'Public Transport Buddy',
            description: 'Used public transport 10 times',
            earnedAt: '2024-01-15',
            icon: '🚌'
          },
          {
            type: 'recycling_hero',
            name: 'Recycling Hero',
            description: 'Recycled 50kg of waste',
            earnedAt: '2024-01-20',
            icon: '♻️'
          },
          {
            type: 'carbon_ambassador',
            name: 'Carbon Ambassador',
            description: 'Saved 100kg CO2 equivalent',
            earnedAt: '2024-02-01',
            icon: '🌱'
          }
        ],
        carbonFootprint: {
          total: 2.4,
          thisMonth: 2.1,
          lastMonth: 2.7,
          trend: 'down'
        },
        achievements: {
          challengesCompleted: 12,
          carbonSaved: 156.8,
          treesPlanted: 8,
          wasteRecycled: 45.2
        }
      })
      setLoading(false)
    }
  }, [session])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!profile) return null

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'down':
        return <TrendingDown className="w-5 h-5 text-green-600" />
      case 'up':
        return <TrendingUp className="w-5 h-5 text-red-600" />
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'down':
        return 'text-green-600'
      case 'up':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Profile Dashboard</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-gray-600">{profile.email}</p>
            <div className="flex items-center mt-2">
              <Award className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">{profile.role}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-green-600 font-semibold">{profile.ecoPoints} Eco Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Footprint Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Carbon Footprint Overview</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {profile.carbonFootprint.total} kg
            </div>
            <p className="text-sm text-gray-600">Total This Year</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <span className="text-2xl font-bold text-gray-900 mr-2">
                {profile.carbonFootprint.thisMonth} kg
              </span>
              {getTrendIcon(profile.carbonFootprint.trend)}
            </div>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold mb-1 ${getTrendColor(profile.carbonFootprint.trend)}`}>
              {profile.carbonFootprint.trend === 'down' ? '-' : '+'}
              {Math.abs(profile.carbonFootprint.thisMonth - profile.carbonFootprint.lastMonth).toFixed(1)} kg
            </div>
            <p className="text-sm text-gray-600">vs Last Month</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {profile.achievements.challengesCompleted}
            </div>
            <p className="text-sm text-gray-600">Challenges Completed</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {profile.achievements.carbonSaved} kg
            </div>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </div>
          
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {profile.achievements.treesPlanted}
            </div>
            <p className="text-sm text-gray-600">Trees Planted</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {profile.achievements.wasteRecycled} kg
            </div>
            <p className="text-sm text-gray-600">Waste Recycled</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Earned Badges</h3>
        
        {profile.badges.length === 0 ? (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No badges earned yet</p>
            <p className="text-sm text-gray-500">Complete challenges to earn your first badge!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.badges.map((badge, index) => {
              const badgeInfo = AVAILABLE_BADGES[badge.type as keyof typeof AVAILABLE_BADGES]
              return (
                <div key={index} className={`p-4 rounded-lg border-2 border-dashed ${badgeInfo?.color || 'bg-gray-100 text-gray-700'}`}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{badge.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{badge.name}</h4>
                      <p className="text-xs opacity-75">{badge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs opacity-75">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Available Badges */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Available Badges</h3>
        <p className="text-sm text-gray-600 mb-4">Complete challenges and activities to unlock these badges:</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(AVAILABLE_BADGES).map(([key, badge]) => {
            const isEarned = profile.badges.some(b => b.type === key)
            return (
              <div key={key} className={`p-4 rounded-lg border ${isEarned ? 'bg-gray-50 opacity-50' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{badge.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                </div>
                {isEarned && (
                  <div className="text-xs text-green-600 font-medium">✓ Earned</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}