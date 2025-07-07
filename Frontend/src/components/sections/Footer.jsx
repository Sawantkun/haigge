import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      className="bg-white py-16 border-t border-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 tracking-wider">HAIGGE</h3>
            <p className="text-gray-600 font-light mt-2">Curated for the way you live.</p>
          </motion.div>

          <motion.div
            className="flex gap-8 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
            <Link to="/help" className="hover:text-gray-900 transition-colors">Help</Link>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-100 mt-12 pt-8 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          © 2024 HAIGGE. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
