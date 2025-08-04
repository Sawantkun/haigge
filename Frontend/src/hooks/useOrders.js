import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { orderService } from '../services/firebaseService'

export const useOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadOrders()
    } else {
      setOrders([])
    }
  }, [user])

  const loadOrders = async () => {
    if (!user) return

    setLoading(true)
    const result = await orderService.getUserOrders(user.uid)
    if (result.success) {
      setOrders(result.data)
    }
    setLoading(false)
  }

  const createOrder = async (orderData) => {
    if (!user) return { success: false, message: 'Please login to create an order' }

    setLoading(true)
    const result = await orderService.createOrder(user.uid, orderData)
    if (result.success) {
      await loadOrders() // Refresh orders
    }
    setLoading(false)
    return result
  }

  return {
    orders,
    loading,
    createOrder,
    loadOrders
  }
}
