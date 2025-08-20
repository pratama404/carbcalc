import mongoose from 'mongoose'

const ChallengeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['tree_planting', 'waste_donation', 'recycling', 'public_transport', 'cycling', 'energy_saving'],
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  carbonImpact: { type: Number, required: true }, // kg CO2 saved/reduced
  ecoPoints: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  evidence: {
    photos: [{ type: String }], // URLs to uploaded photos
    description: { type: String },
    location: { type: String }
  },
  reviewedBy: { type: String },
  reviewedAt: { type: Date },
  reviewNotes: { type: String }
}, {
  timestamps: true
})

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema)