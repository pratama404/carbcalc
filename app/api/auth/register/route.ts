import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await client.connect()
    const users = client.db().collection('users')
    
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = bcrypt.hashSync(password, 12)
    
    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({ message: 'User created successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  } finally {
    await client.close()
  }
}