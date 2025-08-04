import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../components/sections/Header'
import Button from '../components/ui/Button'
import AnimatedPage from '../components/ui/AnimatedPage'
import { OrderStatusBadge } from '../components/profile'

const MyOrders = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-2025-001',
      date: '2025-07-15',
      status: 'delivered',
      total: 437,
      items: [
        {
          id: 1,
          name: 'Classic White T-Shirt',
          price: 212,
          quantity: 1,
          size: 'M',
          color: 'White',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop'
        },
        {
          id: 2,
          name: 'Denim Jacket',
          price: 145,
          quantity: 1,
          size: 'L',
          color: 'Blue',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop'
        }
      ],
      shipping: {
        method: 'Standard Delivery',
        cost: 15,
        estimatedDelivery: '2025-07-18'
      }
    },
    {
      id: 'ORD-2025-002',
      date: '2025-07-12',
      status: 'shipped',
      total: 295,
      items: [
        {
          id: 3,
          name: 'Cotton Chinos',
          price: 80,
          quantity: 2,
          size: '32',
          color: 'Khaki',
          image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop'
        },
        {
          id: 4,
          name: 'Wool Sweater',
          price: 180,
          quantity: 1,
          size: 'L',
          color: 'Navy',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop'
        }
      ],
      shipping: {
        method: 'Express Delivery',
        cost: 25,
        estimatedDelivery: '2025-07-14'
      },
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD-2025-003',
      date: '2025-07-10',
      status: 'processing',
      total: 160,
      items: [
        {
          id: 5,
          name: 'Casual Sneakers',
          price: 210,
          quantity: 1,
          size: '10',
          color: 'White',
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop'
        }
      ],
      shipping: {
        method: 'Standard Delivery',
        cost: 15,
        estimatedDelivery: '2025-07-16'
      }
    },
    {
      id: 'ORD-2025-004',
      date: '2025-07-05',
      status: 'cancelled',
      total: 89,
      items: [
        {
          id: 6,
          name: 'Leather Belt',
          price: 65,
          quantity: 1,
          size: '34',
          color: 'Brown',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop'
        }
      ],
      shipping: {
        method: 'Standard Delivery',
        cost: 15,
        estimatedDelivery: '2025-07-10'
      }
    }
  ])

  const filterOptions = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(order => order.status === activeFilter)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-[90vw] mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center text-gray-600 hover:text-black mb-4 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Profile
              </button>
              <h1 className="text-3xl font-bold text-black">My Orders</h1>
              <p className="text-gray-600 mt-2">Track and manage your orders</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeFilter === option.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
            >
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You haven't placed any {activeFilter !== 'all' ? activeFilter : ''} orders yet.</p>
              <Button onClick={() => navigate('/')}>Start Shopping</Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-black text-lg">{order.id}</h3>
                          <p className="text-gray-600 text-sm">Placed on {formatDate(order.date)}</p>
                        </div>

                        <OrderStatusBadge status={order.status} />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-bold text-black text-lg">${order.total}</p>
                        </div>

                        <div className="flex gap-2">
                          {order.status === 'shipped' && order.tracking && (
                            <Button variant="secondary" size="sm">
                              Track Order
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="grid gap-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-medium text-black">{item.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-medium text-black">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Info */}
                    {order.status !== 'cancelled' && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-black">{order.shipping.method}</p>
                            <p className="text-sm text-gray-600">
                              {order.status === 'delivered'
                                ? `Delivered on ${formatDate(order.shipping.estimatedDelivery)}`
                                : `Estimated delivery: ${formatDate(order.shipping.estimatedDelivery)}`
                              }
                            </p>
                            {order.tracking && (
                              <p className="text-sm text-blue-600 mt-1">Tracking: {order.tracking}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-black">${order.shipping.cost}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  )
}

export default MyOrders
