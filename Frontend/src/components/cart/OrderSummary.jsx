import React from 'react'
import { motion } from 'framer-motion'

const OrderSummary = ({ items, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl p-6 border border-gray-100 sticky top-6"
    >
      <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className="flex justify-between text-lg font-bold text-black">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={onCheckout}
        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 mb-4"
      >
        Proceed to Checkout
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02, borderColor: "#374151" }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
      >
        Continue Shopping
      </motion.button>

      {shipping > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-[#ECEDED] rounded-lg"
        >
          <p className="text-sm text-gray-600">
            Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default OrderSummary
