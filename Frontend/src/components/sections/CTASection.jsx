import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

const CTASection = () => {
  return (
    <motion.section
      className="py-32 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl lg:text-6xl font-light mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Elevate<br />
          <span className="font-bold">Your Style?</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mb-12 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join thousands who trust HAIGGE for premium fashion
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/signup">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-12 py-4 text-base font-medium rounded-none"
              >
                Get Started Today
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CTASection
