import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [otpData, setOtpData] = useState(null)

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual API
      const response = await mockApiCall('/auth/login', { email, password })

      if (response.success) {
        const { token, user: userData } = response.data
        localStorage.setItem('authToken', token)
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  const signup = async (userData) => {
    try {
      // Simulate API call - replace with actual API
      const response = await mockApiCall('/auth/signup', userData)

      if (response.success) {
        setOtpData({ email: userData.email, userId: response.data.userId })
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Signup failed. Please try again.' }
    }
  }

  const forgotPassword = async (email) => {
    try {
      // Simulate API call - replace with actual API
      const response = await mockApiCall('/auth/forgot-password', { email })

      if (response.success) {
        setOtpData({
          email,
          userId: response.data.userId,
          type: 'password-reset'
        })
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Failed to send reset code. Please try again.' }
    }
  }

  const resetPassword = async (newPassword) => {
    try {
      if (!otpData || otpData.type !== 'password-reset') {
        return { success: false, message: 'No password reset session found' }
      }

      const response = await mockApiCall('/auth/reset-password', {
        email: otpData.email,
        userId: otpData.userId,
        newPassword
      })

      if (response.success) {
        setOtpData(null)
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'Password reset failed. Please try again.' }
    }
  }

  const verifyOTP = async (otp) => {
    try {
      if (!otpData) {
        return { success: false, message: 'No OTP session found' }
      }

      const response = await mockApiCall('/auth/verify-otp', {
        email: otpData.email,
        userId: otpData.userId,
        otp
      })

      if (response.success) {
        const { token, user: userData } = response.data
        localStorage.setItem('authToken', token)
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
        setOtpData(null)
        return { success: true }
      }
      return { success: false, message: response.message }
    } catch (error) {
      return { success: false, message: 'OTP verification failed. Please try again.' }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setOtpData(null)
  }

  const value = {
    user,
    loading,
    otpData,
    login,
    signup,
    forgotPassword,
    resetPassword,
    verifyOTP,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Mock API function - replace with actual API calls
const mockApiCall = async (endpoint, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case '/auth/login':
          if (data.email === 'user@example.com' && data.password === 'password') {
            resolve({
              success: true,
              data: {
                token: 'mock-jwt-token-' + Date.now(),
                user: { id: 1, email: data.email, name: 'John Doe' }
              }
            })
          } else {
            resolve({ success: false, message: 'Invalid credentials' })
          }
          break
        case '/auth/signup':
          resolve({
            success: true,
            data: { userId: Math.random().toString(36).substr(2, 9) }
          })
          break
        case '/auth/forgot-password':
          // Check if email exists (in real app, check against database)
          resolve({
            success: true,
            data: { userId: Math.random().toString(36).substr(2, 9) }
          })
          break
        case '/auth/reset-password':
          resolve({
            success: true,
            message: 'Password reset successful'
          })
          break
        case '/auth/verify-otp':
          if (data.otp === '123456') {
            if (data.type === 'password-reset') {
              resolve({
                success: true,
                data: { verified: true }
              })
            } else {
              resolve({
                success: true,
                data: {
                  token: 'mock-jwt-token-' + Date.now(),
                  user: { id: 2, email: data.email, name: 'New User' }
                }
              })
            }
          } else {
            resolve({ success: false, message: 'Invalid OTP' })
          }
          break
        default:
          resolve({ success: false, message: 'Endpoint not found' })
      }
    }, 1000)
  })
}
