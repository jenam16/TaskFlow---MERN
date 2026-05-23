// client/src/context/TaskContext.jsx
// Global task state — fetch, create, update, delete tasks

import { createContext, useContext, useState, useCallback } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

const TaskContext = createContext()

export const useTask = () => useContext(TaskContext)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  // ── Fetch all tasks for current user ─────────
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/tasks')
      setTasks(data)
    } catch (error) {
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Create a new task ─────────────────────────
  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData)
      setTasks((prev) => [data, ...prev]) // Add new task at top
      toast.success('Task created!')
      return data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task')
      throw error
    }
  }

  // ── Update an existing task ───────────────────
  const updateTask = async (id, updates) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates)
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)))
      toast.success('Task updated!')
      return data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task')
      throw error
    }
  }

  // ── Delete a task ─────────────────────────────
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      toast.success('Task deleted')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  // ── Update task status (used by Kanban drag) ──
  const updateTaskStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status })
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)))
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask, updateTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  )
}
