import React from 'react'
import { motion } from 'framer-motion'

const FeaturesSection = () => {
  const features = [
    {
      title: 'Premium Quality',
      description: 'Meticulously crafted garments that define excellence in every thread.'
    },
    {
      title: 'Express Delivery',
      description: 'Swift worldwide shipping with premium packaging and tracking.'
    },
    {
      title: 'Secure Shopping',
      description: 'Military-grade security with 100% satisfaction guarantee.'
    }
  ]

  return (
    <motion.section
      className="py-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-6">
            Why Choose <span className="font-bold">HAIGGE</span>
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Experience luxury fashion shopping with our premium features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-8 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full border border-gray-300 group-hover:border-gray-900 transition-colors duration-300"></div>
                <div className="absolute inset-2 bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300"></div>
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default FeaturesSection
