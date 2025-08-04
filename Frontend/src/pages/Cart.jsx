import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  CartItem,
  OrderSummary,
  PromoCode,
  RecommendedProducts,
  EmptyCart,
  CartHeader
} from '../components/cart'
import Header from '../components/sections/Header'

// Main Cart Page Component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 212,
      quantity: 1,
      size: "M",
      color: "White",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 145,
      quantity: 2,
      size: "L",
      color: "Blue",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Cotton Chinos",
      price: 80,
      quantity: 1,
      size: "32",
      color: "Khaki",
      rating: 3.0,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Cotton Chinos",
      price: 80,
      quantity: 1,
      size: "32",
      color: "Khaki",
      rating: 3.0,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Cotton Chinos",
      price: 80,
      quantity: 1,
      size: "32",
      color: "Khaki",
      rating: 3.0,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop"
    }
  ])

  const recommendedProducts = [
    { name: "Casual Sneakers", price: 210, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop" },
    { name: "Leather Belt", price: 65, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop" },
    { name: "Wool Sweater", price: 180, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop" },
    { name: "Smart Watch", price: 299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop" }
  ]

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    alert('Proceeding to checkout...')
  }

  const handleApplyPromo = (code) => {
    alert(`Promo code "${code}" applied!`)
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
        <Header/>
      <div className="max-w-[90vw] mx-auto px-6 py-12">
        <CartHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            <PromoCode onApplyPromo={handleApplyPromo} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} onCheckout={handleCheckout} />
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts products={recommendedProducts} />
      </div>
    </div>
  )
}

export default CartPage
