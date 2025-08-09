// Carbon emission factors (kg CO2 per unit)
export const EMISSION_FACTORS = {
  transportation: {
    car: {
      gasoline: 2.31, // kg CO2 per liter
      diesel: 2.68,
      electric: 0.5, // varies by grid
      hybrid: 1.5
    },
    publicTransport: 0.089, // kg CO2 per km
    flight: {
      domestic: 0.255, // kg CO2 per km
      international: 0.195
    },
    walking: 0,
    cycling: 0
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh (average)
    naturalGas: 2.0, // kg CO2 per m³
    heating: 2.5,
    cooling: 0.8
  },
  food: {
    meat: 6.61, // kg CO2 per serving
    dairy: 3.2,
    vegetables: 0.4,
    processed: 2.5
  },
  waste: {
    landfill: 0.57, // kg CO2 per kg waste
    recycled: -0.1, // negative = carbon saved
    compost: 0.1
  }
}

export function calculateCarbonFootprint(data: any) {
  console.log('calculateCarbonFootprint called with:', data)
  let total = 0
  const breakdown = {
    transportation: 0,
    energy: 0,
    food: 0,
    waste: 0
  }

  // Transportation calculations
  if (data.transportation) {
    const { car, publicTransport, flight, walking, cycling } = data.transportation
    
    if (car?.distance && car?.fuelType) {
      const fuelConsumption = car.distance * 0.08 // 8L/100km average
      breakdown.transportation += fuelConsumption * EMISSION_FACTORS.transportation.car[car.fuelType as keyof typeof EMISSION_FACTORS.transportation.car] || 2.31
    }
    
    if (publicTransport?.distance) {
      breakdown.transportation += publicTransport.distance * EMISSION_FACTORS.transportation.publicTransport
    }
    
    if (flight?.distance && flight?.type) {
      breakdown.transportation += flight.distance * EMISSION_FACTORS.transportation.flight[flight.type as keyof typeof EMISSION_FACTORS.transportation.flight]
    }
  }

  // Energy calculations
  if (data.energy) {
    const { electricity, heating, cooling } = data.energy
    
    if (electricity?.usage) {
      breakdown.energy += electricity.usage * EMISSION_FACTORS.energy.electricity
    }
    
    if (heating?.usage) {
      breakdown.energy += heating.usage * EMISSION_FACTORS.energy.heating
    }
    
    if (cooling?.usage) {
      breakdown.energy += cooling.usage * EMISSION_FACTORS.energy.cooling
    }
  }

  // Food calculations
  if (data.food) {
    const { meat, dairy, vegetables, processed } = data.food
    
    if (meat?.servings) breakdown.food += meat.servings * EMISSION_FACTORS.food.meat
    if (dairy?.servings) breakdown.food += dairy.servings * EMISSION_FACTORS.food.dairy
    if (vegetables?.servings) breakdown.food += vegetables.servings * EMISSION_FACTORS.food.vegetables
    if (processed?.servings) breakdown.food += processed.servings * EMISSION_FACTORS.food.processed
  }

  // Waste calculations
  if (data.waste) {
    const { recycled, landfill, compost } = data.waste
    
    if (recycled?.weight) breakdown.waste += recycled.weight * EMISSION_FACTORS.waste.recycled
    if (landfill?.weight) breakdown.waste += landfill.weight * EMISSION_FACTORS.waste.landfill
    if (compost?.weight) breakdown.waste += compost.weight * EMISSION_FACTORS.waste.compost
  }

  total = breakdown.transportation + breakdown.energy + breakdown.food + breakdown.waste
  
  console.log('Final calculation:', { total, breakdown })

  return {
    total: Math.max(0, total), // Ensure non-negative
    breakdown
  }
}