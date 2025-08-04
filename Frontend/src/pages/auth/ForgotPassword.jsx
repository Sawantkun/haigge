import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'
import { HiCheckCircle, HiLockClosed } from 'react-icons/hi2'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    const result = await forgotPassword(email)

    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  const containerVariants = {
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

  if (success) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center bg-[#E4DCCF] px-4">
        <motion.div
          className="max-w-md w-full text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <HiCheckCircle className="text-black text-3xl" />
          </motion.div>

          <div>
            <h2 className="text-3xl font-extralight text-black tracking-wide leading-tight">Check Your Email</h2>
            <p className="text-black/60 mt-4 font-light text-lg leading-relaxed">
              We've sent a password reset link to<br />
              <span className="font-medium text-black">{email}</span>
            </p>
          </div>

          <p className="text-sm text-black/60">
            Redirecting to verification page...
          </p>
        </motion.div>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center bg-[#E4DCCF] px-4">
      <motion.div
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="mx-auto h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <HiLockClosed className="text-black text-3xl" />
          </motion.div>
          <h2 className="text-4xl font-extralight text-black tracking-wide leading-tight">Reset Password</h2>
          <p className="mt-4 text-black/60 leading-relaxed font-light text-lg">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg" variants={itemVariants}>
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              error={error && !email ? 'Email is required' : ''}
              className="border-gray-200 focus:ring-black focus:border-black"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium"
              loading={loading}
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </motion.div>

          <motion.div className="text-center space-y-4 pt-4 border-t border-gray-200" variants={itemVariants}>
            <Link to="/login" className="text-black hover:text-gray-700 transition-colors font-medium tracking-wide">
              ← Back to Sign In
            </Link>

            <div>
              <span className="text-gray-500 font-light">Don't have an account? </span>
              <Link to="/signup" className="text-black hover:text-gray-700 font-semibold transition-colors tracking-wide">
                Sign up
              </Link>
            </div>
          </motion.div>
        </motion.form>
      </motion.div>
    </AnimatedPage>
  )
}

export default ForgotPassword
