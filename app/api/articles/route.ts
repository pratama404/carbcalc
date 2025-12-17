import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Article from '@/models/Article'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const articleId = searchParams.get('id')

    // Get single article
    if (articleId) {
      const article = await Article.findById(articleId)
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
      }
      
      // Increment views
      await Article.findByIdAndUpdate(articleId, { $inc: { views: 1 } })
      
      return NextResponse.json({
        success: true,
        data: article
      })
    }

    // Build query
    let query: any = { published: true }
    
    if (category) {
      query.category = category
    }
    
    if (featured) {
      query.featured = true
    }

    const articles = await Article.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .select('-content') // Exclude full content for list view
      .limit(50) // Limit results

    return NextResponse.json({
      success: true,
      data: articles || []
    })
  } catch (error) {
    console.error('Articles fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { title, content, excerpt, category, tags, featured, userRole } = await request.json()

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const article = new Article({
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
      readTime: Math.ceil(content.split(' ').length / 200),
      views: 0
    })

    await article.save()

    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error('Article creation error:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { id, title, content, excerpt, category, tags, featured, userRole } = await request.json()

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const article = await Article.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        category,
        tags: tags || [],
        featured: featured || false,
        readTime: Math.ceil(content.split(' ').length / 200)
      },
      { new: true }
    )

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error('Article update error:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const userRole = searchParams.get('userRole')

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const article = await Article.findByIdAndDelete(id)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error) {
    console.error('Article deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}