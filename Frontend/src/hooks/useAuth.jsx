import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { userService } from '../services/firebaseService'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Fetch user profile from Firestore
        const profileResult = await userService.getUserProfile(firebaseUser.uid)
        if (profileResult.success) {
          setUserProfile(profileResult.data)
        }
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signup = async ({ firstName, lastName, email, mobile, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Update Firebase Auth profile
      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`
      })

      // Create user profile in Firestore
      const profileData = {
        firstName,
        lastName,
        email,
        mobile,
        displayName: `${firstName} ${lastName}`,
        emailVerified: false,
        mobileVerified: false
      }

      await userService.createUserProfile(firebaseUser.uid, profileData)

      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setUserProfile(null)
    return { success: true }
  }

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const updateUserProfile = async (updates) => {
    if (!user) return { success: false, message: 'No user logged in' }

    try {
      // Update Firebase Auth profile if displayName is being updated
      if (updates.firstName || updates.lastName) {
        const displayName = `${updates.firstName || userProfile?.firstName} ${updates.lastName || userProfile?.lastName}`
        await updateProfile(user, { displayName })
      }

      // Update Firestore profile
      const result = await userService.updateUserProfile(user.uid, updates)

      if (result.success) {
        // Refresh user profile
        const profileResult = await userService.getUserProfile(user.uid)
        if (profileResult.success) {
          setUserProfile(profileResult.data)
        }
      }

      return result
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signup,
    login,
    logout,
    forgotPassword,
    updateUserProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
