import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import AnimatedPage from '../../components/ui/AnimatedPage'

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(60)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { verifyOTP, otpData, resetPassword } = useAuth()
  const navigate = useNavigate()

  const isPasswordReset = otpData?.type === 'password-reset'

  useEffect(() => {
    if (!otpData) {
      navigate('/signup')
      return
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [otpData, navigate])

  const handleChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    if (error) setError('')
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')

    if (otpString.length !== 6) {
      setError('Please enter the complete OTP')
      return
    }

    setLoading(true)
    const result = await verifyOTP(otpString)

    if (result.success) {
      if (isPasswordReset) {
        setShowPasswordReset(true)
      } else {
        navigate('/dashboard')
      }
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()

    if (!newPassword) {
      setError('New password is required')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const result = await resetPassword(newPassword)

    if (result.success) {
      navigate('/login', {
        state: { message: 'Password reset successful. Please login with your new password.' }
      })
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  const handleResendOTP = () => {
    setResendCooldown(60)
    // Implement resend OTP logic here
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

  const otpInputVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  if (showPasswordReset) {
    return (
      <AnimatedPage className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <span className="text-green-600 text-3xl">✓</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
            <p className="mt-2 text-gray-600">
              Enter your new password below
            </p>
          </motion.div>

          <motion.form onSubmit={handlePasswordReset} className="space-y-6" variants={itemVariants}>
            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="space-y-4" variants={itemVariants}>
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  if (error) setError('')
                }}
              />

              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (error) setError('')
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                Reset Password
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="mx-auto h-24 w-24 bg-black rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <span className="text-white text-3xl">
              {isPasswordReset ? '🔐' : '📧'}
            </span>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isPasswordReset ? 'Reset Your Password' : 'Verify Your Email'}
          </h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to{' '}
            <span className="font-medium">{otpData?.email}</span>
          </p>
        </motion.div>

        <motion.form onSubmit={handleOTPSubmit} className="space-y-6" variants={itemVariants}>
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="flex justify-center space-x-3" variants={itemVariants}>
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                variants={otpInputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileFocus={{ scale: 1.05 }}
              />
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {isPasswordReset ? 'Verify & Continue' : 'Verify Email'}
            </Button>
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-gray-600">Didn't receive the code?</p>
            {resendCooldown > 0 ? (
              <p className="text-gray-500">Resend in {resendCooldown}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-black hover:underline font-medium"
              >
                Resend Code
              </button>
            )}
          </motion.div>
        </motion.form>

        <motion.div className="text-center" variants={itemVariants}>
          <button
            onClick={() => navigate(isPasswordReset ? '/forgot-password' : '/signup')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to {isPasswordReset ? 'Forgot Password' : 'Sign Up'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  )
}

export default OTPVerification
