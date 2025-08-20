'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload, TreePine, Recycle, Bus, Bike, Zap, Trash2, Award, Clock, CheckCircle, XCircle } from 'lucide-react'

interface Challenge {
  _id: string
  type: string
  title: string
  description: string
  carbonImpact: number
  ecoPoints: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

const CHALLENGE_TYPES = {
  tree_planting: { icon: TreePine, color: 'text-green-600', bg: 'bg-green-50' },
  waste_donation: { icon: Trash2, color: 'text-blue-600', bg: 'bg-blue-50' },
  recycling: { icon: Recycle, color: 'text-purple-600', bg: 'bg-purple-50' },
  public_transport: { icon: Bus, color: 'text-orange-600', bg: 'bg-orange-50' },
  cycling: { icon: Bike, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  energy_saving: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' }
}

export default function CarbonixChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [activeTab, setActiveTab] = useState<'available' | 'my-challenges'>('available')
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState('')
  const [evidence, setEvidence] = useState({
    photos: [] as string[],
    description: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const availableChallenges = [
    {
      type: 'tree_planting',
      title: 'Plant Trees',
      description: 'Plant trees in your community and help combat climate change',
      carbonImpact: 22,
      ecoPoints: 50,
      difficulty: 'Medium'
    },
    {
      type: 'waste_donation',
      title: 'Donate to Waste Bank',
      description: 'Donate recyclable materials to local waste banks',
      carbonImpact: 2.5,
      ecoPoints: 20,
      difficulty: 'Easy'
    },
    {
      type: 'recycling',
      title: 'Recycling Program',
      description: 'Participate in community recycling programs',
      carbonImpact: 1.8,
      ecoPoints: 15,
      difficulty: 'Easy'
    },
    {
      type: 'public_transport',
      title: 'Use Public Transport',
      description: 'Use public transport instead of private vehicles',
      carbonImpact: 4.6,
      ecoPoints: 25,
      difficulty: 'Easy'
    },
    {
      type: 'cycling',
      title: 'Cycle to Work',
      description: 'Use bicycle for daily commute',
      carbonImpact: 5.2,
      ecoPoints: 30,
      difficulty: 'Medium'
    },
    {
      type: 'energy_saving',
      title: 'Energy Conservation',
      description: 'Implement energy-saving measures at home',
      carbonImpact: 3.5,
      ecoPoints: 20,
      difficulty: 'Easy'
    }
  ]

  const fetchChallenges = async () => {
    try {
      const response = await fetch('/api/challenges?userId=demo-user&userRole=user')
      const result = await response.json()
      if (result.success) {
        setChallenges(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        const result = await response.json()
        if (result.success) {
          uploadedUrls.push(result.url)
        }
      }

      setEvidence(prev => ({
        ...prev,
        photos: [...prev.photos, ...uploadedUrls]
      }))
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload images. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = (index: number) => {
    setEvidence(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const submitChallenge = async () => {
    if (!selectedChallenge || !evidence.description) return

    setLoading(true)
    try {
      const response = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedChallenge,
          evidence,
          userId: 'demo-user'
        })
      })

      const result = await response.json()
      if (result.success) {
        setShowSubmitForm(false)
        setSelectedChallenge('')
        setEvidence({ photos: [], description: '', location: '' })
        fetchChallenges()
        alert('Challenge submitted successfully! It will be reviewed by our team.')
      }
    } catch (error) {
      console.error('Failed to submit challenge:', error)
      alert('Failed to submit challenge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChallenges()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Carbonix Challenge</h2>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'available'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Available Challenges
          </button>
          <button
            onClick={() => setActiveTab('my-challenges')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'my-challenges'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Challenges
          </button>
        </div>
      </div>

      {activeTab === 'available' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableChallenges.map((challenge) => {
            const ChallengeIcon = CHALLENGE_TYPES[challenge.type as keyof typeof CHALLENGE_TYPES].icon
            const iconColor = CHALLENGE_TYPES[challenge.type as keyof typeof CHALLENGE_TYPES].color
            const bgColor = CHALLENGE_TYPES[challenge.type as keyof typeof CHALLENGE_TYPES].bg

            return (
              <div key={challenge.type} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
                  <ChallengeIcon className={`w-6 h-6 ${iconColor}`} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className="text-green-600 font-semibold">{challenge.carbonImpact} kg CO₂</span>
                    <span className="text-gray-500"> saved</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{challenge.ecoPoints} points</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedChallenge(challenge.type)
                      setShowSubmitForm(true)
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                  >
                    Take Challenge
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'my-challenges' && (
        <div className="space-y-4">
          {challenges.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Challenges Yet</h3>
              <p className="text-gray-500">Take your first challenge to start making an impact!</p>
            </div>
          ) : (
            challenges.map((challenge) => {
              const ChallengeIcon = CHALLENGE_TYPES[challenge.type as keyof typeof CHALLENGE_TYPES].icon
              const iconColor = CHALLENGE_TYPES[challenge.type as keyof typeof CHALLENGE_TYPES].color

              return (
                <div key={challenge._id} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ChallengeIcon className={`w-6 h-6 ${iconColor} mr-3`} />
                      <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-semibold">{challenge.carbonImpact} kg CO₂</p>
                        <p className="text-xs text-gray-500">Impact</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-yellow-600 font-semibold">{challenge.ecoPoints} pts</p>
                        <p className="text-xs text-gray-500">Earned</p>
                      </div>
                      {getStatusIcon(challenge.status)}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Submit Challenge Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Submit Challenge Evidence</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={evidence.description}
                  onChange={(e) => setEvidence({ ...evidence, description: e.target.value })}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Describe what you did and how it helps the environment..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={evidence.location}
                  onChange={(e) => setEvidence({ ...evidence, location: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Where did this take place?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Photos (Optional)</label>
                
                {/* Photo Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    {uploading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Upload photos as evidence</p>
                        <p className="text-xs text-gray-500 mb-2">Max 5MB per image, JPG/PNG only</p>
                        <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Choose Files
                        </span>
                      </>
                    )}
                  </label>
                </div>
                
                {/* Uploaded Photos Preview */}
                {evidence.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {evidence.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSubmitForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitChallenge}
                disabled={loading || uploading || !evidence.description}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : uploading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}