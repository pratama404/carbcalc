'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, Award, TreePine, Recycle, Bus, Bike, Zap, Trash2, HelpCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface PendingChallenge {
  _id: string
  userId: string | { name: string, _id: string }
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

const CHALLENGE_ICONS: Record<string, any> = {
  tree_planting: TreePine,
  waste_donation: Trash2,
  recycling: Recycle,
  public_transport: Bus,
  cycling: Bike,
  energy_saving: Zap
}

export default function AdminValidation() {
  const { data: session } = useSession()
  const [pendingChallenges, setPendingChallenges] = useState<PendingChallenge[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

  const fetchPendingChallenges = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/challenges?status=pending&userRole=admin')
      const result = await response.json()

      if (result.success) {
        const formattedChallenges = result.data.map((challenge: any) => ({
          ...challenge,
          userName: typeof challenge.userId === 'object' ? challenge.userId?.name : (challenge.userId || 'Unknown User'),
          createdAt: challenge.createdAt
        }))
        setPendingChallenges(formattedChallenges)
      }
    } catch (error) {
      console.error('Failed to fetch pending challenges:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingChallenges()
  }, [])

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleValidation = async (challengeId: string, action: 'approve' | 'reject', notes?: string) => {
    if (!session) {
      setNotification({ message: 'You must be logged in to perform this action', type: 'error' })
      return
    }

    setProcessingId(challengeId)

    try {
      const response = await fetch('/api/challenges/validate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId,
          action,
          reviewNotes: notes,
          reviewerId: session.user?.email || 'admin-user'
        })
      })

      const result = await response.json()

      if (result.success) {
        setPendingChallenges(prev =>
          prev.filter(challenge => challenge._id !== challengeId)
        )
        setNotification({ message: `Challenge successfully ${action}d`, type: 'success' })
      } else {
        setNotification({ message: 'Failed to process validation: ' + result.error, type: 'error' })
      }
    } catch (error) {
      console.error('Validation error:', error)
      setNotification({ message: 'An unexpected error occurred', type: 'error' })
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
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform animate-in fade-in slide-in-from-top-2 ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Challenge Validation</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
            <Clock className="w-4 h-4 mr-2 text-yellow-600" />
            <span className="font-medium text-yellow-700">{pendingChallenges.length} Pending</span>
          </div>
        </div>
      </div>

      {pendingChallenges.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">All Caught Up!</h3>
          <p className="text-gray-500">No pending challenges to review at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingChallenges.map(challenge => {
            const ChallengeIcon = CHALLENGE_ICONS[challenge.type as string] || HelpCircle
            const isProcessing = processingId === challenge._id

            return (
              <div key={challenge._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                      <ChallengeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">Submitted by <span className="font-medium text-gray-900">{challenge.userName}</span></p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(challenge.createdAt).toLocaleDateString()} at{' '}
                        {new Date(challenge.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="text-center">
                      <div className="text-green-600 font-bold">{challenge.carbonImpact} kg</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Impact</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                      <div className="text-yellow-600 font-bold">{challenge.ecoPoints}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Points</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Evidence Submitted</h4>
                  <p className="text-gray-700 mb-3">{challenge.evidence.description}</p>
                  {challenge.evidence.location && (
                    <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded border border-gray-200 inline-block">
                      <span className="font-semibold mr-2">📍 Location:</span> {challenge.evidence.location}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 italic">Awaiting validation</span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleValidation(challenge._id, 'reject')}
                      disabled={isProcessing}
                      className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50 font-medium transition-colors"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {isProcessing ? 'Processing' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleValidation(challenge._id, 'approve')}
                      disabled={isProcessing}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium shadow-sm transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isProcessing ? 'Processing' : 'Approve'}
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