'use client'

import { useState } from 'react'
import { Car, Zap, Utensils, Trash2, Calculator } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Transportation */}
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <Car className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-semibold">Transportation</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Car Distance (km)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={data.transportation.car.distance}
              onChange={(e) => updateData('transportation', 'car', 'distance', Number(e.target.value))}
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
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-semibold">Energy</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
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
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-green-500 mr-2" />
          <h3 className="text-xl font-semibold">Food</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
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
      <div className="bg-white p-6 rounded-lg card-shadow">
        <div className="flex items-center mb-4">
          <Trash2 className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-xl font-semibold">Waste</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
      >
        <Calculator className="w-5 h-5 mr-2" />
        {loading ? 'Calculating...' : 'Calculate Carbon Footprint'}
      </button>
    </form>
  )
}