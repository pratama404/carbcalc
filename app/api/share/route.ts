import { NextRequest, NextResponse } from 'next/server'
import { generateShareImage } from '@/lib/shareImageGenerator'

export async function POST(request: NextRequest) {
  try {
    const carbonData = await request.json()
    
    const imageBuffer = await generateShareImage(carbonData)
    
    return new NextResponse(imageBuffer as any, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Content-Length': imageBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (error) {
    console.error('Share image generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate share image' },
      { status: 500 }
    )
  }
}

