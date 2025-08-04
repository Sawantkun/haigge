import apiClient from './api'

export const authService = {
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        mobile: userData.mobile,
        phone: userData.mobile // Send same number for both mobile and phone
      })

      return {
        success: true,
        data: response,
        message: response.message || 'Registration successful'
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      }
    }
  },

  async login(email, password, rememberMe = false) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      })

      if (response && response.access_token) {
        const { access_token, refresh_token } = response

        localStorage.setItem('authToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)

        return {
          success: true,
          data: response,
          message: 'Login successful'
        }
      }

      return {
        success: false,
        message: 'Invalid response from server'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed'
      }
    }
  },

  async logout() {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userData')
    } catch (error) {
      console.warn('Logout request failed:', error.message)
    }

    return { success: true }
  },

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await apiClient.post('/auth/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      })

      if (response && response.access_token) {
        const { access_token } = response
        localStorage.setItem('authToken', access_token)

        return {
          success: true,
          data: response
        }
      }

      return {
        success: false,
        message: 'Invalid response from server'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async forgotPassword(email) {
    try {
      console.warn('Forgot password not implemented in backend yet')
      return {
        success: false,
        message: 'Forgot password feature not available yet'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async resetPassword(token, newPassword) {
    try {
      console.warn('Reset password not implemented in backend yet')
      return {
        success: false,
        message: 'Reset password feature not available yet'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async verifyEmail(token) {
    try {
      const response = await apiClient.get(`/auth/verify-email?token=${token}`)

      return {
        success: true,
        message: response.message || 'Email verified successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async verifyMobile(userId, otp) {
    try {
      const response = await apiClient.post('/auth/verify-mobile', {
        user_id: userId,
        otp: otp
      })

      return {
        success: true,
        message: response.message || 'Mobile verified successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile')

      return {
        success: true,
        data: response
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await apiClient.put('/users/profile', profileData)

      return {
        success: true,
        data: response,
        message: response.message || 'Profile updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
