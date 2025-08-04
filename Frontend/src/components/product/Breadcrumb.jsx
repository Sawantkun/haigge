import React from 'react'
import { motion } from 'framer-motion'

const Breadcrumb = ({ items }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 text-sm text-gray-600 mb-8"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              /
            </motion.span>
          )}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hover:text-black transition-colors ${
              index === items.length - 1 ? 'text-black font-medium' : ''
            }`}
          >
            {item}
          </motion.button>
        </React.Fragment>
      ))}
    </motion.nav>
  )
}

export default Breadcrumb
