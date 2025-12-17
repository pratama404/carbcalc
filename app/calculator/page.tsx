'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Leaf, Car, Zap, Utensils, Trash2, Calculator, ArrowRight, BarChart3, Save } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'

export default function CalculatorPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState('transport')
  const [results, setResults] = useState({
    transport: 0,
    energy: 0,
    food: 0,
    waste: 0
  })
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    // Transport
    carKm: '',
    fuelType: 'gasoline',
    publicTransport: '',
    flights: '',

    // Energy
    electricity: '',
    heating: '',
    cooling: '',

    // Food
    meat: '',
    dairy: '',
    vegetables: '',
    processed: '',

    // Waste
    recycling: '',
    landfill: '',
    compost: ''
  })

  // Factors
  const factors = {
    car: 0.21, // default
    fuel: { gasoline: 0.21, diesel: 0.25, hybrid: 0.12, electric: 0.05 },
    publicTransport: 0.05,
    flight: 0.25,
    electricity: 0.5,
    heating: 0.2,
    cooling: 0.15,
    meat: 6.6,
    dairy: 3.2,
    vegetables: 0.4,
    processed: 2.5,
    landfill: 0.5,
    recycling: -0.1,
    compost: -0.05
  }

  const calculateEmissions = () => {
    const transport = (
      (parseFloat(formData.carKm) || 0) * (factors.fuel[formData.fuelType as keyof typeof factors.fuel] || factors.car) +
      (parseFloat(formData.publicTransport) || 0) * factors.publicTransport +
      (parseFloat(formData.flights) || 0) * factors.flight
    )

    const energy = (
      (parseFloat(formData.electricity) || 0) * factors.electricity +
      (parseFloat(formData.heating) || 0) * factors.heating +
      (parseFloat(formData.cooling) || 0) * factors.cooling
    )

    const food = (
      (parseFloat(formData.meat) || 0) * factors.meat +
      (parseFloat(formData.dairy) || 0) * factors.dairy +
      (parseFloat(formData.vegetables) || 0) * factors.vegetables +
      (parseFloat(formData.processed) || 0) * factors.processed
    )

    const waste = (
      (parseFloat(formData.landfill) || 0) * factors.landfill +
      (parseFloat(formData.recycling) || 0) * factors.recycling +
      (parseFloat(formData.compost) || 0) * factors.compost
    )

    setResults({ transport, energy, food, waste })
  }

  const saveToDatabase = async () => {
    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    if (totalEmissions === 0) {
      addToast('Please calculate your footprint first', 'info')
      return
    }

    setSaving(true)

    try {
      // Transform data to API format
      const apiData = {
        userId: session.user.email,
        transportation: {
          car: { distance: parseFloat(formData.carKm) || 0, fuelType: formData.fuelType || 'gasoline' },
          publicTransport: { distance: parseFloat(formData.publicTransport) || 0 },
          flight: { distance: parseFloat(formData.flights) || 0, type: 'domestic' }
        },
        energy: {
          electricity: { usage: parseFloat(formData.electricity) || 0 },
          heating: { usage: parseFloat(formData.heating) || 0 },
          cooling: { usage: parseFloat(formData.cooling) || 0 }
        },
        food: {
          meat: { servings: parseFloat(formData.meat) || 0 },
          dairy: { servings: parseFloat(formData.dairy) || 0 },
          vegetables: { servings: parseFloat(formData.vegetables) || 0 },
          processed: { servings: parseFloat(formData.processed) || 0 }
        },
        waste: {
          recycled: { weight: parseFloat(formData.recycling) || 0 },
          landfill: { weight: parseFloat(formData.landfill) || 0 },
          compost: { weight: parseFloat(formData.compost) || 0 }
        }
      }

      const response = await fetch('/api/carbon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })

      const result = await response.json()

      if (result.success) {
        addToast('Saved successfully! Redirecting to dashboard...', 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        addToast(result.error || 'Failed to save. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Save error:', error)
      addToast('Failed to save. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const totalEmissions = Object.values(results).reduce((sum, val) => sum + val, 0)

  const tabs = [
    { id: 'transport', label: 'Transport', icon: Car, color: 'blue' },
    { id: 'energy', label: 'Energy', icon: Zap, color: 'yellow' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'green' },
    { id: 'waste', label: 'Waste', icon: Trash2, color: 'red' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Carbon Footprint Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your daily carbon emissions across different categories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6 card-hover">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Transport Tab */}
              {activeTab === 'transport' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Car className="w-6 h-6 mr-2 text-blue-600" />
                    Transportation
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Distance (km/day)
                      </label>
                      <input
                        type="number"
                        value={formData.carKm}
                        onChange={(e) => setFormData({ ...formData, carKm: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type
                      </label>
                      <select
                        value={formData.fuelType}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="electric">Electric</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Transport (km/day)
                      </label>
                      <input
                        type="number"
                        value={formData.publicTransport}
                        onChange={(e) => setFormData({ ...formData, publicTransport: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 10"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Flight Distance (km/month)
                      </label>
                      <input
                        type="number"
                        value={formData.flights}
                        onChange={(e) => setFormData({ ...formData, flights: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 1000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Energy Tab */}
              {activeTab === 'energy' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-yellow-600" />
                    Energy Usage
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Electricity (kWh/day)
                      </label>
                      <input
                        type="number"
                        value={formData.electricity}
                        onChange={(e) => setFormData({ ...formData, electricity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="e.g., 12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heating/Cooling (kWh/day)
                      </label>
                      <input
                        type="number"
                        value={formData.heating}
                        onChange={(e) => setFormData({ ...formData, heating: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="e.g., 8"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cooling (kWh/day)
                      </label>
                      <input
                        type="number"
                        value={formData.cooling}
                        onChange={(e) => setFormData({ ...formData, cooling: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Food Tab */}
              {activeTab === 'food' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Utensils className="w-6 h-6 mr-2 text-green-600" />
                    Food Consumption
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meat Servings/day
                      </label>
                      <input
                        type="number"
                        value={formData.meat}
                        onChange={(e) => setFormData({ ...formData, meat: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dairy Servings/day
                      </label>
                      <input
                        type="number"
                        value={formData.dairy}
                        onChange={(e) => setFormData({ ...formData, dairy: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vegetables Servings/day
                      </label>
                      <input
                        type="number"
                        value={formData.vegetables}
                        onChange={(e) => setFormData({ ...formData, vegetables: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Processed Food Servings/day
                      </label>
                      <input
                        type="number"
                        value={formData.processed}
                        onChange={(e) => setFormData({ ...formData, processed: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Waste Tab */}
              {activeTab === 'waste' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Trash2 className="w-6 h-6 mr-2 text-red-600" />
                    Waste Management
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recycling (kg/week)
                      </label>
                      <input
                        type="number"
                        value={formData.recycling}
                        onChange={(e) => setFormData({ ...formData, recycling: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., 5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landfill Waste (kg/week)
                      </label>
                      <input
                        type="number"
                        value={formData.landfill}
                        onChange={(e) => setFormData({ ...formData, landfill: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., 3"
                      />
                    </div>
                  </div>
                </div>
              )}


              <div className="flex gap-4 mt-8">
                <Button
                  onClick={calculateEmissions}
                  className="flex-1 text-base py-3"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate My Footprint
                </Button>
                {session && totalEmissions > 0 && (
                  <Button
                    onClick={saveToDatabase}
                    disabled={saving}
                    isLoading={saving}
                    variant="primary" // Explicitly primary, can be changed to secondary if desired
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-base py-3" // Overlay color if needed or use a new variant? The component supports className override.
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save to Dashboard
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-8 card-hover">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                Your Carbon Footprint
              </h3>

              {totalEmissions > 0 ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900">
                      {totalEmissions.toFixed(1)} kg
                    </div>
                    <div className="text-sm text-gray-600">CO₂e per day</div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(results).map(([category, value]) => {
                      const tab = tabs.find(t => t.id === category)
                      const Icon = tab?.icon || Car
                      const percentage = totalEmissions > 0 ? (value / totalEmissions) * 100 : 0

                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium capitalize">{category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{value.toFixed(1)} kg</div>
                            <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Global average: 11 kg CO₂e/day
                      </p>
                      {session ? (
                        <Button
                          onClick={saveToDatabase}
                          disabled={saving}
                          isLoading={saving}
                          className="w-full"
                        >
                          Save & View Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Link href="/auth/signin" className="w-full btn-primary text-white py-2 px-4 rounded-lg shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center text-sm font-medium">
                          Sign In to Save & Get Recommendations
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in the form and click calculate to see your carbon footprint</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}