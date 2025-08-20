'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Clock, User, Tag } from 'lucide-react'

interface Article {
  _id: string
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt: string
  readTime: number
  views: number
}

interface Props {
  userRole: string
}

export default function ArticleManagement({ userRole }: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'tips', label: 'Tips & Guides' },
    { value: 'news', label: 'Environmental News' },
    { value: 'research', label: 'Research' },
    { value: 'policy', label: 'Policy Updates' },
    { value: 'technology', label: 'Green Technology' }
  ]

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = selectedCategory === 'all' 
        ? '/api/articles' 
        : `/api/articles?category=${selectedCategory}`
      
      const response = await fetch(url)
      const result = await response.json()
      
      if (result.success) {
        setArticles(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const isAdmin = userRole === 'admin'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Environmental Articles</h2>
        {isAdmin && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading articles...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <div key={article._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              {article.featured && (
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
                  Featured Article
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {article.category}
                  </span>
                  {isAdmin && (
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime} min read
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views} views
                  </div>
                  <button className="text-green-600 text-sm font-medium hover:text-green-700">
                    Read More
                  </button>
                </div>

                {article.tags.length > 0 && (
                  <div className="flex items-center mt-3 pt-3 border-t">
                    <Tag className="w-3 h-3 text-gray-400 mr-1" />
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">📰</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Articles Found</h3>
          <p className="text-gray-500">
            {isAdmin ? 'Create your first article to get started.' : 'Check back later for new content.'}
          </p>
        </div>
      )}

      {/* Create Article Modal */}
      {showCreateForm && isAdmin && (
        <CreateArticleModal 
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false)
            fetchArticles()
          }}
        />
      )}
    </div>
  )
}

function CreateArticleModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'tips',
    tags: '',
    featured: false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          userRole: 'admin'
        })
      })

      const result = await response.json()
      if (result.success) {
        onSuccess()
      } else {
        alert('Failed to create article: ' + result.error)
      }
    } catch (error) {
      alert('Failed to create article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create New Article</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter article title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt *</label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-3 border rounded-lg resize-none"
              rows={2}
              placeholder="Brief description of the article"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3 border rounded-lg resize-none"
              rows={8}
              placeholder="Write your article content here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="tips">Tips & Guides</option>
                <option value="news">Environmental News</option>
                <option value="research">Research</option>
                <option value="policy">Policy Updates</option>
                <option value="technology">Green Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="featured" className="text-sm">Featured Article</label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}