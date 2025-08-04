import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PromoCode = ({ onApplyPromo }) => {
  const [promoCode, setPromoCode] = useState('')

  const handleApply = () => {
    if (promoCode.trim()) {
      onApplyPromo(promoCode)
      setPromoCode('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl p-6 border border-gray-100 mb-6"
    >
      <h3 className="text-lg font-medium text-black mb-4">Promo Code</h3>
      <div className="flex gap-3">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#d1d5db" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApply}
          className="px-6 py-2 bg-[#ECEDED] text-black rounded-lg hover:bg-gray-300 transition-colors duration-300"
        >
          Apply
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PromoCode
