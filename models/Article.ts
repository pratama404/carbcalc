import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  authorId: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['tips', 'news', 'research', 'policy', 'technology'],
    required: true 
  },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  readTime: { type: Number }, // minutes
  views: { type: Number, default: 0 }
}, {
  timestamps: true
})

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)