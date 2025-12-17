'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
// Header/Footer removed (global)

interface Article {
  _id: string
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readTime: number
  views: number
  tags?: string[]
  featured?: boolean
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', 'sustainability', 'tips', 'news', 'science', 'lifestyle']

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

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Sustainability Articles</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                {/* Image placeholder would go here */}
                <div className="w-full h-full bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium mr-3">
                    {article.category}
                  </span>
                  <span>{article.readTime} min read</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <Link
                    href={`/articles/${article._id}`}
                    className="text-green-600 font-medium hover:text-green-700 flex items-center"
                  >
                    Read More <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

