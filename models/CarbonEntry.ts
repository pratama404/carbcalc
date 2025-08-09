import mongoose from 'mongoose'

const CarbonEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  transportation: {
    car: {
      distance: { type: Number, default: 0 },
      fuelType: { type: String, default: 'gasoline' }
    },
    publicTransport: {
      distance: { type: Number, default: 0 }
    },
    flight: {
      distance: { type: Number, default: 0 },
      type: { type: String, default: 'domestic' }
    },
    walking: {
      distance: { type: Number, default: 0 }
    },
    cycling: {
      distance: { type: Number, default: 0 }
    }
  },
  energy: {
    electricity: {
      usage: { type: Number, default: 0 },
      source: { type: String, default: 'grid' }
    },
    heating: {
      usage: { type: Number, default: 0 },
      type: { type: String, default: 'gas' }
    },
    cooling: {
      usage: { type: Number, default: 0 }
    }
  },
  food: {
    meat: {
      servings: { type: Number, default: 0 }
    },
    dairy: {
      servings: { type: Number, default: 0 }
    },
    vegetables: {
      servings: { type: Number, default: 0 }
    },
    processed: {
      servings: { type: Number, default: 0 }
    }
  },
  waste: {
    recycled: {
      weight: { type: Number, default: 0 }
    },
    landfill: {
      weight: { type: Number, default: 0 }
    },
    compost: {
      weight: { type: Number, default: 0 }
    }
  },
  totalCO2: { type: Number, required: true },
  breakdown: {
    transportation: { type: Number, default: 0 },
    energy: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    waste: { type: Number, default: 0 }
  }
}, {
  timestamps: true
})

export default mongoose.models.CarbonEntry || mongoose.model('CarbonEntry', CarbonEntrySchema)