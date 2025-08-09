'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Save, ArrowLeft, LogOut, Edit3 } from 'lucide-react'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    joinDate: '',
    bio: '',
    location: '',
    totalEntries: 0,
    avgCO2: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchProfile()
  }, [session, status, router])

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
          })
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
      
      const result = await response.json()
      if (result.success) {
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4 mr-6">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <p className="text-green-100">{profile.email}</p>
                  <p className="text-green-100 text-sm">Member since {profile.joinDate}</p>
                </div>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-8 border-b">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{profile.totalEntries}</div>
              <div className="text-gray-600">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{profile.avgCO2} kg</div>
              <div className="text-gray-600">Avg Daily CO2</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">85%</div>
              <div className="text-gray-600">Reduction Goal</div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-md">{profile.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-md">{profile.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {editing ? (
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-md min-h-[80px]">{profile.bio || 'No bio added yet'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                {editing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Your location"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-md">{profile.location || 'No location added'}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-md">{profile.joinDate}</div>
              </div>

              {editing && (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}