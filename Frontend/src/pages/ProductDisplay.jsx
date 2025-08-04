import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ProductGallery,
  ProductInfo,
  ProductReviews,
  RelatedProducts,
  Breadcrumb
} from '../components/product'

// Main Product Display Page
const ProductDisplayPage = () => {
  const product = {
    name: "Classic White T-Shirt",
    category: "ESSENTIAL BASICS",
    price: 212,
    originalPrice: 232,
    rating: 4.5,
    reviews: 127,
    description: "Crafted from premium 100% organic cotton, this classic white t-shirt represents the perfect balance of comfort and style. With its timeless design and superior quality construction, it's destined to become a wardrobe staple that you'll reach for again and again.",
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1E40AF" },
      { name: "Gray", value: "#6B7280" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "100% Premium Organic Cotton",
      "Pre-shrunk for consistent fit",
      "Reinforced seams for durability",
      "Machine washable",
      "Ethically manufactured"
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&sat=-100"
    ]
  }

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely love this t-shirt! The quality is exceptional and it fits perfectly. The fabric feels so soft and comfortable."
    },
    {
      name: "Mike Chen",
      rating: 4,
      date: "1 week ago",
      comment: "Great quality shirt, exactly as described. The white color is crisp and clean. Highly recommend!"
    },
    {
      name: "Emma Davis",
      rating: 5,
      date: "2 weeks ago",
      comment: "This has become my go-to basic tee. The fit is flattering and it holds up well after multiple washes."
    },
    {
      name: "David Wilson",
      rating: 4,
      date: "3 weeks ago",
      comment: "Solid construction and comfortable fit. The organic cotton feels premium. Worth the investment."
    }
  ]

  const relatedProducts = [
    {
      name: "Denim Jacket",
      price: 145,
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop"
    },
    {
      name: "Cotton Chinos",
      price: 80,
      rating: 3.5,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop"
    },
    {
      name: "Casual Sneakers",
      price: 210,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop"
    },
    {
      name: "Leather Belt",
      price: 65,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop"
    }
  ]

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData)
    alert(`Added ${productData.name} to cart!\nSize: ${productData.selectedSize}\nColor: ${productData.selectedColor}\nQuantity: ${productData.quantity}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        {/* Breadcrumb */}
        <Breadcrumb items={["Home", "Men", "T-Shirts", "Classic White T-Shirt"]} />

        {/* Product Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
            {/* Virtual Try-On Button */}
           
          </div>
        </motion.div>

        {/* Product Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <ProductReviews reviews={reviews} />
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <RelatedProducts products={relatedProducts} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProductDisplayPage
