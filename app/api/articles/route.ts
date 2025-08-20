import { NextRequest, NextResponse } from 'next/server'

// Mock articles data
const MOCK_ARTICLES = [
  {
    _id: '1',
    title: '10 Simple Ways to Reduce Your Carbon Footprint',
    content: 'Reducing your carbon footprint doesn\'t have to be complicated...',
    excerpt: 'Discover easy daily habits that can significantly reduce your environmental impact.',
    author: 'Dr. Sarah Green',
    authorId: 'admin1',
    category: 'tips',
    tags: ['carbon', 'lifestyle', 'environment'],
    featured: true,
    published: true,
    publishedAt: new Date('2024-01-15'),
    readTime: 5,
    views: 1250,
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'The Future of Renewable Energy',
    content: 'Renewable energy technologies are advancing rapidly...',
    excerpt: 'Explore the latest developments in solar, wind, and other renewable energy sources.',
    author: 'Prof. Mike Chen',
    authorId: 'admin2',
    category: 'technology',
    tags: ['renewable', 'solar', 'wind'],
    featured: false,
    published: true,
    publishedAt: new Date('2024-01-20'),
    readTime: 8,
    views: 890,
    createdAt: new Date('2024-01-20')
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    let articles = MOCK_ARTICLES.filter(article => article.published)

    if (category) {
      articles = articles.filter(article => article.category === category)
    }

    if (featured) {
      articles = articles.filter(article => article.featured)
    }

    return NextResponse.json({
      success: true,
      data: articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, category, tags, featured, userRole } = await request.json()

    // Role-based access control
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const article = {
      _id: Date.now().toString(),
      title,
      content,
      excerpt,
      author: 'Admin User',
      authorId: 'admin',
      category,
      tags: tags || [],
      featured: featured || false,
      published: true,
      publishedAt: new Date(),
      readTime: Math.ceil(content.split(' ').length / 200), // Estimate reading time
      views: 0,
      createdAt: new Date()
    }

    // In real implementation, save to database
    MOCK_ARTICLES.push(article)

    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}