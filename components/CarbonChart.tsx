'use client'

import { useEffect, useRef } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

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
        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
        borderWidth: 0
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Carbon Footprint Breakdown'
      }
    }
  }

  const historicalOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Carbon Footprint Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO2 (kg)'
        }
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Current Day Results */}
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Today's Carbon Footprint</h2>
          <div className="text-6xl font-bold text-green-600 mt-4">
            {data.total.toFixed(1)} <span className="text-2xl">kg CO2</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Breakdown by Category</h3>
            <Doughnut data={breakdownData} options={options} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Category Details</h3>
            <div className="space-y-3">
              {Object.entries(data.breakdown).map(([category, value]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="capitalize font-medium">{category}</span>
                  <span className="font-bold text-gray-700">{value.toFixed(1)} kg CO2</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Trend */}
      {historicalData && historicalData.length > 1 && (
        <div className="bg-white p-6 rounded-lg card-shadow">
          <h3 className="text-xl font-semibold mb-4">Historical Trend</h3>
          <Bar data={historicalChartData!} options={historicalOptions} />
        </div>
      )}
    </div>
  )
}