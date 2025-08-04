import axios from 'axios'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const DEBUG_API = import.meta.env.VITE_DEBUG_API === 'true'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    if (DEBUG_API) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url, config.data)
    }

    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (DEBUG_API) {
      console.log('✅ API Response:', response.config.url, response.data)
    }
    return response.data
  },
  async (error) => {
    if (DEBUG_API) {
      console.error('❌ API Error Details:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        data: error.config?.data
      })
    }

    const originalRequest = error.config

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const tokenData = refreshResponse.data?.data || refreshResponse.data
          const { access_token, refresh_token } = tokenData

          localStorage.setItem('authToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)

          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return apiClient(originalRequest)
        } catch (refreshError) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userData')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }
    }

    // Extract error message from response
    const errorMessage = error.response?.data?.error?.message ||
                        error.response?.data?.message ||
                        error.message ||
                        'An unexpected error occurred'

    return Promise.reject({
      success: false,
      message: errorMessage,
      status: error.response?.status,
      code: error.response?.data?.error?.code
    })
  }
)

export default apiClient
