import { NextRequest, NextResponse } from 'next/server'
import { localDB } from '@/lib/localData'

// Try MongoDB first, fallback to local storage
let useLocal = false

async function tryMongoDB() {
  try {
    const dbConnect = (await import('@/lib/mongodb')).default
    const Todo = (await import('@/models/Todo')).default
    await dbConnect()
    return { dbConnect, Todo }
  } catch (error) {
    console.log('MongoDB unavailable, using local storage')
    useLocal = true
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'anonymous'
    
    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      const todos = await mongo.Todo.find({ userId }).sort({ createdAt: -1 })
      return NextResponse.json({ success: true, data: todos })
    } else {
      const todos = localDB.todos.find({ userId })
      return NextResponse.json({ success: true, data: todos })
    }
  } catch (error) {
    console.error('Fetch todos error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      const todo = new mongo.Todo(data)
      await todo.save()
      return NextResponse.json({ success: true, data: todo })
    } else {
      const todo = localDB.todos.create(data)
      return NextResponse.json({ success: true, data: todo })
    }
  } catch (error) {
    console.error('Create todo error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    
    const mongo = await tryMongoDB()
    
    if (mongo && !useLocal) {
      const todo = await mongo.Todo.findByIdAndUpdate(
        id,
        { ...updates, ...(updates.completed && { completedAt: new Date() }) },
        { new: true }
      )
      return NextResponse.json({ success: true, data: todo })
    } else {
      const todo = localDB.todos.findByIdAndUpdate(id, {
        ...updates,
        ...(updates.completed && { completedAt: new Date() })
      })
      return NextResponse.json({ success: true, data: todo })
    }
  } catch (error) {
    console.error('Update todo error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}