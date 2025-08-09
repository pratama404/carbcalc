import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['transportation', 'energy', 'food', 'waste', 'general'],
    default: 'general'
  },
  estimatedCO2Reduction: { type: Number, default: 0 },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
})

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema)