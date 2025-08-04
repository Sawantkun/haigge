import React from 'react'
import { motion } from 'framer-motion'

const RelatedProducts = ({ products }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-[#ECEDED] px-4 py-2 rounded-full text-black font-medium text-sm mb-4"
        >
          <span className="w-2 h-2 bg-black rounded-full"></span>
          YOU MIGHT ALSO LIKE
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl font-black text-black"
        >
          Related Products
        </motion.h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#F2F0F1] aspect-[3/4] rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300"
              />
            </motion.div>
            <motion.h3
              whileHover={{ color: "#d4a574" }}
              className="font-medium text-black mb-2 group-hover:text-[#d4a574] transition-colors"
            >
              {product.name}
            </motion.h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 + index * 0.1 + i * 0.05 }}
                    className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">{product.rating}/5</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="font-bold text-black"
            >
              ${product.price}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default RelatedProducts
