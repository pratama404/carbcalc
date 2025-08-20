import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Todo from '@/models/Todo'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'anonymous'
    const filter = searchParams.get('filter') || 'all'
    
    let query: any = { userId }
    
    if (filter === 'pending') {
      query.completed = false
    } else if (filter === 'completed') {
      query.completed = true
    } else if (filter === 'overdue') {
      query.completed = false
      query.dueDate = { $lt: new Date() }
    }
    
    const todos = await Todo.find(query).sort({ 
      completed: 1, 
      priority: -1, 
      dueDate: 1, 
      createdAt: -1 
    })
    
    return NextResponse.json({ success: true, data: todos })
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
    await dbConnect()
    
    const data = await request.json()
    const todo = new Todo(data)
    await todo.save()
    
    return NextResponse.json({ success: true, data: todo })
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
    await dbConnect()
    
    const { id, ...updates } = await request.json()
    
    const updateData = {
      ...updates,
      ...(updates.completed !== undefined && updates.completed && { completedAt: new Date() }),
      ...(updates.completed !== undefined && !updates.completed && { completedAt: null })
    }
    
    const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true })
    
    if (!todo) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: todo })
  } catch (error) {
    console.error('Update todo error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Todo ID is required' },
        { status: 400 }
      )
    }
    
    const todo = await Todo.findByIdAndDelete(id)
    
    if (!todo) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Delete todo error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}