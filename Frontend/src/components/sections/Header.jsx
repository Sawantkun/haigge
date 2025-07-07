import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const Header = () => {
  const { user, logout } = useAuth()

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/10"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="text-xl font-bold text-white tracking-wider"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            HAIGGE
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {user ? (
              <>
                <span className="text-white/80 text-sm">{user.name}</span>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xs px-4 py-2"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={logout}
                  className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-xs px-4 py-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xs px-4 py-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-white !text-black hover:bg-white/90 text-xs px-4 py-2"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
