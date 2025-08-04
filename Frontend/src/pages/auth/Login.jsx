import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'
import { HiCube, HiStar, HiShieldCheck, HiTruck, HiPaintBrush } from 'react-icons/hi2'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [showThemeDropdown, setShowThemeDropdown] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const themes = [
    {
      name: 'Default',
      primary: '#E4DCCF',
      secondary: '#000000',
      background: '#FFFFFF',
      text: '#000000',
      textLight: '#666666'
    },
        {
      name: 'Elegant Cream',
      primary: '#ECE0D1',
      secondary: '#1C1C1E',
      background: '#F8F6F0',
      text: '#2E2E2E',
      textLight: '#2E2E2E',
    },
    {
      name: 'Sage & Cream',
      primary: '#9CAF88',
      secondary: '#2F4F2F',
      background: '#F5F5DC',
      text: '#2F4F2F',
      textLight: '#556B2F'
    },
    {
      name: 'Dusty Rose & Navy',
      primary: '#D4A5A5',
      secondary: '#2C3E50',
      background: '#FAF7F7',
      text: '#2C3E50',
      textLight: '#5D6D7E'
    },
    {
      name: 'Nude & Charcoal',
      primary: '#F2DCDC',
      secondary: '#2E2E2E',
      background: '#F6E7D7',
      text: '#2E2E2E',
      textLight: '#6B6B6B'
    },
    {
      name: 'Lavender & Plum',
      primary: '#C8A8E9',
      secondary: '#4A4A4A',
      background: '#F8F5FF',
      text: '#4A4A4A',
      textLight: '#6B6B6B'
    },
    {
      name: 'Terracotta & Cream',
      primary: '#E07A5F',
      secondary: '#3D405B',
      background: '#F4F3EE',
      text: '#3D405B',
      textLight: '#81B29A'
    },
    {
      name: 'Ocean Blue & Sand',
      primary: '#A8DADC',
      secondary: '#1D3557',
      background: '#F1FAEE',
      text: '#1D3557',
      textLight: '#457B9D'
    },
    {
      name: 'Warm Coral & Teal',
      primary: '#FF8A80',
      secondary: '#00695C',
      background: '#FFF8F6',
      text: '#00695C',
      textLight: '#4DB6AC'
    }
  ]

  const currentThemeColors = themes[currentTheme]

  const from = location.state?.from || '/'

  useEffect(() => {
    // Check for success message from password reset or redirect message
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
    }
  }, [location.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    const result = await login(formData.email, formData.password, rememberMe)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setErrors({ general: result.message })
    }
    setLoading(false)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const heroVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const themeToggleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <AnimatedPage className="min-h-screen flex bg-white">
      {/* Theme Toggle Button */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        variants={themeToggleVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1, duration: 0.3 }}
      >
        <div className="relative">
          <motion.button
            onClick={() => setShowThemeDropdown(!showThemeDropdown)}
            className="p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
            style={{
              backgroundColor: currentThemeColors.primary,
              color: currentThemeColors.secondary
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiPaintBrush className="w-6 h-6" />
          </motion.button>

          {showThemeDropdown && (
            <motion.div
              className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border p-2 min-w-[160px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {themes.map((theme, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTheme(index)
                    setShowThemeDropdown(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentTheme === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div
                        className="w-3 h-3 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.secondary }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full border border-gray-200"
                        style={{ backgroundColor: theme.background }}
                      ></div>
                    </div>
                    <span className="text-gray-700">{theme.name}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Left side - Hero */}
      <motion.div
        className="hidden lg:block lg:flex-1 relative"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Static dark overlay - doesn't change with theme */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Decorative elements - these can change with theme */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-10 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: currentThemeColors.primary }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-5 blur-2xl transition-colors duration-500"
            style={{ backgroundColor: currentThemeColors.background }}
          ></div>
          <div
            className="absolute top-3/4 left-1/3 w-16 h-16 rounded-full opacity-15 blur-xl transition-colors duration-500"
            style={{ backgroundColor: currentThemeColors.primary }}
          ></div>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-center text-white px-8 max-w-md relative z-10">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl transition-colors duration-500"
                style={{ backgroundColor: currentThemeColors.primary }}
              >
                <HiCube
                  className="text-3xl transition-colors duration-500"
                  style={{ color: currentThemeColors.secondary }}
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl font-extralight mb-6 tracking-wide leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              WELCOME BACK
            </motion.h1>
            <motion.p
              className="text-lg mb-10 font-light leading-relaxed transition-colors duration-500"
              style={{ color: currentThemeColors.primary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Continue your journey with us
            </motion.p>

            <motion.div
              className="space-y-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <HiStar
                  className="text-xl transition-colors duration-500"
                  style={{ color: currentThemeColors.primary }}
                />
                <span className="text-gray-200 font-light tracking-wide">Premium Selection</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <HiShieldCheck
                  className="text-xl transition-colors duration-500"
                  style={{ color: currentThemeColors.primary }}
                />
                <span className="text-gray-200 font-light tracking-wide">Quality Assured</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <HiTruck
                  className="text-xl transition-colors duration-500"
                  style={{ color: currentThemeColors.primary }}
                />
                <span className="text-gray-200 font-light tracking-wide">Fast Delivery</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 transition-colors duration-500"
        style={{ backgroundColor: currentThemeColors.primary }}
      >
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2
              className="text-5xl font-extralight mb-4 tracking-wide leading-tight transition-colors duration-500"
              style={{ color: currentThemeColors.text }}
            >
              Sign In
            </h2>
            <p
              className="text-lg font-light transition-colors duration-500"
              style={{ color: currentThemeColors.textLight }}
            >
              Access your account
            </p>
          </motion.div>

          <motion.form
            className="mt-8 space-y-6 p-8 rounded-2xl shadow-lg transition-colors duration-500"
            style={{ backgroundColor: currentThemeColors.background }}
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            {successMessage && (
              <motion.div
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {successMessage}
              </motion.div>
            )}

            {errors.general && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.general}
              </motion.div>
            )}

            <motion.div className="space-y-5" variants={itemVariants}>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                className="border-gray-200 transition-colors duration-500"
                style={{
                  '--focus-ring-color': currentThemeColors.secondary,
                  '--focus-border-color': currentThemeColors.secondary
                }}
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPasswordToggle={true}
                className="border-gray-200 transition-colors duration-500"
                style={{
                  '--focus-ring-color': currentThemeColors.secondary,
                  '--focus-border-color': currentThemeColors.secondary
                }}
              />
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded transition-colors duration-500"
                  style={{
                    accentColor: currentThemeColors.secondary
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm font-medium transition-colors duration-500"
                  style={{ color: currentThemeColors.textLight }}
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="transition-colors duration-500 font-medium tracking-wide hover:opacity-70"
                  style={{ color: currentThemeColors.text }}
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full py-4 text-lg font-medium tracking-wide transition-colors duration-500"
                style={{
                  backgroundColor: currentThemeColors.secondary,
                  color: currentThemeColors.background
                }}
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div className="text-center pt-6 border-t border-gray-200" variants={itemVariants}>
              <span
                className="font-light transition-colors duration-500"
                style={{ color: currentThemeColors.textLight }}
              >
                New here?
              </span>
              <Link
                to="/signup"
                className="font-semibold transition-colors duration-500 tracking-wide hover:opacity-70 ml-1"
                style={{ color: currentThemeColors.text }}
              >
                Create account
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}

export default Login
