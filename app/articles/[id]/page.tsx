'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
// Header/Footer removed (global)
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'

interface Article {
  _id: string
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readTime: number
  views: number
  tags?: string[]
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string)
    }
  }, [params.id])

  const fetchArticle = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/articles?id=${id}`)
      const result = await response.json()

      if (result.success) {
        setArticle(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch article:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link href="/articles" className="text-green-600 hover:text-green-700">
            ← Back to Articles
          </Link>
        </main>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header removed (global) */}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span className="uppercase px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                {article.category}
              </span>
              {article.tags && article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readTime} min read
              </div>
              <div className="flex items-center">
                <span>{article.views} views</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Content */}
          {article.content ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.8',
                color: '#374151'
              }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600">{article.excerpt || 'Content coming soon...'}</p>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}

