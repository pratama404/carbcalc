'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Plus, Trash2, Calendar, Edit3, Target, Zap, Clock, Filter, Trophy, Flame, Star, X } from 'lucide-react'

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
  completedAt?: string
}

interface Props {
  userId: string
  newTodo?: any
}

export default function TodoList({ userId, newTodo }: Props) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    totalCO2Saved: 0,
    streak: 0
  })
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
      setLoading(true)
      const response = await fetch(`/api/todos?userId=${userId}&filter=${filter}`)
      const result = await response.json()
      if (result.success) {
        setTodos(result.data)
        calculateStats(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (todoList: Todo[]) => {
    const total = todoList.length
    const completed = todoList.filter(t => t.completed).length
    const pending = todoList.filter(t => !t.completed).length
    const overdue = todoList.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length
    const totalCO2Saved = todoList.filter(t => t.completed).reduce((sum, t) => sum + t.estimatedCO2Reduction, 0)
    
    setStats({ total, completed, pending, overdue, totalCO2Saved, streak: 0 })
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
        fetchTodos()
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

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      })
      
      const result = await response.json()
      if (result.success) {
        fetchTodos()
        if (updates.completed) {
          showCelebration()
        }
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this todo?')) return
    
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      if (result.success) {
        fetchTodos()
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const showCelebration = () => {
    const celebration = document.createElement('div')
    celebration.innerHTML = '🎉 Great job! Keep it up! 🌱'
    celebration.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce'
    document.body.appendChild(celebration)
    setTimeout(() => {
      document.body.removeChild(celebration)
    }, 3000)
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    updateTodo(id, { completed })
  }

  useEffect(() => {
    fetchTodos()
  }, [userId, filter])

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

  return (
    <div className="space-y-6">
      {/* Stats Dashboard */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Target className="w-6 h-6 mr-2 text-green-600" />
            Carbon Reduction Todos
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total Goals</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.totalCO2Saved.toFixed(1)}</div>
            <div className="text-xs text-gray-600">kg CO₂ Saved</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
              {stats.streak > 0 && <Flame className="w-5 h-5 mr-1" />}
              {stats.streak}
            </div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          {[
            { key: 'all', label: 'All', count: stats.total },
            { key: 'pending', label: 'Pending', count: stats.pending },
            { key: 'completed', label: 'Completed', count: stats.completed },
            { key: 'overdue', label: 'Overdue', count: stats.overdue }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === filterOption.key
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading your goals...</p>
          </div>
        )}

        {!loading && (
          <div className="space-y-4">
            {todos.map(todo => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={(completed) => toggleTodo(todo._id, completed)}
                onEdit={() => {
                  setEditingTodo(todo)
                  setNewTodoData({
                    title: todo.title,
                    description: todo.description,
                    category: todo.category,
                    estimatedCO2Reduction: todo.estimatedCO2Reduction,
                    difficulty: todo.difficulty,
                    priority: todo.priority,
                    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
                  })
                }}
                onDelete={() => deleteTodo(todo._id)}
              />
            ))}
          </div>
        )}

        {!loading && todos.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              {filter === 'all' ? 'No goals yet!' : `No ${filter} goals`}
            </h4>
            <p className="text-gray-500 mb-4">
              {filter === 'all' 
                ? 'Start your carbon reduction journey by adding your first goal!' 
                : `Switch to "All" to see your other goals.`}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Your First Goal
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Todo Form */}
      {(showAddForm || editingTodo) && (
        <TodoFormModal
          todo={editingTodo}
          onClose={() => {
            setShowAddForm(false)
            setEditingTodo(null)
            setNewTodoData({
              title: '',
              description: '',
              category: 'general',
              estimatedCO2Reduction: 0,
              difficulty: 'medium',
              priority: 'medium',
              dueDate: ''
            })
          }}
          onSubmit={(data) => {
            if (editingTodo) {
              updateTodo(editingTodo._id, data)
            } else {
              addTodo(data)
            }
          }}
          formData={editingTodo || newTodoData}
          setFormData={setNewTodoData}
        />
      )}
    </div>
  )
}

function TodoCard({ todo, onToggle, onEdit, onDelete }: {
  todo: Todo
  onToggle: (completed: boolean) => void
  onEdit: () => void
  onDelete: () => void
}) {
  const isOverdue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Star className="w-4 h-4 text-green-500" />
      case 'medium': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'hard': return <Trophy className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  return (
    <div className={`border-l-4 p-4 rounded-r-lg transition-all hover:shadow-md ${
      todo.completed 
        ? 'bg-green-50 border-l-green-500 opacity-75' 
        : isOverdue 
          ? 'bg-red-50 border-l-red-500' 
          : getPriorityColor(todo.priority)
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(!todo.completed)}
            className={`mt-1 transition-colors ${
              todo.completed 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-400 hover:text-green-600'
            }`}
          >
            {todo.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h5 className={`font-semibold ${todo.completed ? 'line-through text-gray-600' : 'text-gray-900'}`}>
                {todo.title}
              </h5>
              {getDifficultyIcon(todo.difficulty)}
              {isOverdue && <Clock className="w-4 h-4 text-red-500" />}
            </div>
            
            {todo.description && (
              <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="capitalize px-2 py-1 bg-white rounded-full">{todo.category}</span>
              <span className="capitalize">{todo.difficulty}</span>
              <span className="capitalize">{todo.priority} priority</span>
              {todo.estimatedCO2Reduction > 0 && (
                <span className="text-green-600 font-medium">
                  {todo.estimatedCO2Reduction} kg CO₂
                </span>
              )}
              {todo.dueDate && (
                <span className={`flex items-center ${
                  isOverdue ? 'text-red-600 font-medium' : ''
                }`}>
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit todo"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function TodoFormModal({ todo, onClose, onSubmit, formData, setFormData }: {
  todo?: Todo | null
  onClose: () => void
  onSubmit: (data: any) => void
  formData: any
  setFormData: (data: any) => void
}) {
  const isEditing = !!todo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{isEditing ? 'Edit Goal' : 'Add New Goal'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Goal Title *</label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Use public transport for work commute"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="transportation">Transportation</option>
                <option value="energy">Energy</option>
                <option value="food">Food</option>
                <option value="waste">Waste</option>
                <option value="general">General</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your goal and how you plan to achieve it..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Estimated CO₂ Reduction (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                value={formData.estimatedCO2Reduction}
                onChange={(e) => setFormData({ ...formData, estimatedCO2Reduction: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {isEditing ? 'Update Goal' : 'Add Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}