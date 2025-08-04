import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import AnimatedPage from '../../components/ui/AnimatedPage'
import { HiShieldCheck, HiDevicePhoneMobile, HiEnvelope, HiLockClosed } from 'react-icons/hi2'

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(60)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { verifyOTP, otpData, resetPassword, resendOTP } = useAuth()
  const navigate = useNavigate()

  const isPasswordReset = otpData?.type === 'password-reset'
  const isMobileVerification = otpData?.type === 'mobile-verification'
  const isEmailVerification = otpData?.type === 'email-verification'

  useEffect(() => {
    if (!otpData) {
      navigate('/login')
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
      } else if (isEmailVerification) {
        navigate('/login', {
          state: { message: 'Email verified successfully! Please sign in.' }
        })
      } else if (isMobileVerification) {
        navigate('/dashboard')
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

  const handleResendOTP = async () => {
    setLoading(true)
    const result = await resendOTP()

    if (result.success) {
      setResendCooldown(60)
      setError('')
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

  const otpInputVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  const getPageTitle = () => {
    if (isPasswordReset) return 'Reset Your Password'
    if (isMobileVerification) return 'Verify Mobile Number'
    if (isEmailVerification) return 'Verify Your Email'
    return 'Verify OTP'
  }

  const getPageDescription = () => {
    const contact = otpData?.email || otpData?.mobile
    if (isPasswordReset) return `We've sent a verification code to ${contact}`
    if (isMobileVerification) return `We've sent an OTP to ${contact}`
    if (isEmailVerification) return `We've sent a verification code to ${contact}`
    return `We've sent a verification code to ${contact}`
  }

  if (showPasswordReset) {
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
              className="mx-auto h-24 w-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <HiShieldCheck className="text-black text-3xl" />
            </motion.div>
            <h2 className="text-4xl font-extralight text-black tracking-wide leading-tight">Set New Password</h2>
            <p className="mt-4 text-black/60 font-light text-lg leading-relaxed">
              Enter your new password below
            </p>
          </motion.div>

          <motion.form onSubmit={handlePasswordReset} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg" variants={itemVariants}>
            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
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
                showPasswordToggle={true}
                className="border-gray-200 focus:ring-black focus:border-black"
              />

              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (error) setError('')
                }}
                showPasswordToggle={true}
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
                Reset Password
              </Button>
            </motion.div>
          </motion.form>
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
            className="mx-auto h-24 w-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isPasswordReset ? (
              <HiLockClosed className="text-black text-3xl" />
            ) : isMobileVerification ? (
              <HiDevicePhoneMobile className="text-black text-3xl" />
            ) : (
              <HiEnvelope className="text-black text-3xl" />
            )}
          </motion.div>
          <h2 className="text-4xl font-extralight text-black tracking-wide leading-tight">
            {getPageTitle()}
          </h2>
          <p className="mt-4 text-black/60 font-light text-lg leading-relaxed">
            {getPageDescription()}
          </p>
        </motion.div>

        <motion.form onSubmit={handleOTPSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg" variants={itemVariants}>
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
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
                className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200"
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
              className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium"
              loading={loading}
              disabled={loading}
            >
              {isPasswordReset ? 'Verify & Continue' : 'Verify Code'}
            </Button>
          </motion.div>

          <motion.div className="text-center pt-4 border-t border-gray-200" variants={itemVariants}>
            <p className="text-gray-500 mb-3 font-light">Didn't receive the code?</p>
            {resendCooldown > 0 ? (
              <p className="text-gray-400 font-light">Resend in {resendCooldown}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-black hover:text-gray-700 font-medium transition-colors tracking-wide"
              >
                Resend Code
              </button>
            )}
          </motion.div>
        </motion.form>

        <motion.div className="text-center" variants={itemVariants}>
          <button
            onClick={() => navigate(isPasswordReset ? '/forgot-password' : '/signup')}
            className="text-black/60 hover:text-black transition-colors font-light tracking-wide"
          >
            ← Back to {isPasswordReset ? 'Forgot Password' : 'Sign Up'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  )
}

export default OTPVerification
