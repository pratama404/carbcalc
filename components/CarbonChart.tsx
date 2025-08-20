'use client'

import { useState, useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { TrendingUp, TrendingDown, Info, X, Lightbulb, Target, Award, AlertCircle } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler)

interface Props {
  data: {
    total: number
    breakdown: {
      transportation: number
      energy: number
      food: number
      waste: number
    }
  }
  historicalData?: any[]
}

export default function CarbonChart({ data, historicalData }: Props) {
  const [showInsights, setShowInsights] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  // Calculate insights
  const getInsights = () => {
    const total = data.total
    const avgDaily = 16.4 // Global average daily CO2 per person
    const categories = Object.entries(data.breakdown).sort(([,a], [,b]) => b - a)
    const highestCategory = categories[0]
    const trend = historicalData && historicalData.length > 1 ? 
      data.total - historicalData[historicalData.length - 2]?.totalCO2 : 0

    return {
      total,
      avgDaily,
      comparison: total < avgDaily ? 'below' : total > avgDaily ? 'above' : 'equal',
      percentage: Math.abs(((total - avgDaily) / avgDaily) * 100),
      highestCategory: highestCategory[0],
      highestValue: highestCategory[1],
      trend,
      trendDirection: trend > 0 ? 'up' : trend < 0 ? 'down' : 'stable'
    }
  }

  const getCategoryInsights = (category: string, value: number) => {
    const insights = {
      transportation: {
        icon: '🚗',
        tips: [
          'Use public transport to reduce emissions by 45%',
          'Walk or cycle for trips under 3km',
          'Consider carpooling or ride-sharing',
          'Plan efficient routes to minimize distance'
        ],
        benchmark: 6.2,
        facts: 'Transportation accounts for 24% of global CO2 emissions'
      },
      energy: {
        icon: '⚡',
        tips: [
          'Switch to LED bulbs to save 80% energy',
          'Unplug devices when not in use',
          'Use energy-efficient appliances',
          'Consider renewable energy sources'
        ],
        benchmark: 4.8,
        facts: 'Energy use in buildings accounts for 28% of global emissions'
      },
      food: {
        icon: '🍽️',
        tips: [
          'Reduce meat consumption by 1 day/week',
          'Choose local and seasonal produce',
          'Minimize food waste',
          'Consider plant-based alternatives'
        ],
        benchmark: 3.3,
        facts: 'Food production accounts for 26% of global greenhouse gas emissions'
      },
      waste: {
        icon: '♻️',
        tips: [
          'Recycle paper, plastic, and glass',
          'Compost organic waste',
          'Reduce single-use items',
          'Repair instead of replacing items'
        ],
        benchmark: 1.1,
        facts: 'Waste management accounts for 3.2% of global emissions'
      }
    }
    return insights[category as keyof typeof insights]
  }

  const insights = getInsights()
  const breakdownData = {
    labels: ['Transportation', 'Energy', 'Food', 'Waste'],
    datasets: [
      {
        data: [
          data.breakdown.transportation,
          data.breakdown.energy,
          data.breakdown.food,
          data.breakdown.waste
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)', 
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)', 
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        hoverBorderWidth: 3
      }
    ]
  }

  const historicalChartData = historicalData ? {
    labels: historicalData.map(entry => new Date(entry.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily CO2 (kg)',
        data: historicalData.map(entry => entry.totalCO2),
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        fill: true
      }
    ]
  } : null

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed
            const percentage = ((value / data.total) * 100).toFixed(1)
            return `${label}: ${value.toFixed(1)} kg CO₂ (${percentage}%)`
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index
        const categories = ['transportation', 'energy', 'food', 'waste']
        setSelectedCategory(categories[index])
      }
    }
  }

  const lineChartData = historicalData ? {
    labels: historicalData.slice(-7).map(entry => 
      new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Your CO₂ Emissions',
        data: historicalData.slice(-7).map(entry => entry.totalCO2),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Global Average',
        data: Array(historicalData.slice(-7).length).fill(16.4),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  } : null

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO₂ Emissions (kg)',
          font: {
            weight: 'bold' as const
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Results Header */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 sm:p-8 rounded-xl border">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Today's Carbon Footprint</h2>
          
          {/* Main CO2 Display */}
          <div className="relative inline-block">
            <div className={`text-4xl sm:text-6xl font-bold mb-2 ${
              insights.comparison === 'below' ? 'text-green-600' : 
              insights.comparison === 'above' ? 'text-red-500' : 'text-yellow-500'
            }`}>
              {data.total.toFixed(1)} <span className="text-lg sm:text-2xl">kg CO₂</span>
            </div>
            
            {/* Comparison Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              insights.comparison === 'below' ? 'bg-green-100 text-green-700' :
              insights.comparison === 'above' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {insights.comparison === 'below' ? (
                <><TrendingDown className="w-4 h-4 mr-1" /> {insights.percentage.toFixed(1)}% below average</>
              ) : insights.comparison === 'above' ? (
                <><TrendingUp className="w-4 h-4 mr-1" /> {insights.percentage.toFixed(1)}% above average</>
              ) : (
                <>Right on average!</>
              )}
            </div>
            
            {/* Insights Button */}
            <button
              onClick={() => setShowInsights(true)}
              className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
              title="View Insights"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Global average is {insights.avgDaily} kg CO₂ per person per day
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interactive Doughnut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Breakdown by Category</h3>
            <Info className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <Doughnut data={breakdownData} options={doughnutOptions} />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Click on chart segments for detailed insights
          </p>
        </div>

        {/* Category Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Category Impact</h3>
          {Object.entries(data.breakdown)
            .sort(([,a], [,b]) => b - a)
            .map(([category, value], index) => {
              const categoryInfo = getCategoryInsights(category, value)
              const percentage = ((value / data.total) * 100)
              const isHighest = index === 0
              
              return (
                <div 
                  key={category} 
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${
                    category === 'transportation' ? 'border-red-500 bg-red-50' :
                    category === 'energy' ? 'border-yellow-500 bg-yellow-50' :
                    category === 'food' ? 'border-green-500 bg-green-50' :
                    'border-blue-500 bg-blue-50'
                  } ${isHighest ? 'ring-2 ring-orange-200' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{categoryInfo?.icon}</span>
                      <div>
                        <h4 className="font-semibold capitalize flex items-center">
                          {category}
                          {isHighest && <Award className="w-4 h-4 ml-2 text-orange-500" />}
                        </h4>
                        <p className="text-sm text-gray-600">{percentage.toFixed(1)}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{value.toFixed(1)} kg</div>
                      <div className={`text-xs ${
                        value > (categoryInfo?.benchmark || 0) ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {value > (categoryInfo?.benchmark || 0) ? 'Above' : 'Below'} avg
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Historical Trend */}
      {historicalData && historicalData.length > 1 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">7-Day Trend vs Global Average</h3>
            <div className="flex items-center space-x-2">
              {insights.trend !== 0 && (
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  insights.trendDirection === 'down' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {insights.trendDirection === 'down' ? (
                    <><TrendingDown className="w-3 h-3 mr-1" /> -{Math.abs(insights.trend).toFixed(1)} kg</>
                  ) : (
                    <><TrendingUp className="w-3 h-3 mr-1" /> +{insights.trend.toFixed(1)} kg</>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="h-80">
            <Line data={lineChartData!} options={lineOptions} />
          </div>
        </div>
      )}

      {/* Insights Popup */}
      {showInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                  Your Carbon Insights
                </h3>
                <button onClick={() => setShowInsights(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Overall Assessment */}
                <div className={`p-4 rounded-lg ${
                  insights.comparison === 'below' ? 'bg-green-50 border border-green-200' :
                  insights.comparison === 'above' ? 'bg-red-50 border border-red-200' :
                  'bg-yellow-50 border border-yellow-200'
                }`}>
                  <h4 className="font-semibold mb-2 flex items-center">
                    {insights.comparison === 'below' ? (
                      <><Target className="w-5 h-5 mr-2 text-green-600" /> Great Job!</>
                    ) : insights.comparison === 'above' ? (
                      <><AlertCircle className="w-5 h-5 mr-2 text-red-600" /> Room for Improvement</>
                    ) : (
                      <><Target className="w-5 h-5 mr-2 text-yellow-600" /> On Track</>
                    )}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {insights.comparison === 'below' ? 
                      `You're doing excellent! Your footprint is ${insights.percentage.toFixed(1)}% below the global average.` :
                    insights.comparison === 'above' ?
                      `Your footprint is ${insights.percentage.toFixed(1)}% above average. Small changes can make a big difference!` :
                      'You\'re right on the global average. Every small action counts towards improvement!'}
                  </p>
                </div>

                {/* Biggest Impact Category */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-orange-600" />
                    Biggest Impact: {insights.highestCategory.charAt(0).toUpperCase() + insights.highestCategory.slice(1)}
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    This category accounts for {((insights.highestValue / data.total) * 100).toFixed(1)}% of your total footprint.
                  </p>
                  <div className="space-y-2">
                    {getCategoryInsights(insights.highestCategory, insights.highestValue)?.tips.slice(0, 2).map((tip, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trend Analysis */}
                {insights.trend !== 0 && (
                  <div className={`p-4 rounded-lg ${
                    insights.trendDirection === 'down' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <h4 className="font-semibold mb-2 flex items-center">
                      {insights.trendDirection === 'down' ? (
                        <><TrendingDown className="w-5 h-5 mr-2 text-green-600" /> Positive Trend!</>
                      ) : (
                        <><TrendingUp className="w-5 h-5 mr-2 text-red-600" /> Increasing Trend</>
                      )}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {insights.trendDirection === 'down' ?
                        `Your emissions decreased by ${Math.abs(insights.trend).toFixed(1)} kg CO₂ since yesterday. Keep it up!` :
                        `Your emissions increased by ${insights.trend.toFixed(1)} kg CO₂ since yesterday. Consider reviewing your activities.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Detail Popup */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 capitalize flex items-center">
                  <span className="text-2xl mr-2">{getCategoryInsights(selectedCategory, 0)?.icon}</span>
                  {selectedCategory} Insights
                </h3>
                <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Your Impact</h4>
                  <p className="text-2xl font-bold text-blue-700">
                    {data.breakdown[selectedCategory as keyof typeof data.breakdown].toFixed(1)} kg CO₂
                  </p>
                  <p className="text-sm text-blue-600">
                    {((data.breakdown[selectedCategory as keyof typeof data.breakdown] / data.total) * 100).toFixed(1)}% of your total footprint
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">Did You Know?</h4>
                  <p className="text-sm text-gray-700">{getCategoryInsights(selectedCategory, 0)?.facts}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Reduction Tips</h4>
                  <div className="space-y-2">
                    {getCategoryInsights(selectedCategory, 0)?.tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}