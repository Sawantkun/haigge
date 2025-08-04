import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/sections/Header'
import Button from '../components/ui/Button'
import AnimatedPage from '../components/ui/AnimatedPage'
import { ProfileSection, ProfileSidebar, ProfileField } from '../components/profile'

const Profile = () => {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.date_of_birth || '',
    gender: user?.gender || '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = async () => {
    try {
      setIsEditing(false) // Hide editing mode immediately for better UX

      // Map form data to the expected API format
      const profileData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
      }

      const result = await updateProfile(profileData)

      if (result.success) {
        // Show success message (you can implement a toast notification here)
        console.log('Profile updated successfully')
      } else {
        // Show error message and re-enable editing
        console.error('Profile update failed:', result.message)
        setIsEditing(true)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setIsEditing(true)
    }
  }

  const handleOrdersClick = () => {
    navigate('/orders')
  }

  const menuItems = [
    {
      id: 'profile',
      label: 'Personal Information',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'orders',
      label: 'My Orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      onClick: handleOrdersClick
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ]

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-[90vw] mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">My Account</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Menu */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                user={user}
                menuItems={menuItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <div className="mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <ProfileSection title="Personal Information">
                  <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <Button
                      variant={isEditing ? 'secondary' : 'primary'}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <ProfileField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your first name"
                    />

                    <ProfileField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your last name"
                    />

                    <ProfileField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                    />

                    <ProfileField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />

                    <ProfileField
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />

                    <ProfileField
                      label="Gender"
                      name="gender"
                      type="select"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Select Gender"
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                      ]}
                    />
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 pt-6 border-t border-gray-100"
                    >
                      <div className="flex space-x-4">
                        <Button onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </ProfileSection>
              )}

              {activeTab === 'addresses' && (
                <ProfileSection title="Saved Addresses">
                  <div className="flex justify-between items-center mb-6">
                    <div></div>
                    <Button>Add New Address</Button>
                  </div>

                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-600 mb-4">Add your addresses for faster checkout</p>
                    <Button variant="secondary">Add Your First Address</Button>
                  </div>
                </ProfileSection>
              )}

              {activeTab === 'security' && (
                <ProfileSection title="Security Settings">

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-black mb-1">Password</h3>
                          <p className="text-gray-600 text-sm">Last updated 3 months ago</p>
                        </div>
                        <Button variant="secondary" size="sm">Change Password</Button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-black mb-1">Two-Factor Authentication</h3>
                          <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="secondary" size="sm">Enable 2FA</Button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-black mb-1">Login Sessions</h3>
                          <p className="text-gray-600 text-sm">Manage your active sessions</p>
                        </div>
                        <Button variant="secondary" size="sm">View Sessions</Button>
                      </div>
                    </div>
                  </div>
                </ProfileSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Profile
