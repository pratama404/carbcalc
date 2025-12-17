'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2, Eye, Clock, User, Tag } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

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
  const { addToast } = useToast()
  const [articles, setArticles] = useState<Article[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
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

  const fetchArticles = useCallback(async () => {
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
  }, [selectedCategory])

  const fetchFullArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/articles?id=${id}`)
      const result = await response.json()

      if (result.success) {
        setSelectedArticle(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch article:', error)
    }
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const response = await fetch(`/api/articles?id=${id}&userRole=${userRole}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      if (result.success) {
        fetchArticles()
        addToast('Article deleted successfully', 'success')
      } else {
        addToast('Failed to delete article: ' + result.error, 'error')
      }
    } catch (error) {
      addToast('Failed to delete article', 'error')
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

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
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.value
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Edit article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteArticle(article._id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete article"
                      >
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
                  <button
                    onClick={() => fetchFullArticle(article._id)}
                    className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
                  >
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
        <ArticleFormModal
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false)
            fetchArticles()
          }}
          userRole={userRole}
        />
      )}

      {/* Edit Article Modal */}
      {editingArticle && isAdmin && (
        <ArticleFormModal
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSuccess={() => {
            setEditingArticle(null)
            fetchArticles()
          }}
          userRole={userRole}
        />
      )}

      {/* Read Article Modal */}
      {selectedArticle && (
        <ArticleReadModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  )
}

function ArticleFormModal({
  article,
  onClose,
  onSuccess,
  userRole
}: {
  article?: Article | null
  onClose: () => void
  onSuccess: () => void
  userRole: string
}) {
  const { addToast } = useToast()
  const isEditing = !!article
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    category: article?.category || 'tips',
    tags: article?.tags?.join(', ') || '',
    featured: article?.featured || false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = '/api/articles'
      const method = isEditing ? 'PUT' : 'POST'
      const body: any = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        userRole
      }

      if (isEditing) {
        body.id = article._id
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      if (result.success) {
        onSuccess()
        addToast(`Article ${isEditing ? 'updated' : 'created'} successfully!`, 'success')
      } else {
        addToast(`Failed to ${isEditing ? 'update' : 'create'} article: ` + result.error, 'error')
      }
    } catch (error) {
      addToast(`Failed to ${isEditing ? 'update' : 'create'} article`, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Article' : 'Create New Article'}</h3>

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
              {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Article' : 'Create Article')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ArticleReadModal({ article, onClose }: { article: Article, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {article.views} views
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {article.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {article.featured && (
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg mb-6 inline-block">
              ⭐ Featured Article
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-gray-700 mb-6 font-medium border-l-4 border-green-500 pl-4 bg-green-50 py-3">
              {article.excerpt}
            </div>

            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center mb-3">
                <Tag className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}