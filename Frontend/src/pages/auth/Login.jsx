import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'
import LoginImage from "/ai-model2.png"

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    // Check for success message from password reset
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
    const result = await login(formData.email, formData.password)

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

  return (
    <AnimatedPage className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </motion.div>

          <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
            {successMessage && (
              <motion.div
                className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {successMessage}
              </motion.div>
            )}

            {errors.general && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.general}
              </motion.div>
            )}

            <motion.div className="space-y-4" variants={itemVariants}>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <div className="text-sm">
                <Link to="/forgot-password" className="text-black hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-black hover:underline font-medium">
                Sign up
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>

      {/* Right side - Hero */}
      <motion.div
        className="hidden lg:block lg:flex-1 relative"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="absolute inset-0 bg-cover bg-left bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LoginImage})`
          }}
        >
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-center text-white px-8">
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              LUXURY FASHION
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Discover clothes that match your style
            </motion.p>
            <motion.div
              className="flex justify-center space-x-8 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-gray-300">International Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2,000+</div>
                <div className="text-gray-300">High-Quality Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold">30,000+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  )
}

export default Login
