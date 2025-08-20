'use client'

import { useState, useEffect } from 'react'
import { Car, Zap, Utensils, Trash2, Calculator, Info, TrendingUp, TrendingDown, Lightbulb, Target, AlertCircle } from 'lucide-react'

interface CarbonData {
  transportation: any
  energy: any
  food: any
  waste: any
}

interface Props {
  onCalculate: (data: CarbonData) => void
  loading: boolean
}

export default function CarbonCalculator({ onCalculate, loading }: Props) {
  const [data, setData] = useState<CarbonData>({
    transportation: {
      car: { distance: 0, fuelType: 'gasoline' },
      publicTransport: { distance: 0 },
      flight: { distance: 0, type: 'domestic' }
    },
    energy: {
      electricity: { usage: 0 },
      heating: { usage: 0 },
      cooling: { usage: 0 }
    },
    food: {
      meat: { servings: 0 },
      dairy: { servings: 0 },
      vegetables: { servings: 0 },
      processed: { servings: 0 }
    },
    waste: {
      recycled: { weight: 0 },
      landfill: { weight: 0 },
      compost: { weight: 0 }
    }
  })
  
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [realTimeImpact, setRealTimeImpact] = useState({
    transportation: 0,
    energy: 0,
    food: 0,
    waste: 0,
    total: 0
  })
  const [showTips, setShowTips] = useState<string | null>(null)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Real-time calculation
  const calculateRealTimeImpact = () => {
    // Transportation calculations
    const carEmissions = data.transportation.car.distance * (
      data.transportation.car.fuelType === 'gasoline' ? 0.21 :
      data.transportation.car.fuelType === 'diesel' ? 0.25 :
      data.transportation.car.fuelType === 'electric' ? 0.05 : 0.15
    )
    const publicTransportEmissions = data.transportation.publicTransport.distance * 0.04
    const flightEmissions = data.transportation.flight.distance * (
      data.transportation.flight.type === 'domestic' ? 0.25 : 0.35
    )
    const transportationTotal = carEmissions + publicTransportEmissions + flightEmissions

    // Energy calculations
    const electricityEmissions = data.energy.electricity.usage * 0.5
    const heatingEmissions = data.energy.heating.usage * 0.2
    const coolingEmissions = data.energy.cooling.usage * 0.3
    const energyTotal = electricityEmissions + heatingEmissions + coolingEmissions

    // Food calculations
    const meatEmissions = data.food.meat.servings * 3.3
    const dairyEmissions = data.food.dairy.servings * 1.9
    const vegetableEmissions = data.food.vegetables.servings * 0.4
    const processedEmissions = data.food.processed.servings * 1.1
    const foodTotal = meatEmissions + dairyEmissions + vegetableEmissions + processedEmissions

    // Waste calculations (negative for recycling/composting)
    const recycledEmissions = data.waste.recycled.weight * -0.1
    const landfillEmissions = data.waste.landfill.weight * 0.5
    const compostEmissions = data.waste.compost.weight * -0.05
    const wasteTotal = recycledEmissions + landfillEmissions + compostEmissions

    const total = transportationTotal + energyTotal + foodTotal + wasteTotal

    setRealTimeImpact({
      transportation: transportationTotal,
      energy: energyTotal,
      food: foodTotal,
      waste: wasteTotal,
      total: Math.max(0, total)
    })
  }

  useEffect(() => {
    calculateRealTimeImpact()
    
    // Check completed sections
    const completed = []
    if (data.transportation.car.distance > 0 || data.transportation.publicTransport.distance > 0 || data.transportation.flight.distance > 0) {
      completed.push('transportation')
    }
    if (data.energy.electricity.usage > 0 || data.energy.heating.usage > 0 || data.energy.cooling.usage > 0) {
      completed.push('energy')
    }
    if (data.food.meat.servings > 0 || data.food.dairy.servings > 0 || data.food.vegetables.servings > 0 || data.food.processed.servings > 0) {
      completed.push('food')
    }
    if (data.waste.recycled.weight > 0 || data.waste.landfill.weight > 0 || data.waste.compost.weight > 0) {
      completed.push('waste')
    }
    setCompletedSections(completed)
  }, [data])

  const getSectionTips = (section: string) => {
    const tips = {
      transportation: {
        icon: '🚗',
        tips: [
          'Walk or bike for trips under 3km to save 2.1kg CO₂',
          'Use public transport to reduce emissions by 45%',
          'Combine errands into one trip to minimize driving',
          'Consider electric or hybrid vehicles for long-term savings'
        ],
        impact: 'Transportation accounts for 24% of global CO₂ emissions'
      },
      energy: {
        icon: '⚡',
        tips: [
          'Switch to LED bulbs to save 80% energy',
          'Unplug devices when not in use',
          'Set thermostat 2°C lower in winter, higher in summer',
          'Use energy-efficient appliances (A+ rating)'
        ],
        impact: 'Buildings consume 40% of global energy'
      },
      food: {
        icon: '🍽️',
        tips: [
          'Reduce meat consumption by 1 day/week saves 0.8kg CO₂',
          'Choose local and seasonal produce',
          'Minimize food waste - plan your meals',
          'Try plant-based alternatives'
        ],
        impact: 'Food production accounts for 26% of greenhouse gas emissions'
      },
      waste: {
        icon: '♻️',
        tips: [
          'Recycle 1kg of paper saves 3.3kg CO₂',
          'Compost organic waste to reduce methane',
          'Use reusable bags and containers',
          'Repair items instead of replacing them'
        ],
        impact: 'Recycling can reduce emissions by up to 70%'
      }
    }
    return tips[section as keyof typeof tips]
  }

  const [oldData, setOldData] = useState<CarbonData>({
    transportation: {
      car: { distance: 0, fuelType: 'gasoline' },
      publicTransport: { distance: 0 },
      flight: { distance: 0, type: 'domestic' }
    },
    energy: {
      electricity: { usage: 0 },
      heating: { usage: 0 },
      cooling: { usage: 0 }
    },
    food: {
      meat: { servings: 0 },
      dairy: { servings: 0 },
      vegetables: { servings: 0 },
      processed: { servings: 0 }
    },
    waste: {
      recycled: { weight: 0 },
      landfill: { weight: 0 },
      compost: { weight: 0 }
    }
  })

  const updateData = (category: keyof CarbonData, subcategory: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [field]: value
        }
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate(data)
  }

  return (
    <div className="space-y-6">
      {/* Real-time Impact Display */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Carbon Impact</h3>
          <div className={`text-3xl font-bold transition-all duration-500 ${
            realTimeImpact.total < 5 ? 'text-green-600' :
            realTimeImpact.total < 15 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {realTimeImpact.total.toFixed(1)} <span className="text-lg">kg CO₂</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {realTimeImpact.total < 5 ? 'Excellent! Low impact day 🌱' :
             realTimeImpact.total < 15 ? 'Good progress! Room for improvement 🎯' :
             'High impact - consider reducing activities ⚠️'}
          </p>
        </div>
        
        {/* Progress bars for each category */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { key: 'transportation', icon: Car, color: 'bg-red-500', label: 'Transport' },
            { key: 'energy', icon: Zap, color: 'bg-yellow-500', label: 'Energy' },
            { key: 'food', icon: Utensils, color: 'bg-green-500', label: 'Food' },
            { key: 'waste', icon: Trash2, color: 'bg-blue-500', label: 'Waste' }
          ].map(({ key, icon: Icon, color, label }) => {
            const value = realTimeImpact[key as keyof typeof realTimeImpact]
            const maxValue = 20
            const percentage = Math.min((value / maxValue) * 100, 100)
            
            return (
              <div key={key} className="text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  completedSections.includes(key) ? 'text-gray-700' : 'text-gray-400'
                }`} />
                <div className="text-xs font-medium text-gray-600 mb-1">{label}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold text-gray-700">{value.toFixed(1)} kg</div>
              </div>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transportation */}
      <div className={`bg-white p-4 sm:p-6 rounded-lg card-shadow transition-all duration-300 ${
        activeSection === 'transportation' ? 'ring-2 ring-blue-500 shadow-lg' : ''
      } ${completedSections.includes('transportation') ? 'border-l-4 border-green-500' : ''}`}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center">
            <Car className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 transition-colors ${
              completedSections.includes('transportation') ? 'text-green-600' : 'text-blue-500'
            }`} />
            <h3 className="text-lg sm:text-xl font-semibold">Transportation</h3>
            {completedSections.includes('transportation') && (
              <div className="ml-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              realTimeImpact.transportation < 2 ? 'bg-green-100 text-green-700' :
              realTimeImpact.transportation < 8 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {realTimeImpact.transportation.toFixed(1)} kg CO₂
            </div>
            <button
              type="button"
              onClick={() => setShowTips(showTips === 'transportation' ? null : 'transportation')}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              title="View tips"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {showTips === 'transportation' && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">{getSectionTips('transportation').icon}</span>
              <h4 className="font-semibold text-blue-900">Transportation Tips</h4>
            </div>
            <p className="text-xs text-blue-700 mb-3">{getSectionTips('transportation').impact}</p>
            <div className="space-y-2">
              {getSectionTips('transportation').tips.map((tip, index) => (
                <div key={index} className="flex items-start text-sm">
                  <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-blue-800">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">Car Distance (km)</label>
            <input
              type="number"
              className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={data.transportation.car.distance}
              onChange={(e) => updateData('transportation', 'car', 'distance', Number(e.target.value))}
              onFocus={() => setActiveSection('transportation')}
              onBlur={() => setActiveSection(null)}
              placeholder="Enter distance in km"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuel Type</label>
            <select
              className="w-full p-2 border rounded-md"
              value={data.transportation.car.fuelType}
              onChange={(e) => updateData('transportation', 'car', 'fuelType', e.target.value)}
            >
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Public Transport (km)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.transportation.publicTransport.distance}
              onChange={(e) => updateData('transportation', 'publicTransport', 'distance', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Flight Distance (km)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.transportation.flight.distance}
              onChange={(e) => updateData('transportation', 'flight', 'distance', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Energy */}
      <div className="bg-white p-4 sm:p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-3 sm:mb-4">
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
          <h3 className="text-lg sm:text-xl font-semibold">Energy</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Electricity (kWh)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.energy.electricity.usage}
              onChange={(e) => updateData('energy', 'electricity', 'usage', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heating (kWh)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.energy.heating.usage}
              onChange={(e) => updateData('energy', 'heating', 'usage', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cooling (kWh)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.energy.cooling.usage}
              onChange={(e) => updateData('energy', 'cooling', 'usage', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Food */}
      <div className="bg-white p-4 sm:p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-3 sm:mb-4">
          <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" />
          <h3 className="text-lg sm:text-xl font-semibold">Food</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meat Servings</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.food.meat.servings}
              onChange={(e) => updateData('food', 'meat', 'servings', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dairy Servings</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.food.dairy.servings}
              onChange={(e) => updateData('food', 'dairy', 'servings', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vegetable Servings</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.food.vegetables.servings}
              onChange={(e) => updateData('food', 'vegetables', 'servings', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Processed Food Servings</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.food.processed.servings}
              onChange={(e) => updateData('food', 'processed', 'servings', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Waste */}
      <div className="bg-white p-4 sm:p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-3 sm:mb-4">
          <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-2" />
          <h3 className="text-lg sm:text-xl font-semibold">Waste</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recycled (kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.waste.recycled.weight}
              onChange={(e) => updateData('waste', 'recycled', 'weight', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Landfill (kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.waste.landfill.weight}
              onChange={(e) => updateData('waste', 'landfill', 'weight', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Compost (kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.waste.compost.weight}
              onChange={(e) => updateData('waste', 'compost', 'weight', Number(e.target.value))}
            />
          </div>
        </div>
      </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Calculate?</h3>
            <p className="text-sm text-gray-600">
              {completedSections.length === 0 ? 'Fill in at least one category to get started' :
               completedSections.length < 4 ? `${completedSections.length}/4 categories completed` :
               'All categories completed! Get your detailed analysis'}
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading || completedSections.length === 0}
            className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 ${
              completedSections.length === 0 ? 
                'bg-gray-300 text-gray-500 cursor-not-allowed' :
              loading ?
                'bg-green-500 text-white' :
                'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            <Calculator className="w-5 h-5 mr-2" />
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Calculating your impact...
              </>
            ) : (
              `Calculate My ${realTimeImpact.total.toFixed(1)} kg CO₂ Footprint`
            )}
          </button>
          
          {completedSections.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Estimated impact: <span className="font-semibold">{realTimeImpact.total.toFixed(1)} kg CO₂</span>
                {realTimeImpact.total > 0 && (
                  <span className={`ml-2 ${
                    realTimeImpact.total < 5 ? 'text-green-600' :
                    realTimeImpact.total < 15 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {realTimeImpact.total < 5 ? '🌱 Low impact' :
                     realTimeImpact.total < 15 ? '🎯 Moderate impact' : '⚠️ High impact'}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}