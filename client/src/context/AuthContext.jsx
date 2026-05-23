// client/src/context/AuthContext.jsx
// Global authentication state using React Context API

import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

// Custom hook to access auth context easily
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Check if we're loading initial auth state

  // On app load: restore user from localStorage if token exists
  useEffect(() => {
    const savedUser = localStorage.getItem('taskflow_user')
    const savedToken = localStorage.getItem('taskflow_token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // ── Register ────────────────────────────────
  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('taskflow_token', data.token)
    localStorage.setItem('taskflow_user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }))
    setUser({ _id: data._id, name: data.name, email: data.email })
    return data
  }

  // ── Login ───────────────────────────────────
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('taskflow_token', data.token)
    localStorage.setItem('taskflow_user', JSON.stringify({ _id: data._id, name: data.name, email: data.email }))
    setUser({ _id: data._id, name: data.name, email: data.email })
    return data
  }

  // ── Logout ──────────────────────────────────
  const logout = () => {
    localStorage.removeItem('taskflow_token')
    localStorage.removeItem('taskflow_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
