'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Plus, Trash2, Calendar } from 'lucide-react'

interface Todo {
  _id: string
  title: string
  description: string
  category: string
  estimatedCO2Reduction: number
  difficulty: string
  completed: boolean
  priority: string
  dueDate?: string
}

interface Props {
  userId: string
  newTodo?: any
}

export default function TodoList({ userId, newTodo }: Props) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTodoData, setNewTodoData] = useState({
    title: '',
    description: '',
    category: 'general',
    estimatedCO2Reduction: 0,
    difficulty: 'medium',
    priority: 'medium',
    dueDate: ''
  })

  const fetchTodos = async () => {
    try {
      const response = await fetch(`/api/todos?userId=${userId}`)
      const result = await response.json()
      if (result.success) {
        setTodos(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  const addTodo = async (todoData: any) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todoData, userId })
      })
      
      const result = await response.json()
      if (result.success) {
        setTodos(prev => [result.data, ...prev])
        setNewTodoData({
          title: '',
          description: '',
          category: 'general',
          estimatedCO2Reduction: 0,
          difficulty: 'medium',
          priority: 'medium',
          dueDate: ''
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed })
      })
      
      const result = await response.json()
      if (result.success) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? { ...todo, completed } : todo
        ))
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [userId])

  useEffect(() => {
    if (newTodo) {
      addTodo({
        title: newTodo.title,
        description: newTodo.description,
        category: 'general',
        estimatedCO2Reduction: parseFloat(newTodo.impact.match(/[\d.]+/)?.[0] || '0'),
        difficulty: newTodo.difficulty,
        priority: 'medium'
      })
    }
  }, [newTodo])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo(newTodoData)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  return (
    <div className="bg-white p-6 rounded-lg card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Carbon Reduction Todos</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </button>
      </div>

      {/* Add Todo Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={newTodoData.title}
                onChange={(e) => setNewTodoData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newTodoData.category}
                onChange={(e) => setNewTodoData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="transportation">Transportation</option>
                <option value="energy">Energy</option>
                <option value="food">Food</option>
                <option value="waste">Waste</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                className="w-full p-2 border rounded-md"
                value={newTodoData.priority}
                onChange={(e) => setNewTodoData(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={newTodoData.dueDate}
                onChange={(e) => setNewTodoData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={newTodoData.description}
              onChange={(e) => setNewTodoData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Pending Todos */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Pending ({pendingTodos.length})</h4>
        {pendingTodos.map(todo => (
          <div key={todo._id} className={`border-l-4 ${getPriorityColor(todo.priority)} bg-gray-50 p-4 rounded-r-lg`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleTodo(todo._id, true)}
                  className="text-gray-400 hover:text-green-600 mt-1"
                >
                  <Circle className="w-5 h-5" />
                </button>
                <div>
                  <h5 className="font-medium">{todo.title}</h5>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span className="capitalize">{todo.category}</span>
                    <span className="capitalize">{todo.difficulty}</span>
                    {todo.estimatedCO2Reduction > 0 && (
                      <span>{todo.estimatedCO2Reduction} kg CO2 reduction</span>
                    )}
                    {todo.dueDate && (
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="mt-8 space-y-3">
          <h4 className="font-medium text-gray-700">Completed ({completedTodos.length})</h4>
          {completedTodos.map(todo => (
            <div key={todo._id} className="bg-green-50 p-4 rounded-lg opacity-75">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleTodo(todo._id, false)}
                  className="text-green-600 mt-1"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <div>
                  <h5 className="font-medium line-through">{todo.title}</h5>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No todos yet. Add some carbon reduction goals!</p>
        </div>
      )}
    </div>
  )
}