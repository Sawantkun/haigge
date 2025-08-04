import React from 'react'
import { motion } from 'framer-motion'

const CartHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-[#ECEDED] px-4 py-2 rounded-full text-black font-medium text-sm mb-4"
      >
        <span className="w-2 h-2 bg-black rounded-full"></span>
        SHOPPING CART
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl font-black text-black mb-4"
      >
        Your Cart
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-600"
      >
        Review your items and proceed to checkout
      </motion.p>
    </motion.div>
  )
}

export default CartHeader
