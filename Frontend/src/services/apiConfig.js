// API endpoints constants
export const API_ENDPOINTS = {
  // Health Check
  HEALTH: '/health',

  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    VERIFY_MOBILE: '/auth/verify-mobile'
  },

  // User Management
  USERS: {
    PROFILE: '/users/profile',
    ADMIN_USER: (id) => `/admin/users/${id}`
  },

  // Address Management
  ADDRESSES: {
    LIST: '/addresses',
    DETAIL: (id) => `/addresses/${id}`,
    CREATE: '/addresses',
    UPDATE: (id) => `/addresses/${id}`,
    DELETE: (id) => `/addresses/${id}`,
    SET_DEFAULT: (id) => `/addresses/${id}/default`,
    GET_DEFAULT: (type) => `/addresses/default/${type}`
  },

  // OTP Endpoints (if they exist)
  OTP: {
    SEND_MOBILE: '/otp/send-mobile',
    SEND_EMAIL: '/otp/send-email',
    VERIFY_MOBILE: '/otp/verify-mobile',
    VERIFY_EMAIL: '/otp/verify-email'
  }
}

// Error codes from the API documentation
export const ERROR_CODES = {
  AUTH_001: 'Authentication failed',
  AUTH_002: 'Authorization failed',
  AUTH_003: 'Invalid credentials',
  AUTH_004: 'Account locked',
  AUTH_005: 'Token expired',
  AUTH_006: 'Invalid token',
  VAL_001: 'Validation error',
  VAL_002: 'Invalid phone number',
  VAL_003: 'Invalid PAN number',
  VAL_004: 'Invalid GST number',
  VAL_005: 'Address validation failed',
  USER_001: 'User not found',
  USER_002: 'User already exists',
  RATE_001: 'Rate limit exceeded',
  DB_001: 'Database operation failed',
  BQ_001: 'BigQuery operation failed',
  CACHE_001: 'Cache operation failed',
  EMAIL_001: 'Email service failed',
  SMS_001: 'SMS service failed',
  CONFIG_001: 'Configuration error',
  INTERNAL_001: 'Internal server error',
  SERVICE_001: 'Service unavailable',
  REQ_001: 'Bad request'
}

// Indian states for validation
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry'
]

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'or', name: 'Odia' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'as', name: 'Assamese' }
]

// Validation helpers
export const VALIDATORS = {
  // Indian mobile number validation (10 digits starting with 6-9)
  mobileNumber: (mobile) => {
    const pattern = /^[6-9]\d{9}$/
    return pattern.test(mobile)
  },

  // Indian pincode validation (6 digits, cannot start with 0)
  pincode: (pincode) => {
    const pattern = /^[1-9]\d{5}$/
    return pattern.test(pincode)
  },

  // Email validation
  email: (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
  },

  // PAN number validation
  panNumber: (pan) => {
    const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return pattern.test(pan)
  },

  // GST number validation
  gstNumber: (gst) => {
    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return pattern.test(gst)
  }
}

// Default configuration values
export const DEFAULT_CONFIG = {
  TIMEZONE: 'Asia/Kolkata',
  LANGUAGE: 'en',
  CURRENCY: 'INR',
  COUNTRY: 'India'
}
