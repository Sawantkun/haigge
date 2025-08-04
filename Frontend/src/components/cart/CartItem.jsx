import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-24 h-24 bg-[#F2F0F1] rounded-lg overflow-hidden flex items-center justify-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full bg-[#F2F0F1] flex items-center justify-center text-xs text-gray-400" style={{display: 'none'}}>
          {item.name}
        </div>
      </motion.div>

      <div className="flex-1">
        <h3 className="font-medium text-black mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Size: {item.size} | Color: {item.color}</p>
        <div className="flex items-center space-x-2">
          <div className="flex text-[#000]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">{item.rating}/5</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center bg-[#F2F0F1] rounded-full"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-300 rounded-full transition-colors"
            disabled={item.quantity <= 1}
          >
            -
          </motion.button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-300 rounded-full transition-colors"
          >
            +
          </motion.button>
        </motion.div>

        <div className="text-right">
          <div className="font-bold text-black text-lg">${(item.price * item.quantity).toFixed(2)}</div>
          <div className="text-sm text-gray-500">${item.price} each</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CartItem
