// client/src/services/api.js

import axios from 'axios'

// ── Base URL ──────────────────────────────────
// VITE_API_URL should be: https://taskflow-backend-yxr1.onrender.com
// We append /api here in code — do NOT put /api in the env variable
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,  // ← ADD THIS: required when backend has credentials: true
})

// ── Request Interceptor ───────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taskflow_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response Interceptor ──────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token')
      localStorage.removeItem('taskflow_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api