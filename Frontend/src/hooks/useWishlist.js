import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { wishlistService } from '../services/firebaseService'

export const useWishlist = () => {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState({ items: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadWishlist()
    } else {
      setWishlist({ items: [] })
    }
  }, [user])

  const loadWishlist = async () => {
    if (!user) return

    setLoading(true)
    const result = await wishlistService.getWishlist(user.uid)
    if (result.success) {
      setWishlist(result.data)
    }
    setLoading(false)
  }

  const addToWishlist = async (item) => {
    if (!user) return { success: false, message: 'Please login to add items to wishlist' }

    setLoading(true)
    const result = await wishlistService.addToWishlist(user.uid, item)
    if (result.success) {
      await loadWishlist() // Refresh wishlist
    }
    setLoading(false)
    return result
  }

  const removeFromWishlist = async (itemId) => {
    if (!user) return { success: false, message: 'Please login to remove items from wishlist' }

    setLoading(true)
    const result = await wishlistService.removeFromWishlist(user.uid, itemId)
    if (result.success) {
      await loadWishlist() // Refresh wishlist
    }
    setLoading(false)
    return result
  }

  const isInWishlist = (itemId) => {
    return wishlist.items?.some(item => item.id === itemId) || false
  }

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
}
