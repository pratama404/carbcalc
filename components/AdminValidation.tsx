'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, Award, TreePine, Recycle, Bus, Bike, Zap, Trash2 } from 'lucide-react'

interface PendingChallenge {
  _id: string
  userId: string
  userName: string
  type: string
  title: string
  description: string
  carbonImpact: number
  ecoPoints: number
  status: 'pending' | 'approved' | 'rejected'
  evidence: {
    photos: string[]
    description: string
    location: string
  }
  createdAt: string
}

const CHALLENGE_ICONS = {
  tree_planting: TreePine,
  waste_donation: Trash2,
  recycling: Recycle,
  public_transport: Bus,
  cycling: Bike,
  energy_saving: Zap
}

export default function AdminValidation() {
  const [pendingChallenges, setPendingChallenges] = useState<PendingChallenge[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Mock data for pending challenges
  useEffect(() => {
    const mockChallenges: PendingChallenge[] = [
      {
        _id: '1',
        userId: 'user1',
        userName: 'John Doe',
        type: 'tree_planting',
        title: 'Plant Trees',
        description: 'Community tree planting initiative',
        carbonImpact: 22,
        ecoPoints: 50,
        status: 'pending',
        evidence: {
          photos: [],
          description: 'Planted 3 oak trees in the local park with the community group. Each tree was properly spaced and watered.',
          location: 'Central Park, Downtown'
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        userId: 'user2',
        userName: 'Sarah Smith',
        type: 'cycling',
        title: 'Cycle to Work',
        description: 'Daily cycling commute',
        carbonImpact: 5.2,
        ecoPoints: 30,
        status: 'pending',
        evidence: {
          photos: [],
          description: 'Cycled to work for the entire week instead of driving. Total distance: 25km.',
          location: 'Home to Office Route'
        },
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]
    
    setPendingChallenges(mockChallenges)
    setLoading(false)
  }, [])

  const handleValidation = async (challengeId: string, action: 'approve' | 'reject', notes?: string) => {
    setProcessingId(challengeId)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPendingChallenges(prev => 
        prev.map(challenge => 
          challenge._id === challengeId 
            ? { ...challenge, status: action === 'approve' ? 'approved' : 'rejected' }
            : challenge
        ).filter(challenge => challenge.status === 'pending')
      )
      
      // Show success message
      const challenge = pendingChallenges.find(c => c._id === challengeId)
      if (challenge) {
        alert(`Challenge "${challenge.title}" by ${challenge.userName} has been ${action}d!`)
      }
    } catch (error) {
      alert('Failed to process validation')
    } finally {
      setProcessingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Challenge Validation</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-yellow-500" />
            {pendingChallenges.length} Pending
          </div>
        </div>
      </div>

      {pendingChallenges.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">All Caught Up!</h3>
          <p className="text-gray-500">No pending challenges to review at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingChallenges.map(challenge => {
            const ChallengeIcon = CHALLENGE_ICONS[challenge.type as keyof typeof CHALLENGE_ICONS]
            const isProcessing = processingId === challenge._id

            return (
              <div key={challenge._id} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <ChallengeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">Submitted by {challenge.userName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(challenge.createdAt).toLocaleDateString()} at{' '}
                        {new Date(challenge.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-semibold">{challenge.carbonImpact} kg CO₂</div>
                      <div className="text-gray-500">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-600 font-semibold">{challenge.ecoPoints} pts</div>
                      <div className="text-gray-500">Points</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Evidence Submitted:</h4>
                  <p className="text-gray-700 mb-2">{challenge.evidence.description}</p>
                  {challenge.evidence.location && (
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {challenge.evidence.location}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Awaiting validation</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleValidation(challenge._id, 'reject')}
                      disabled={isProcessing}
                      className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {isProcessing ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleValidation(challenge._id, 'approve')}
                      disabled={isProcessing}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isProcessing ? 'Processing...' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}