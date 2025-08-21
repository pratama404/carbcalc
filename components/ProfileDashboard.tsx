'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { User, Mail, Calendar, MapPin, Edit3, Save, X, Share2, Trophy, Leaf, Target, Award, ExternalLink, Copy, Check } from 'lucide-react'

export default function ProfileDashboard() {
  const { data: session } = useSession()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    role: 'user',
    joinDate: '',
    totalEntries: 0,
    avgCO2: 0,
    totalCO2Saved: 0,
    treesPlanted: 0,
    challengesCompleted: 0,
    ecoPoints: 0,
    badges: [] as string[],
    achievements: [] as string[]
  })

  useEffect(() => {
    fetchProfile()
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile?email=${session?.user?.email}`)
      const result = await response.json()
      if (result.success) {
        setProfile({
          ...result.data,
          joinDate: new Date(result.data.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          role: result.data.role || 'user',
          ecoPoints: result.data.ecoPoints || 0,
          totalCO2Saved: result.data.totalCO2Saved || 0,
          treesPlanted: result.data.treesPlanted || 0,
          challengesCompleted: result.data.challengesCompleted || 0,
          badges: result.data.badges || [],
          achievements: result.data.achievements || []
        })
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          name: profile.name,
          bio: profile.bio,
          location: profile.location
        })
      })
      
      if (response.ok) {
        setEditing(false)
        alert('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const shareProfile = async () => {
    const shareText = `Check out my carbon footprint progress! I've saved ${profile.totalCO2Saved.toFixed(1)} kg CO2 and planted ${profile.treesPlanted} trees using CarbCalc! 🌱 Join me in making a difference: ${window.location.origin}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Carbon Footprint Journey',
          text: shareText,
          url: window.location.origin
        })
      } catch (error) {
        copyToClipboard(shareText)
      }
    } else {
      copyToClipboard(shareText)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'government': return 'bg-blue-100 text-blue-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const availableBadges = [
    { id: 'transport', name: 'Public Transport Buddy', icon: '🚌', description: 'Used public transport 10 times' },
    { id: 'cyclist', name: 'Eco Cyclist', icon: '🚴', description: 'Cycled to work 15 times' },
    { id: 'recycler', name: 'Recycling Hero', icon: '♻️', description: 'Recycled 50kg of waste' },
    { id: 'saver', name: 'Carbon Saver', icon: '🌱', description: 'Saved 100kg CO2 equivalent' },
    { id: 'planter', name: 'Tree Planter', icon: '🌳', description: 'Planted 5 trees' },
    { id: 'energy', name: 'Energy Saver', icon: '⚡', description: 'Reduced energy consumption by 20%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="bg-white bg-opacity-20 rounded-full p-6 mr-6">
                <User className="w-16 h-16" />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-4xl font-bold mr-4">{profile.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(profile.role)}`}>
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </span>
                </div>
                <p className="text-green-100 text-lg">{profile.email}</p>
                <p className="text-green-200 text-sm">Member since {profile.joinDate}</p>
                <div className="flex items-center mt-2">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="text-yellow-300 font-semibold">{profile.ecoPoints} Eco Points</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={shareProfile}
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
              >
                {copied ? <Check className="w-5 h-5 mr-2" /> : <Share2 className="w-5 h-5 mr-2" />}
                {copied ? 'Copied!' : 'Share Profile'}
              </button>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">{profile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">{profile.email}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Your location"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">{profile.location || 'No location set'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {editing ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg min-h-[80px]">{profile.bio || 'No bio added yet'}</div>
                  )}
                </div>

                {editing && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Invite Friends */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">Invite Friends</h3>
              <p className="text-green-100 mb-4">Help your friends start their carbon reduction journey!</p>
              <button
                onClick={() => copyToClipboard(`Join me on CarbCalc to track and reduce your carbon footprint! ${window.location.origin}`)}
                className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Share Invitation
              </button>
            </div>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Carbon Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Carbon Footprint Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{profile.avgCO2.toFixed(1)} kg</div>
                  <div className="text-sm text-gray-600">Avg Daily CO2</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{profile.totalEntries}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{profile.totalCO2Saved.toFixed(1)} kg</div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Achievements</h3>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{profile.challengesCompleted}</div>
                  <div className="text-sm text-gray-600">Challenges Completed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{profile.totalCO2Saved.toFixed(1)} kg</div>
                  <div className="text-sm text-gray-600">CO₂ Saved</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{profile.treesPlanted}</div>
                  <div className="text-sm text-gray-600">Trees Planted</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{profile.ecoPoints}</div>
                  <div className="text-sm text-gray-600">Eco Points</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">Earned Badges</h3>
              {profile.badges.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {profile.badges.map((badgeId) => {
                    const badge = availableBadges.find(b => b.id === badgeId)
                    return badge ? (
                      <div key={badge.id} className="flex items-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                        <span className="text-3xl mr-3">{badge.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{badge.name}</div>
                          <div className="text-sm text-gray-600">{badge.description}</div>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="mb-2">No badges earned yet</p>
                  <p className="text-sm">Complete challenges to earn your first badge!</p>
                </div>
              )}

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Available Badges</h4>
                <p className="text-sm text-gray-600 mb-4">Complete challenges and activities to unlock these badges:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {availableBadges.filter(badge => !profile.badges.includes(badge.id)).map((badge) => (
                    <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg opacity-60">
                      <span className="text-2xl mr-3">{badge.icon}</span>
                      <div>
                        <div className="font-medium text-gray-700">{badge.name}</div>
                        <div className="text-sm text-gray-500">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}