import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import searchService from '../../services/searchService'

const Header = () => {
  const [showPromo, setShowPromo] = useState(true)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const searchInputRef = useRef(null)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: '/cart',
          message: 'Please log in to view your cart'
        }
      })
      return
    }
    navigate('/cart')
  }

  const handleSearchClick = () => {
    setIsSearchExpanded(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const handleSearchClose = () => {
    setIsSearchExpanded(false)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      try {
        const suggestions = await searchService.getSearchSuggestions(query)
        setSearchSuggestions(suggestions)
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setShowSuggestions(false)
      }
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Save search query for analytics
      await searchService.saveSearchQuery(searchQuery.trim(), 0)
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      handleSearchClose()
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    // Save search query for analytics
    await searchService.saveSearchQuery(suggestion, 0)
    navigate(`/search?q=${encodeURIComponent(suggestion)}`)
    handleSearchClose()
  }

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b border-gray-200">
      {showPromo && (
        <div className="bg-black text-white text-center py-2 text-sm relative">
          Get up to 20% off on your first order. Sign Up Now
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <nav className="py-4">
        <div className="max-w-[85vw] mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-black">HAIGGE</div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="text-black hover:text-gray-600">Shop</a>
            <a href="#" className="text-black hover:text-gray-600">On Sale</a>
            <a href="#" className="text-black hover:text-gray-600">New Arrivals</a>
            <a href="#" className="text-black hover:text-gray-600">Brands</a>
          </div>
          <div className="flex items-center space-x-4">
              {/* User Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.first_name ? user.first_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm text-black font-medium">
                    {user.first_name || user.email?.split('@')[0]}
                  </span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          My Orders
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm text-black hover:text-gray-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-black text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {/* Search Section */}
            <div className="relative h-10 flex items-center">
              <AnimatePresence>
                {!isSearchExpanded ? (
                  <motion.button
                    key="search-icon"
                    onClick={handleSearchClick}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors h-10 w-10 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.div
                    key="search-input"
                    className="relative h-10"
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    ref={searchInputRef}
                  >
                    <form onSubmit={handleSearchSubmit} className="relative h-full">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for clothes, brands, styles..."
                        className="w-full h-10 pl-10 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white"
                        style={{ fontSize: '14px' }}
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <button
                        type="button"
                        onClick={handleSearchClose}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-6 w-6 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </form>

                    {/* Search Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && searchSuggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                        >
                          {searchSuggestions.map((suggestion, index) => (
                            <motion.button
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <span className="text-gray-700">{suggestion}</span>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleCartClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors h-10 w-10 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>


          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
