import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'premium', 'government', 'admin'], 
    default: 'user' 
  },
  bio: { type: String },
  location: { type: String },
  joinDate: { type: Date, default: Date.now },
  ecoPoints: { type: Number, default: 0 },
  badges: [{ type: String }],
  carbonFootprint: {
    total: { type: Number, default: 0 },
    thisMonth: { type: Number, default: 0 },
    lastMonth: { type: Number, default: 0 },
    trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' }
  },
  challengesCompleted: { type: Number, default: 0 },
  totalCO2Saved: { type: Number, default: 0 },
  treesPlanted: { type: Number, default: 0 },
  wasteRecycled: { type: Number, default: 0 },
  achievements: [{ type: String }]
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)