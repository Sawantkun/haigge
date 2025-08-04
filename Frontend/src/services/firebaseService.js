import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../firebase'

// User Profile Services
export const userService = {
  // Create user profile after signup
  createUserProfile: async (userId, userData) => {
    try {
      const userRef = doc(db, 'users', userId)
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        return { success: true, data: { id: userSnap.id, ...userSnap.data() } }
      } else {
        return { success: false, message: 'User profile not found' }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Update user profile
  updateUserProfile: async (userId, updates) => {
    try {
      const userRef = doc(db, 'users', userId)
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Listen to user profile changes
  listenToUserProfile: (userId, callback) => {
    const userRef = doc(db, 'users', userId)
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        callback({ success: true, data: { id: doc.id, ...doc.data() } })
      } else {
        callback({ success: false, message: 'User profile not found' })
      }
    })
  }
}

// Cart Services
export const cartService = {
  // Add item to cart
  addToCart: async (userId, item) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      const cartSnap = await getDoc(cartRef)

      if (cartSnap.exists()) {
        const cartData = cartSnap.data()
        const existingItemIndex = cartData.items.findIndex(cartItem => cartItem.id === item.id)

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          cartData.items[existingItemIndex].quantity += item.quantity || 1
        } else {
          // Add new item
          cartData.items.push({
            ...item,
            quantity: item.quantity || 1,
            addedAt: serverTimestamp()
          })
        }

        await updateDoc(cartRef, {
          items: cartData.items,
          updatedAt: serverTimestamp()
        })
      } else {
        // Create new cart
        await setDoc(cartRef, {
          userId,
          items: [{
            ...item,
            quantity: item.quantity || 1,
            addedAt: serverTimestamp()
          }],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      }

      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Get user cart
  getCart: async (userId) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      const cartSnap = await getDoc(cartRef)

      if (cartSnap.exists()) {
        return { success: true, data: cartSnap.data() }
      } else {
        return { success: true, data: { items: [] } }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Update cart item quantity
  updateCartItem: async (userId, itemId, quantity) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      const cartSnap = await getDoc(cartRef)

      if (cartSnap.exists()) {
        const cartData = cartSnap.data()
        const itemIndex = cartData.items.findIndex(item => item.id === itemId)

        if (itemIndex > -1) {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cartData.items.splice(itemIndex, 1)
          } else {
            cartData.items[itemIndex].quantity = quantity
          }

          await updateDoc(cartRef, {
            items: cartData.items,
            updatedAt: serverTimestamp()
          })
        }
      }

      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Remove item from cart
  removeFromCart: async (userId, itemId) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      const cartSnap = await getDoc(cartRef)

      if (cartSnap.exists()) {
        const cartData = cartSnap.data()
        cartData.items = cartData.items.filter(item => item.id !== itemId)

        await updateDoc(cartRef, {
          items: cartData.items,
          updatedAt: serverTimestamp()
        })
      }

      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      const cartRef = doc(db, 'carts', userId)
      await updateDoc(cartRef, {
        items: [],
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Listen to cart changes
  listenToCart: (userId, callback) => {
    const cartRef = doc(db, 'carts', userId)
    return onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        callback({ success: true, data: doc.data() })
      } else {
        callback({ success: true, data: { items: [] } })
      }
    })
  }
}

// Order Services
export const orderService = {
  // Create order
  createOrder: async (userId, orderData) => {
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId,
        ...orderData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      return { success: true, data: { id: orderRef.id } }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Get user orders
  getUserOrders: async (userId) => {
    try {
      const ordersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(ordersQuery)
      const orders = []

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })

      return { success: true, data: orders }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const orderRef = doc(db, 'orders', orderId)
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

// Wishlist Services
export const wishlistService = {
  // Add to wishlist
  addToWishlist: async (userId, item) => {
    try {
      const wishlistRef = doc(db, 'wishlists', userId)
      await updateDoc(wishlistRef, {
        items: arrayUnion({
          ...item,
          addedAt: serverTimestamp()
        }),
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      if (error.code === 'not-found') {
        // Create wishlist if it doesn't exist
        await setDoc(wishlistRef, {
          userId,
          items: [{
            ...item,
            addedAt: serverTimestamp()
          }],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
        return { success: true }
      }
      return { success: false, message: error.message }
    }
  },

  // Remove from wishlist
  removeFromWishlist: async (userId, itemId) => {
    try {
      const wishlistRef = doc(db, 'wishlists', userId)
      const wishlistSnap = await getDoc(wishlistRef)

      if (wishlistSnap.exists()) {
        const wishlistData = wishlistSnap.data()
        wishlistData.items = wishlistData.items.filter(item => item.id !== itemId)

        await updateDoc(wishlistRef, {
          items: wishlistData.items,
          updatedAt: serverTimestamp()
        })
      }

      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Get wishlist
  getWishlist: async (userId) => {
    try {
      const wishlistRef = doc(db, 'wishlists', userId)
      const wishlistSnap = await getDoc(wishlistRef)

      if (wishlistSnap.exists()) {
        return { success: true, data: wishlistSnap.data() }
      } else {
        return { success: true, data: { items: [] } }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
