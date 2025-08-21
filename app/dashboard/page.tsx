'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Leaf, LogOut, User, BarChart3, Wind, Award, Target, FileText, Shield } from 'lucide-react'
import CarbonCalculator from '@/components/CarbonCalculator'
import CarbonChart from '@/components/CarbonChart'
import Recommendations from '@/components/Recommendations'
import TodoList from '@/components/TodoList'
import ShareButton from '@/components/ShareButton'
import AirQualityDashboard from '@/components/AirQualityDashboard'
import CarbonixChallenge from '@/components/CarbonixChallenge'
import AirQualityAnalysis from '@/components/AirQualityAnalysis'
import ReportExporter from '@/components/ReportExporter'
import Link from 'next/link'
import DashboardOverview from '@/components/DashboardOverview'
import ArticleManagement from '@/components/ArticleManagement'
import AdminValidation from '@/components/AdminValidation'
import SessionProvider from '@/components/SessionProvider'
import { canAccessFeature } from '@/lib/rbac'

function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentResult, setCurrentResult] = useState<any>(null)
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [newTodo, setNewTodo] = useState<any>(null)
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState<'user' | 'premium' | 'government' | 'admin'>('admin')
  
  const userId = session?.user?.email || 'demo-user'

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchHistoricalData()
    fetchUserName()
    loadLastResult()
  }, [session, status, router])

  const loadLastResult = async () => {
    try {
      const response = await fetch(`/api/carbon?userId=${userId}&days=1`)
      const result = await response.json()
      if (result.success && result.data.length > 0) {
        const lastEntry = result.data[0]
        setCurrentResult({
          total: lastEntry.totalCO2,
          breakdown: lastEntry.breakdown
        })
        setActiveTab('results')
      }
    } catch (error) {
      console.error('Failed to load last result:', error)
    }
  }

  const fetchUserName = async () => {
    try {
      const response = await fetch(`/api/profile?email=${session?.user?.email}`)
      const result = await response.json()
      if (result.success) {
        setUserName(result.data.name)
      }
    } catch (error) {
      console.error('Failed to fetch user name:', error)
      setUserName(session?.user?.name || 'User')
    }
  }

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`/api/carbon?userId=${userId}&days=30`)
      const result = await response.json()
      if (result.success) {
        setHistoricalData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
    }
  }

  const handleCalculate = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/carbon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId })
      })
      
      const result = await response.json()
      if (result.success) {
        setCurrentResult(result.data)
        setActiveTab('results')
        fetchHistoricalData()
      }
    } catch (error) {
      console.error('Calculation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = (recommendation: any) => {
    setNewTodo(recommendation)
    setActiveTab('todos')
  }

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

  const baseTabs = [
    { id: 'calculator', label: 'Calculator', icon: BarChart3, feature: 'carbon-calculator' },
    { id: 'results', label: 'Results', icon: Leaf, feature: 'carbon-calculator' },
    { id: 'air-quality', label: 'Air Quality', icon: Wind, feature: 'air-quality' },
    { id: 'challenges', label: 'Challenges', icon: Award, feature: 'challenges' },
    { id: 'articles', label: 'Articles', icon: FileText, feature: 'articles' },
    { id: 'recommendations', label: 'AI Tips', icon: Target, feature: 'carbon-calculator' },
    { id: 'todos', label: 'Action Plan', icon: Target, feature: 'carbon-calculator' },
    { id: 'overview', label: 'Overview', icon: BarChart3, feature: 'carbon-calculator' }
  ]

  const adminTabs = [
    { id: 'validation', label: 'Validation', icon: Shield, feature: 'challenge-validation' }
  ]

  const tabs = [
    ...baseTabs.filter(tab => canAccessFeature(userRole, tab.feature)),
    ...(userRole === 'admin' ? adminTabs.filter(tab => canAccessFeature(userRole, tab.feature)) : [])
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-2 sm:mr-3" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Carbon Calculator</h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">Welcome, {userName || session.user?.name || session.user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {currentResult && <div className="hidden sm:block"><ShareButton carbonData={currentResult} /></div>}
              <button
                onClick={() => router.push('/history')}
                className="flex items-center text-gray-600 hover:text-gray-900 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
                title="View History"
              >
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="flex items-center text-gray-600 hover:text-gray-900 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
                title="Profile"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="flex items-center text-gray-600 hover:text-gray-900 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Mobile Dropdown */}
          <div className="block sm:hidden">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 border-0 rounded-lg text-sm font-medium bg-white focus:ring-2 focus:ring-green-500"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden sm:flex space-x-1 p-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
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
          <div className="space-y-8">
            <CarbonChart data={currentResult} historicalData={historicalData} />
            <div className="grid lg:grid-cols-2 gap-8">
              <AirQualityAnalysis carbonData={currentResult} />
              <ReportExporter 
                userData={{ name: userName, email: session?.user?.email || '' }}
                carbonData={currentResult}
                historicalData={historicalData}
                recommendations={['Use public transport', 'Reduce energy consumption', 'Choose sustainable food options']}
              />
            </div>
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
          <Recommendations userId={userId} onAddTodo={handleAddTodo} />
        )}

        {activeTab === 'todos' && (
          <TodoList userId={userId} newTodo={newTodo} />
        )}

        {activeTab === 'air-quality' && (
          <AirQualityDashboard />
        )}

        {activeTab === 'challenges' && (
          <CarbonixChallenge />
        )}



        {activeTab === 'articles' && (
          <ArticleManagement userRole={userRole} />
        )}

        {activeTab === 'validation' && userRole === 'admin' && (
          <AdminValidation />
        )}

        {activeTab === 'overview' && (
          <DashboardOverview userId={userId} />
        )}
      </main>
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