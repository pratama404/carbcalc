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
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 lg:py-8 space-y-4 lg:space-y-0">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                <Leaf className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1">
                  Carbon Calculator
                </h1>
                <p className="text-green-100 text-sm lg:text-base">
                  Welcome back, {userName || session.user?.name || 'User'}
                </p>
                <p className="text-green-200 text-xs lg:text-sm opacity-90">
                  Track, analyze, and reduce your carbon footprint
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 lg:space-x-4">
              {currentResult && (
                <div className="hidden sm:block">
                  <ShareButton carbonData={currentResult} />
                </div>
              )}
              <button
                onClick={() => router.push('/history')}
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-200"
                title="View History"
              >
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                <span className="hidden sm:inline text-sm lg:text-base">History</span>
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-200"
                title="Profile"
              >
                <User className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                <span className="hidden sm:inline text-sm lg:text-base">Profile</span>
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="flex items-center bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-200"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                <span className="hidden sm:inline text-sm lg:text-base">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown */}
          <div className="block lg:hidden py-4">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg text-base font-medium bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>
          
          {/* Desktop Menu Bar */}
          <div className="hidden lg:flex space-x-0 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap min-w-[120px] ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 bg-green-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
          
          {/* Tablet Menu */}
          <div className="hidden sm:flex lg:hidden space-x-1 py-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{tab.label}</span>
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
            <ReportExporter 
              userData={{ name: userName, email: session?.user?.email || '' }}
              carbonData={currentResult}
              historicalData={historicalData}
              recommendations={['Use public transport', 'Reduce energy consumption', 'Choose sustainable food options']}
            />
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
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Air Quality Analysis
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Monitor air quality in your area and understand how your carbon footprint impacts local air pollution.
              </p>
            </div>
            {currentResult ? (
              <AirQualityAnalysis carbonData={currentResult} />
            ) : (
              <div className="text-center py-12">
                <Wind className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Carbon Data Available</h3>
                <p className="text-gray-500">Calculate your carbon footprint first to see air quality impact analysis.</p>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Start Calculating
                </button>
              </div>
            )}
          </div>
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