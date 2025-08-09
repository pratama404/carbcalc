'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, BarChart3, Target, Share2, LogOut, User } from 'lucide-react'
import CarbonCalculator from '@/components/CarbonCalculator'
import CarbonChart from '@/components/CarbonChart'
import Recommendations from '@/components/Recommendations'
import TodoList from '@/components/TodoList'
import ShareButton from '@/components/ShareButton'
import SessionProvider from '@/components/SessionProvider'

function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentResult, setCurrentResult] = useState<any>(null)
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')
  const [newTodo, setNewTodo] = useState<any>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  const fetchHistoricalData = async () => {
    if (!session?.user?.id) return
    
    try {
      const response = await fetch(`/api/carbon?userId=${session.user.id}&days=30`)
      const result = await response.json()
      if (result.success) {
        setHistoricalData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
    }
  }

  const handleCalculate = async (data: any) => {
    if (!session?.user?.id) return
    
    setLoading(true)
    try {
      console.log('Sending calculation data:', data)
      const response = await fetch('/api/carbon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: session.user.id })
      })
      
      const result = await response.json()
      console.log('Calculation result:', result)
      
      if (result.success) {
        setCurrentResult(result.data)
        setActiveTab('results')
        fetchHistoricalData()
      } else {
        console.error('Calculation failed:', result.error)
        alert('Calculation failed: ' + result.error)
      }
    } catch (error) {
      console.error('Calculation failed:', error)
      alert('Calculation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = (recommendation: any) => {
    setNewTodo(recommendation)
    setActiveTab('todos')
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchHistoricalData()
    }
  }, [session?.user?.id])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: BarChart3 },
    { id: 'results', label: 'Results', icon: Leaf },
    { id: 'recommendations', label: 'AI Tips', icon: Target },
    { id: 'todos', label: 'Action Plan', icon: Target }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Carbon Calculator</h1>
                <p className="text-sm text-gray-600">Welcome back, {session.user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentResult && <ShareButton carbonData={currentResult} />}
              
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{session.user?.name}</span>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Calculate Your Daily Carbon Footprint
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter your daily activities to calculate your carbon emissions and get personalized recommendations.
              </p>
            </div>
            <CarbonCalculator onCalculate={handleCalculate} loading={loading} />
          </div>
        )}

        {activeTab === 'results' && currentResult && (
          <div>
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Your Carbon Footprint</h3>
              <p className="text-2xl font-bold text-green-600">{currentResult.total?.toFixed(2)} kg CO2</p>
            </div>
            <CarbonChart data={currentResult} historicalData={historicalData} />
          </div>
        )}

        {activeTab === 'results' && !currentResult && (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Yet</h3>
            <p className="text-gray-500">Calculate your carbon footprint first to see results here.</p>
            <button
              onClick={() => setActiveTab('calculator')}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Start Calculating
            </button>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <Recommendations userId={session.user?.id || ''} onAddTodo={handleAddTodo} />
        )}

        {activeTab === 'todos' && (
          <TodoList userId={session.user?.id || ''} newTodo={newTodo} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-lg font-semibold">Carbon Calculator</span>
            </div>
            <p className="text-gray-600 mb-4">
              Every small action counts towards a sustainable future. Track your progress and make a difference! 🌱
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Dashboard() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  )
}