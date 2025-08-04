import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ProductInfo = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if user is not authenticated
      navigate('/login', {
        state: {
          from: window.location.pathname,
          message: 'Please log in to add items to your cart'
        }
      })
      return
    }

    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Product Title and Rating */}
      <motion.div variants={itemVariants}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-[#ECEDED] px-3 py-1 rounded-full text-black font-medium text-xs mb-3"
        >
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          {product.category}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl font-black text-black mb-3"
        >
          {product.name}
        </motion.h1>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-4"
        >
          <div className="flex text-black">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">{product.rating}/5</span>
          <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
        </motion.div>
      </motion.div>

      {/* Price */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-3xl font-bold text-black"
        >
          ${product.price}
        </motion.span>
        {product.originalPrice && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xl text-gray-400 line-through"
            >
              ${product.originalPrice}
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium"
            >
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </motion.span>
          </>
        )}
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants}>
        <h3 className="font-medium text-black mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </motion.div>

      {/* Color Selection */}
      <motion.div variants={itemVariants}>
        <h3 className="font-medium text-black mb-3">Color</h3>
        <div className="flex gap-3">
          {product.colors.map((color, index) => (
            <motion.button
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </motion.div>

      {/* Size Selection */}
      <motion.div variants={itemVariants}>
        <h3 className="font-medium text-black mb-3">Size</h3>
        <div className="flex gap-3">
          {product.sizes.map((size, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300 ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quantity */}
      <motion.div variants={itemVariants}>
        <h3 className="font-medium text-black mb-3">Quantity</h3>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center bg-[#F2F0F1] rounded-full w-fit"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-300 rounded-full transition-colors"
          >
            -
          </motion.button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-300 rounded-full transition-colors"
          >
            +
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Add to Cart Button */}
      <motion.div
        variants={itemVariants}
        className="flex gap-4"
      >
       <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="flex-1 bg-blue-700 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Virtual Try-On
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          Add to Cart
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </motion.div>


      {/* Product Features */}
      <motion.div
        variants={itemVariants}
        className="border-t pt-6"
      >
        <h3 className="font-medium text-black mb-3">Product Features</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </motion.svg>
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default ProductInfo
