'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  BarChart3, TrendingDown, Leaf, Zap, Car, Utensils, Trash2,
  Target, Award, Users, Calendar, Settings, Bell, Search,
  ArrowUp, ArrowDown, ArrowRight, Plus, Download, Share2, Filter, CheckCircle, Info, HelpCircle
} from 'lucide-react'
// Header removed (global)
import { useToast } from '@/context/ToastContext'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import InsightsPopup from '@/components/InsightsPopup'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { addToast } = useToast()
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [loading, setLoading] = useState(true)
  const [overviewData, setOverviewData] = useState<any>(null)
  const [carbonData, setCarbonData] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [animatedValues, setAnimatedValues] = useState({
    totalEmissions: 0,
    reduction: 0,
    ecoScore: 0,
    treesEquivalent: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [showInsights, setShowInsights] = useState(false)

  const showFeatureNotAvailable = (feature: string) => {
    addToast(`${feature} feature coming soon! We're workin' on it. 🚀`, 'info')
  }

  const exportToPDF = () => {
    if (!overviewData) return

    const doc = new jsPDF()
    const today = new Date().toLocaleDateString()

    // Title
    doc.setFontSize(22)
    doc.setTextColor(34, 197, 94) // Green color
    doc.text('CarbCalc Report', 14, 22)

    doc.setFontSize(12)
    doc.setTextColor(100)
    doc.text(`Generated on: ${today}`, 14, 32)
    doc.text(`User: ${session?.user?.name || session?.user?.email}`, 14, 38)

    // Overview
    doc.setFontSize(16)
    doc.setTextColor(0)
    doc.text('Monthly Overview', 14, 50)

    doc.setFontSize(12)
    doc.text(`Total Emissions: ${overviewData.totalCO2ThisMonth?.toFixed(2) || 0} kg CO2`, 14, 60)
    doc.text(`Eco Score: ${overviewData.ecoPoints || 0} points`, 14, 66)
    doc.text(`Trees Equivalent: ${Math.floor((overviewData.totalCO2ThisMonth || 0) / 21.77)} trees`, 14, 72)

    // Detailed Data Table
    doc.text('Recent Carbon Entries', 14, 85)

    const tableData = carbonData.map(entry => [
      new Date(entry.createdAt).toLocaleDateString(),
      `${entry.breakdown?.transportation?.toFixed(1) || 0} kg`,
      `${entry.breakdown?.energy?.toFixed(1) || 0} kg`,
      `${entry.breakdown?.food?.toFixed(1) || 0} kg`,
      `${entry.breakdown?.waste?.toFixed(1) || 0} kg`,
      `${entry.totalCO2?.toFixed(1) || 0} kg`
    ])

    autoTable(doc, {
      startY: 90,
      head: [['Date', 'Transport', 'Energy', 'Food', 'Waste', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94] }
    })

    // Save
    doc.save(`carbcalc-report-${today.replace(/\//g, '-')}.pdf`)
  }

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!session?.user?.email) return

    try {
      setLoading(true)
      const userId = session.user.email

      // Fetch overview data
      const overviewRes = await fetch(`/api/overview?userId=${userId}`)
      if (overviewRes.ok) {
        const overviewResult = await overviewRes.json()
        if (overviewResult.success) {
          setOverviewData(overviewResult.data)

          // Calculate reduction percentage
          const reduction = overviewResult.data.totalCO2LastMonth > 0
            ? ((overviewResult.data.totalCO2LastMonth - overviewResult.data.totalCO2ThisMonth) / overviewResult.data.totalCO2LastMonth) * 100
            : 0

          // Set animated values
          setAnimatedValues({
            totalEmissions: overviewResult.data.totalCO2ThisMonth,
            reduction: Math.max(0, reduction),
            ecoScore: Math.min(100, overviewResult.data.ecoPoints / 10),
            treesEquivalent: Math.floor(overviewResult.data.totalCO2ThisMonth / 21.77) // ~21.77 kg CO2 per tree
          })
        }
      }

      // Fetch carbon entries for charts
      const carbonRes = await fetch(`/api/carbon?userId=${userId}&days=30`)
      if (carbonRes.ok) {
        const carbonResult = await carbonRes.json()
        if (carbonResult.success) {
          setCarbonData(carbonResult.data)
        }
      }

      // Fetch recommendations
      const recRes = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      if (recRes.ok) {
        const recResult = await recRes.json()
        if (recResult.success && recResult.data.recommendations) {
          setRecommendations(recResult.data.recommendations)
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [session])

  // Check authentication
  // Check authentication
  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchDashboardData()
  }, [session, status, router, fetchDashboardData])

  // Animate dashboard values on load
  useEffect(() => {
    if (!overviewData) {
      // Set initial values if no data
      setAnimatedValues({
        totalEmissions: 0,
        reduction: 0,
        ecoScore: 0,
        treesEquivalent: 0
      })
      return
    }

    const reduction = overviewData.totalCO2LastMonth > 0
      ? ((overviewData.totalCO2LastMonth - overviewData.totalCO2ThisMonth) / overviewData.totalCO2LastMonth) * 100
      : 0

    const targets = {
      totalEmissions: overviewData.totalCO2ThisMonth || 0,
      reduction: Math.max(0, reduction),
      ecoScore: Math.min(100, (overviewData.ecoPoints || 0) / 10),
      treesEquivalent: Math.floor((overviewData.totalCO2ThisMonth || 0) / 21.77)
    }

    const duration = 2000
    const steps = 60
    const increment = Object.keys(targets).reduce((acc, key) => {
      acc[key] = targets[key as keyof typeof targets] / steps
      return acc
    }, {} as any)

    let step = 0
    const timer = setInterval(() => {
      if (step < steps) {
        setAnimatedValues(prev => ({
          totalEmissions: Math.min(prev.totalEmissions + increment.totalEmissions, targets.totalEmissions),
          reduction: Math.min(prev.reduction + increment.reduction, targets.reduction),
          ecoScore: Math.min(prev.ecoScore + increment.ecoScore, targets.ecoScore),
          treesEquivalent: Math.min(prev.treesEquivalent + increment.treesEquivalent, targets.treesEquivalent)
        }))
        step++
      } else {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [overviewData])

  // Calculate chart data from carbon entries
  const chartData = carbonData.length > 0
    ? carbonData.slice(0, 6).reverse().map((entry, index) => {
      const date = entry.createdAt || entry.date ? new Date(entry.createdAt || entry.date) : new Date()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return {
        month: months[date.getMonth()] || `Day ${index + 1}`,
        transport: entry.breakdown?.transportation || 0,
        energy: entry.breakdown?.energy || 0,
        food: entry.breakdown?.food || 0,
        waste: entry.breakdown?.waste || 0
      }
    })
    : [
      { month: 'Jan', transport: 0, energy: 0, food: 0, waste: 0 },
      { month: 'Feb', transport: 0, energy: 0, food: 0, waste: 0 },
      { month: 'Mar', transport: 0, energy: 0, food: 0, waste: 0 },
      { month: 'Apr', transport: 0, energy: 0, food: 0, waste: 0 },
      { month: 'May', transport: 0, energy: 0, food: 0, waste: 0 },
      { month: 'Jun', transport: 0, energy: 0, food: 0, waste: 0 }
    ]

  // Calculate categories from recent data
  const calculateCategories = () => {
    if (carbonData.length === 0) {
      return [
        { name: 'Transportation', icon: Car, value: 0, change: 0, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
        { name: 'Energy', icon: Zap, value: 0, change: 0, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
        { name: 'Food', icon: Utensils, value: 0, change: 0, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
        { name: 'Waste', icon: Trash2, value: 0, change: 0, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-600' }
      ]
    }

    const recent = carbonData.slice(0, 7).filter(e => e && e.breakdown)
    const older = carbonData.slice(7, 14).filter(e => e && e.breakdown)

    if (recent.length === 0) {
      return [
        { name: 'Transportation', icon: Car, value: 0, change: 0, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
        { name: 'Energy', icon: Zap, value: 0, change: 0, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
        { name: 'Food', icon: Utensils, value: 0, change: 0, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
        { name: 'Waste', icon: Trash2, value: 0, change: 0, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50', textColor: 'text-red-600' }
      ]
    }

    const recentAvg = {
      transportation: recent.reduce((sum, e) => sum + (e.breakdown?.transportation || 0), 0) / recent.length,
      energy: recent.reduce((sum, e) => sum + (e.breakdown?.energy || 0), 0) / recent.length,
      food: recent.reduce((sum, e) => sum + (e.breakdown?.food || 0), 0) / recent.length,
      waste: recent.reduce((sum, e) => sum + (e.breakdown?.waste || 0), 0) / recent.length
    }

    const olderAvg = older.length > 0 ? {
      transportation: older.reduce((sum, e) => sum + (e.breakdown?.transportation || 0), 0) / older.length,
      energy: older.reduce((sum, e) => sum + (e.breakdown?.energy || 0), 0) / older.length,
      food: older.reduce((sum, e) => sum + (e.breakdown?.food || 0), 0) / older.length,
      waste: older.reduce((sum, e) => sum + (e.breakdown?.waste || 0), 0) / older.length
    } : recentAvg

    const calcChange = (recent: number, older: number) =>
      older > 0 ? ((recent - older) / older) * 100 : 0

    return [
      {
        name: 'Transportation',
        icon: Car,
        value: recentAvg.transportation,
        change: calcChange(recentAvg.transportation, olderAvg.transportation),
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600'
      },
      {
        name: 'Energy',
        icon: Zap,
        value: recentAvg.energy,
        change: calcChange(recentAvg.energy, olderAvg.energy),
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600'
      },
      {
        name: 'Food',
        icon: Utensils,
        value: recentAvg.food,
        change: calcChange(recentAvg.food, olderAvg.food),
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600'
      },
      {
        name: 'Waste',
        icon: Trash2,
        value: recentAvg.waste,
        change: calcChange(recentAvg.waste, olderAvg.waste),
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600'
      }
    ]
  }

  const categories = calculateCategories()
  const achievements = [
    { title: 'Eco Warrior', description: 'Reduce 20% emissions', icon: '🏆', unlocked: (animatedValues.reduction || 0) >= 20 },
    { title: 'Green Commuter', description: 'Use public transport 10 days', icon: '🚌', unlocked: false },
    { title: 'Energy Saver', description: 'Reduce energy 15%', icon: '⚡', unlocked: false },
    { title: 'Plant Hero', description: 'Equivalent to 10 trees', icon: '🌳', unlocked: animatedValues.treesEquivalent >= 10 }
  ]

  // Format recommendations from API
  const formattedRecommendations = (recommendations && Array.isArray(recommendations) ? recommendations : []).map((rec: any) => ({
    title: rec.title || 'Reduce Carbon Footprint',
    impact: rec.description || rec.impact || 'Reduce emissions',
    difficulty: rec.difficulty ? rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1) : 'Medium',
    co2Saving: rec.impact || 'Unknown',
    icon: rec.icon || '🌱'
  }))

  const filteredCarbonData = carbonData.filter(entry => {
    // 1. Search Query
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      (new Date(entry.createdAt).toLocaleDateString().includes(searchQuery)) ||
      (entry.totalCO2?.toString() || '').includes(searchQuery) ||
      // Search in breakdown values
      (entry.breakdown?.transportation?.toString().includes(searchQuery)) ||
      (entry.breakdown?.food?.toString().includes(searchQuery))

    // 2. Filter Category
    let matchesCategory = true
    if (filterCategory === 'High Impact (>10kg)') {
      matchesCategory = (entry.totalCO2 || 0) > 10
    } else if (filterCategory === 'Low Impact (<5kg)') {
      matchesCategory = (entry.totalCO2 || 0) < 5
    }

    return matchesSearch && matchesCategory
  })



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header removed */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-gray-600">
              Here&apos;s your carbon footprint overview for this {selectedPeriod}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => showFeatureNotAvailable('Notifications')}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 relative shadow-sm"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              href="/settings"
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Controls Bar: Period, Search, Filter, Export */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors whitespace-nowrap ${selectedPeriod === period
                  ? 'btn-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent shadow-sm'
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Filter & Export Group */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm ${showFilter ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-300'}`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                {showFilter && (
                  <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64 z-20">
                    <h4 className="font-semibold mb-3">Filter Activity</h4>
                    <div className="space-y-2">
                      {['All', 'High Impact (>10kg)', 'Low Impact (<5kg)'].map(cat => (
                        <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="radio"
                            name="filter"
                            checked={filterCategory === cat}
                            onChange={() => setFilterCategory(cat)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors shadow-sm whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Emissions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-red-600 text-sm">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>2.3%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 animate-number-count">
              {animatedValues.totalEmissions.toFixed(1)} kg
            </div>
            <div className="text-gray-600 text-sm flex items-center">
              Total CO₂ Emissions
              <div className="group relative ml-1">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded p-2 z-50">
                  Total carbon dioxide equivalent emissions calculated from your activities.
                </div>
              </div>
            </div>
          </div>

          {/* Reduction */}
          <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>Good</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 animate-number-count">
              {animatedValues.reduction.toFixed(1)}%
            </div>
            <div className="text-gray-600 text-sm">Reduction vs Last Month</div>
          </div>

          {/* Eco Score */}
          <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-blue-600 text-sm font-semibold">A+</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 animate-number-count">
              {Math.floor(animatedValues.ecoScore)}/100
            </div>
            <div className="text-gray-600 text-sm flex items-center">
              Eco Score
              <div className="group relative ml-1">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded p-2 z-50">
                  A score from 0-100 based on your emission reduction actions and efficiency.
                </div>
              </div>
            </div>
          </div>

          {/* Trees Equivalent */}
          <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="text-emerald-600 text-sm">🌳</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1 animate-number-count">
              {Math.floor(animatedValues.treesEquivalent)}
            </div>
            <div className="text-gray-600 text-sm flex items-center">
              Trees Equivalent
              <div className="group relative ml-1">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded p-2 z-50">
                  Number of mature trees needed to absorb your emissions over a year.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Insights Banner */}
        <div className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">New Insights Available!</h3>
              <p className="text-green-100">See how you compare to the global average and get daily tips.</p>
            </div>
          </div>
          <button
            onClick={() => setShowInsights(true)}
            className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-md flex items-center"
          >
            View Insights
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <InsightsPopup isOpen={showInsights} onClose={() => setShowInsights(false)} data={overviewData} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Emissions Trend</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => showFeatureNotAvailable('Share')}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-72 mb-8 ml-8">
                {/* Y-Axis Labels */}
                <div className="absolute left-[-35px] top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between z-0">
                  <div className="border-t border-gray-100 w-full h-0"></div>
                  <div className="border-t border-gray-100 w-full h-0"></div>
                  <div className="border-t border-gray-100 w-full h-0"></div>
                  <div className="border-t border-gray-100 w-full h-0"></div>
                  <div className="border-b border-gray-100 w-full h-0"></div>
                </div>

                <div className="absolute inset-0 bottom-8 flex items-end justify-between px-4 z-10">
                  {chartData.map((data, index) => {
                    const total = data.transport + data.energy + data.food + data.waste
                    const hasData = total > 0
                    return (
                      <div key={index} className="flex flex-col items-center space-y-2 group relative w-full mx-1">
                        {/* Tooltip */}
                        {hasData && (
                          <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                            <p className="font-bold mb-1 border-b border-gray-700 pb-1">{data.month}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-blue-300">Transport:</span>
                                <span>{data.transport.toFixed(1)}kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-yellow-300">Energy:</span>
                                <span>{data.energy.toFixed(1)}kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-300">Food:</span>
                                <span>{data.food.toFixed(1)}kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-red-300">Waste:</span>
                                <span>{data.waste.toFixed(1)}kg</span>
                              </div>
                              <div className="border-t border-gray-700 pt-1 flex justify-between font-bold">
                                <span>Total:</span>
                                <span>{total.toFixed(1)}kg</span>
                              </div>
                            </div>
                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -ml-1 border-4 border-transparent border-t-gray-900"></div>
                          </div>
                        )}

                        <div className="relative w-full max-w-[40px] bg-gray-50 rounded-t-lg overflow-hidden transition-all duration-300 group-hover:bg-gray-100" style={{ height: '240px' }}>
                          {hasData ? (
                            <>
                              {/* Stacked bars */}
                              <div
                                className="absolute bottom-0 w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                                style={{
                                  height: `${Math.max((data.transport / total) * 100, 0)}%`,
                                }}
                              ></div>
                              <div
                                className="absolute w-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
                                style={{
                                  bottom: `${(data.transport / total) * 100}%`,
                                  height: `${Math.max((data.energy / total) * 100, 0)}%`,
                                }}
                              ></div>
                              <div
                                className="absolute w-full bg-green-500 hover:bg-green-600 transition-colors"
                                style={{
                                  bottom: `${((data.transport + data.energy) / total) * 100}%`,
                                  height: `${Math.max((data.food / total) * 100, 0)}%`,
                                }}
                              ></div>
                              <div
                                className="absolute w-full bg-red-500 hover:bg-red-600 transition-colors"
                                style={{
                                  bottom: `${((data.transport + data.energy + data.food) / total) * 100}%`,
                                  height: `${Math.max((data.waste / total) * 100, 0)}%`,
                                }}
                              ></div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* X-Axis Labels */}
                <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="w-full text-center">
                      <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Legend */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Chart Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon
                    let colorClass = ''
                    if (category.name === 'Transportation') colorClass = 'bg-blue-500'
                    if (category.name === 'Energy') colorClass = 'bg-yellow-400'
                    if (category.name === 'Food') colorClass = 'bg-green-500'
                    if (category.name === 'Waste') colorClass = 'bg-red-500'

                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                        <span className="text-sm text-gray-700 font-medium">{category.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Breakdown with Donut */}
            <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Category Breakdown</h3>

              {/* Donut Chart */}
              <div className="mb-6 h-48 flex justify-center">
                <Doughnut
                  data={{
                    labels: categories.map(c => c.name),
                    datasets: [{
                      data: categories.map(c => c.value),
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)', // Blue (Transport)
                        'rgba(234, 179, 8, 0.8)',  // Yellow (Energy)
                        'rgba(34, 197, 94, 0.8)',  // Green (Food)
                        'rgba(239, 68, 68, 0.8)',  // Red (Waste)
                      ],
                      borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(234, 179, 8, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(239, 68, 68, 1)',
                      ],
                      borderWidth: 1,
                    }]
                  }}
                  options={{
                    plugins: {
                      legend: { display: false }
                    },
                    cutout: '70%',
                    maintainAspectRatio: false
                  }}
                />
              </div>

              <div className="space-y-4">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${category.textColor}`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.value.toFixed(1)} kg CO₂</div>
                        </div>
                      </div>
                      <div className={`flex items-center text-sm ${category.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {category.change < 0 ? (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        )}
                        <span>{Math.abs(category.change).toFixed(1)}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white p-6 rounded-2xl shadow-sm card-hover">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className={`font-medium ${achievement.unlocked ? 'text-green-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </div>
                      <div className={`text-sm ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Breakdown</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Impact</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCarbonData.length > 0 ? (
                  filteredCarbonData.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          {Object.entries(entry.breakdown || {}).map(([key, value]: any) => value > 0 && (
                            <span key={key} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                              {key}: {value.toFixed(1)}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {entry.totalCO2?.toFixed(2)} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(entry.totalCO2 || 0) < 5 ? 'bg-green-100 text-green-800' :
                          (entry.totalCO2 || 0) < 15 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {(entry.totalCO2 || 0) < 5 ? 'Low' : (entry.totalCO2 || 0) < 15 ? 'Medium' : 'High'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No activity found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Link href="/todos" className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Goals & Todos</h3>
            <p className="text-gray-600 mb-4">Manage your carbon reduction action items</p>
            <div className="text-green-600 font-medium flex items-center">
              View Todos <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link href="/calculator" className="bg-white p-6 rounded-2xl shadow-sm card-hover">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Footprint</h3>
            <p className="text-gray-600 mb-4">Add a new carbon footprint entry</p>
            <div className="text-green-600 font-medium flex items-center">
              Go to Calculator <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
            <Link href="/calculator" className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recommendations...</p>
            </div>
          ) : formattedRecommendations.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {formattedRecommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover-lift">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{rec.icon}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{rec.impact}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600">Save {rec.co2Saving}</span>
                    <Link href="/todos" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Add to Goals
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recommendations yet. Start tracking your carbon footprint to get personalized recommendations!</p>
              <Link href="/calculator" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Calculate Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {loading && status !== 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      )}
    </div>
  )
}