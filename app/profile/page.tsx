'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProfileDashboard from '@/components/ProfileDashboard'
import SessionProvider from '@/components/SessionProvider'

function ProfileContent() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <ProfileDashboard />
}

export default function ProfilePage() {
  return (
    <SessionProvider>
      <ProfileContent />
    </SessionProvider>
  )
}