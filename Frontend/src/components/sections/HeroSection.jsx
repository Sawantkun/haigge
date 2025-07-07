import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { MdKeyboardArrowDown } from "react-icons/md";

const HeroSection = () => {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <motion.section
      className="relative min-h-screen flex items-center pt-16" // Add pt-16 for header space
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full ">
        <div className="max-w-2xl ">
          {/* Main Heading */}
          <motion.h1
            className="text-6xl lg:text-8xl font-light text-white mb-8 leading-none tracking-tight"
            variants={itemVariants}
          >
            FIND CLOTHES<br />
            <span className="font-normal">THAT MATCHES</span><br />
            <span className="font-bold">YOUR STYLE</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-white/80 mb-12 leading-relaxed max-w-lg font-light"
            variants={itemVariants}
          >
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
          >
            <Link to="/signup">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="border !border-white !bg-transparent !rounded-lg transition hover:!text-black  hover:!bg-gray-100 px-12 py-4 text-base font-medium rounded-none"
                >
                  Shop Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-16"
            variants={itemVariants}
          >
            {[
              { number: '200+', label: 'Brands' },
              { number: '2,000+', label: 'Products' },
              { number: '30,000+', label: 'Customers' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="text-2xl font-bold mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs text-white/60 uppercase tracking-widest font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side Accent */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="text-right text-white">
          <motion.div
            className="text-xs uppercase tracking-[0.3em] mb-2 opacity-60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Luxury
          </motion.div>
          <div className="w-px h-20 bg-white/30 ml-auto"></div>
          <motion.div
            className="text-xs uppercase tracking-[0.3em] mt-2 opacity-60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            Fashion
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={handleScrollDown}
      >




          {/* Arrow */}
          <motion.div
            className="text-white/60 text-lg mt-1 text-[3rem] group-hover:text-white/80 transition-colors border p-4 rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdKeyboardArrowDown />
          </motion.div>
        </motion.div>
    </motion.section>
  )
}

export default HeroSection
