'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react'
import CarbonChart from '@/components/CarbonChart'
import SessionProvider from '@/components/SessionProvider'

function HistoryContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const userId = session?.user?.email || 'demo-user'

  const fetchHistoricalData = useCallback(async () => {
    try {
      const response = await fetch(`/api/carbon?userId=${userId}&days=90`)
      const result = await response.json()
      if (result.success) {
        setHistoricalData(result.data)
        if (result.data.length > 0) {
          setSelectedEntry(result.data[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchHistoricalData()
  }, [session, status, router, fetchHistoricalData])

  if (status === 'loading' || loading) {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Carbon History</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {historicalData.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No History Yet</h3>
            <p className="text-gray-500">Start calculating your carbon footprint to see history here.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historicalData.map((entry) => (
                    <div
                      key={entry._id}
                      onClick={() => setSelectedEntry(entry)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedEntry?._id === entry._id
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(entry.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            {entry.totalCO2.toFixed(1)} kg
                          </div>
                          <div className="text-xs text-gray-500">CO2</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedEntry && (
                <CarbonChart
                  data={{
                    total: selectedEntry.totalCO2,
                    breakdown: selectedEntry.breakdown
                  }}
                  historicalData={historicalData}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function History() {
  return (
    <SessionProvider>
      <HistoryContent />
    </SessionProvider>
  )
}