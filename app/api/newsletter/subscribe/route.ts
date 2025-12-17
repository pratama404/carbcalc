import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({
                success: false,
                error: 'Please provide a valid email address'
            }, { status: 400 })
        }

        // In a real application, you would save this to a database
        // For now, we'll simulate a successful database insertion
        console.log(`New newsletter subscription: ${email}`)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({
            success: true,
            data: {
                email,
                message: 'Successfully subscribed to newsletter'
            }
        })
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}
