import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: 20
  }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

const AnimatedPage = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
