import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    const result = await forgotPassword(email)

    if (result.success) {
      navigate('/otp-verification')
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
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

  return (
    <AnimatedPage className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="mx-auto h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <span className="text-3xl">🔐</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900">Forgot Password?</h2>
            <p className="mt-2 text-gray-600">
              Don't worry, we'll send you reset instructions
            </p>
          </motion.div>

          <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div className="space-y-4" variants={itemVariants}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleChange}
                  error={error && !email ? error : ''}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                Send Reset Code
              </Button>
            </motion.div>

            <motion.div className="text-center space-y-4" variants={itemVariants}>
              <Link
                to="/login"
                className="flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="mr-2">←</span>
                Back to Sign In
              </Link>

              <div className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-black hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>

      {/* Right side - Hero */}
      <motion.div
        className="hidden lg:block lg:flex-1 relative"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
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
            <h1 className="text-5xl font-bold mb-4">SECURE & SAFE</h1>
            <p className="text-xl mb-8">Your account security is our priority</p>
            <div className="grid grid-cols-1 gap-6 text-sm max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🛡️</span>
                </div>
                <span className="text-gray-300">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔒</span>
                </div>
                <span className="text-gray-300">Secure Password Reset</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm">⚡</span>
                </div>
                <span className="text-gray-300">Instant Email Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  )
}

export default ForgotPassword
