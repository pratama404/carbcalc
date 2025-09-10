import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { carbonData, airQualityData, shareMode, transparent, format } = await request.json()
    
    // Return configuration for client-side canvas generation
    return NextResponse.json({
      success: true,
      config: {
        carbonData,
        airQualityData,
        shareMode,
        transparent,
        format
      }
    })
  } catch (error) {
    console.error('Share config error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get share config' },
      { status: 500 }
    )
  }
}