import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Challenge from '@/models/Challenge'
import User from '@/models/User'

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { challengeId, action, reviewNotes, reviewerId } = await request.json()
    
    if (!challengeId || !action || !reviewerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const challenge = await Challenge.findById(challengeId)
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected'
    
    challenge.status = newStatus
    challenge.reviewedBy = reviewerId
    challenge.reviewedAt = new Date()
    challenge.reviewNotes = reviewNotes
    await challenge.save()

    if (action === 'approve') {
      await User.findOneAndUpdate(
        { email: challenge.userId },
        { 
          $inc: { 
            ecoPoints: challenge.ecoPoints,
            'achievements.challengesCompleted': 1,
            'achievements.carbonSaved': challenge.carbonImpact
          }
        }
      )
    }

    return NextResponse.json({
      success: true,
      data: challenge
    })
  } catch (error) {
    console.error('Challenge validation error:', error)
    return NextResponse.json({ error: 'Failed to validate challenge' }, { status: 500 })
  }
}