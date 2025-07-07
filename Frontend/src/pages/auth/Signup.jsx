import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'
import SignUpImage from '/ai-model1.png'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
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
    const result = await signup(formData)

    if (result.success) {
      navigate('/otp-verification')
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
      {/* Left side - Hero */}
      <motion.div
        className="hidden lg:block lg:flex-1 relative"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${SignUpImage}')`
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
              JOIN THE ELITE
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Experience luxury fashion like never before
            </motion.p>
            <motion.div
              className="grid grid-cols-3 gap-8 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="text-gray-300">Premium Quality</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div className="text-gray-300">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-2xl">🕛</span>
                </div>
                <div className="text-gray-300">24X7 Service</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-4xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our exclusive community</p>
          </motion.div>

          <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
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
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                Create Account
              </Button>
            </motion.div>

            <motion.div className="text-center" variants={itemVariants}>
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-black hover:underline font-medium">
                Sign in
              </Link>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}

export default Signup
