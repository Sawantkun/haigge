import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <motion.div
        layout
        className="bg-[#F2F0F1] aspect-square rounded-xl overflow-hidden p-8 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={images[selectedImage]}
            alt={productName}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="w-full h-full object-contain transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        </AnimatePresence>
        <div className="w-full h-full bg-[#F2F0F1] flex items-center justify-center text-gray-400" style={{display: 'none'}}>
          {productName}
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-3 overflow-x-auto pb-2"
      >
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-16 h-16 bg-[#F2F0F1] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index ? 'border-black' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ProductGallery
