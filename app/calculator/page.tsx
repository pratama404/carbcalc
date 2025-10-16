'use client'

import { useRouter } from 'next/navigation'

export default function Calculator() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Carbon Calculator</h1>
        <p className="text-xl text-gray-600 mb-12">Track your daily carbon footprint with our advanced calculator</p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-6xl mb-6">🧮</div>
          <h2 className="text-2xl font-bold mb-4">Ready to Calculate?</h2>
          <p className="text-gray-600 mb-8">Our calculator helps you track emissions from transportation, energy, food, and waste.</p>
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Start Calculating
          </button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold">Transport</h3>
            <p className="text-sm text-gray-600">Cars, flights, public transport</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold">Energy</h3>
            <p className="text-sm text-gray-600">Electricity, heating, cooling</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-3xl mb-3">🍽️</div>
            <h3 className="font-semibold">Food</h3>
            <p className="text-sm text-gray-600">Meals, diet preferences</p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="font-semibold">Waste</h3>
            <p className="text-sm text-gray-600">Recycling, composting</p>
          </div>
        </div>
      </div>
    </div>
  )
}