import apiClient from './api'

export const addressService = {
  async getAddresses() {
    try {
      const response = await apiClient.get('/addresses')

      return {
        success: true,
        data: response.data.addresses
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async getAddress(addressId) {
    try {
      const response = await apiClient.get(`/addresses/${addressId}`)

      return {
        success: true,
        data: response.data.address
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async createAddress(addressData) {
    try {
      const response = await apiClient.post('/addresses', {
        address_type: addressData.addressType || 'shipping',
        first_name: addressData.firstName,
        last_name: addressData.lastName,
        company: addressData.company || '',
        address_line_1: addressData.addressLine1,
        address_line_2: addressData.addressLine2 || '',
        landmark: addressData.landmark || '',
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        is_default: addressData.isDefault || false,
        delivery_instructions: addressData.deliveryInstructions || ''
      })

      return {
        success: true,
        data: response.data.address,
        message: response.message
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async updateAddress(addressId, addressData) {
    try {
      const response = await apiClient.put(`/addresses/${addressId}`, {
        address_type: addressData.addressType,
        first_name: addressData.firstName,
        last_name: addressData.lastName,
        company: addressData.company,
        address_line_1: addressData.addressLine1,
        address_line_2: addressData.addressLine2,
        landmark: addressData.landmark,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        is_default: addressData.isDefault,
        delivery_instructions: addressData.deliveryInstructions
      })

      return {
        success: true,
        data: response.data.address,
        message: response.message
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async deleteAddress(addressId) {
    try {
      const response = await apiClient.delete(`/addresses/${addressId}`)

      return {
        success: true,
        message: response.message
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async setDefaultAddress(addressId) {
    try {
      const response = await apiClient.put(`/addresses/${addressId}/default`)

      return {
        success: true,
        message: response.message
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  },

  async getDefaultAddress(type = 'shipping') {
    try {
      const response = await apiClient.get(`/addresses/default/${type}`)

      return {
        success: true,
        data: response.data.address
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
