// Temporary local storage fallback for development
let localData: any = {
  carbonEntries: [],
  todos: []
}

export const localDB = {
  carbonEntries: {
    create: (data: any) => {
      const entry = { ...data, _id: Date.now().toString(), createdAt: new Date() }
      localData.carbonEntries.push(entry)
      return entry
    },
    find: (query: any = {}) => {
      return localData.carbonEntries.filter((entry: any) => {
        if (query.userId && entry.userId !== query.userId) return false
        return true
      }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  },
  todos: {
    create: (data: any) => {
      const todo = { ...data, _id: Date.now().toString(), createdAt: new Date() }
      localData.todos.push(todo)
      return todo
    },
    find: (query: any = {}) => {
      return localData.todos.filter((todo: any) => {
        if (query.userId && todo.userId !== query.userId) return false
        return true
      }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    findByIdAndUpdate: (id: string, updates: any) => {
      const index = localData.todos.findIndex((todo: any) => todo._id === id)
      if (index !== -1) {
        localData.todos[index] = { ...localData.todos[index], ...updates }
        return localData.todos[index]
      }
      return null
    }
  }
}