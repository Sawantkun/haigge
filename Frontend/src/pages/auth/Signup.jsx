import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AnimatedPage from '../../components/ui/AnimatedPage'
import { HiSparkles, HiGift, HiClock, HiHeart } from 'react-icons/hi2'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
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
    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Invalid Indian mobile number'
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
      toast.success('Account created successfully, login now', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      navigate('/login')
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
    <AnimatedPage className="min-h-screen flex bg-white">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 bg-[#E4DCCF]">
        <motion.div
          className="max-w-md w-full space-y-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-5xl font-extralight text-black mb-4 tracking-wide leading-tight">Join Us</h2>
            <p className="text-black/60 text-lg font-light">Start your journey today</p>
          </motion.div>

          <motion.form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit} variants={itemVariants}>
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
                  className="border-gray-200 focus:ring-black focus:border-black"
                />
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  className="border-gray-200 focus:ring-black focus:border-black"
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
                  className="border-gray-200 focus:ring-black focus:border-black"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Input
                  name="mobile"
                  type="tel"
                  placeholder="Mobile number (10 digits)"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={errors.mobile}
                  maxLength={10}
                  className="border-gray-200 focus:ring-black focus:border-black"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  showPasswordToggle={true}
                  className="border-gray-200 focus:ring-black focus:border-black"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  showPasswordToggle={true}
                  className="border-gray-200 focus:ring-black focus:border-black"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium tracking-wide"
                loading={loading}
                disabled={loading}
              >
                Create Account
              </Button>
            </motion.div>

            <motion.div className="text-center pt-6 border-t border-gray-200" variants={itemVariants}>
              <span className="text-gray-500 font-light">Already have an account? </span>
              <Link to="/login" className="text-black hover:text-gray-700 font-semibold transition-colors tracking-wide">
                Sign in
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#E4DCCF] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-white rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-[#E4DCCF] rounded-full opacity-15 blur-xl"></div>
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
              <div className="w-20 h-20 bg-[#E4DCCF] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <HiSparkles className="text-3xl text-black" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl font-extralight mb-6 tracking-wide leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              DISCOVER MORE
            </motion.h1>
            <motion.p
              className="text-lg mb-10 text-[#E4DCCF] font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Join thousands of satisfied customers
            </motion.p>

            <motion.div
              className="grid grid-cols-1 gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <HiGift className="text-[#E4DCCF] text-xl" />
                <span className="text-gray-200 font-light tracking-wide">Special offers & rewards</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <HiClock className="text-[#E4DCCF] text-xl" />
                <span className="text-gray-200 font-light tracking-wide">Easy returns & exchanges</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <HiHeart className="text-[#E4DCCF] text-xl" />
                <span className="text-gray-200 font-light tracking-wide">24/7 customer support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  )
}

export default Signup
