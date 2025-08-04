import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import OTPVerification from './pages/auth/OTPVerification'
import Home from './pages/Home'
import APITestPage from './pages/APITestPage'
import SearchResults from './pages/SearchResults'
import ProtectedRoute from './hooks/ProtectedRoute'
import CartPage from './pages/Cart'
import ProductDisplayPage from './pages/ProductDisplay'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product" element={<ProductDisplayPage />} />
            <Route path="/product/:id" element={<ProductDisplayPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />
            <Route path="/api-test" element={<APITestPage />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Routes>

                  <Route path="/" element={<Home />} />
                    </Routes>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
