import React from 'react'
import { motion } from 'framer-motion'

const RecommendedProducts = ({ products }) => {
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
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-[#ECEDED] px-4 py-2 rounded-full text-black font-medium text-sm mb-4">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          RECOMMENDED FOR YOU
        </div>
        <h2 className="text-2xl font-bold text-black">You Might Also Like</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
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
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <motion.h3
              whileHover={{ color: "#d4a574" }}
              className="font-medium text-black mb-2 group-hover:text-[#d4a574] transition-colors"
            >
              {product.name}
            </motion.h3>
            <div className="font-bold text-black">${product.price}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default RecommendedProducts
