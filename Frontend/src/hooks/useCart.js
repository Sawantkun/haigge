import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { cartService } from '../services/firebaseService'

export const useCart = () => {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      // Listen to cart changes in real-time
      const unsubscribe = cartService.listenToCart(user.uid, (result) => {
        if (result.success) {
          setCart(result.data)
        }
      })
      return () => unsubscribe()
    } else {
      setCart({ items: [] })
    }
  }, [user])

  const addToCart = async (item) => {
    if (!user) return { success: false, message: 'Please login to add items to cart' }

    setLoading(true)
    const result = await cartService.addToCart(user.uid, item)
    setLoading(false)
    return result
  }

  const updateCartItem = async (itemId, quantity) => {
    if (!user) return { success: false, message: 'Please login to update cart' }

    setLoading(true)
    const result = await cartService.updateCartItem(user.uid, itemId, quantity)
    setLoading(false)
    return result
  }

  const removeFromCart = async (itemId) => {
    if (!user) return { success: false, message: 'Please login to remove items from cart' }

    setLoading(true)
    const result = await cartService.removeFromCart(user.uid, itemId)
    setLoading(false)
    return result
  }

  const clearCart = async () => {
    if (!user) return { success: false, message: 'Please login to clear cart' }

    setLoading(true)
    const result = await cartService.clearCart(user.uid)
    setLoading(false)
    return result
  }

  const getCartTotal = () => {
    return cart.items?.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0) || 0
  }

  const getCartItemsCount = () => {
    return cart.items?.reduce((total, item) => total + item.quantity, 0) || 0
  }

  return {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }
}
