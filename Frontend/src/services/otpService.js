import apiClient from './api'

export const otpService = {
  async sendMobileOTP(mobile) {
    try {
      console.warn('Send mobile OTP not implemented in backend yet')
      return {
        success: false,
        message: 'Mobile OTP sending not available yet'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async sendEmailOTP(email) {
    try {
      console.warn('Send email OTP not implemented in backend yet')
      return {
        success: false,
        message: 'Email OTP sending not available yet'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async verifyMobileOTP(mobile, otp) {
    try {
      const response = await apiClient.post('/auth/verify-mobile', {
        user_id: localStorage.getItem('currentUserId'),
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

  async verifyEmailOTP(email, token) {
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

  async resendOTP(type, identifier) {
    try {
      console.warn('Resend OTP not implemented in backend yet')
      return {
        success: false,
        message: 'Resend OTP not available yet'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
