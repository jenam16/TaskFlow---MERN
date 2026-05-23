// client/src/services/api.js
// Configured Axios instance — adds JWT token to every request automatically

import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Proxied to http://localhost:5000/api in dev
})

// ── Request Interceptor ───────────────────────
// Attach JWT token from localStorage to every outgoing request
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
// Handle 401 Unauthorized globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token')
      localStorage.removeItem('taskflow_user')
      window.location.href = '/login' // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default api
