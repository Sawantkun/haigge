import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import apiClient from '../services/api'

const APITestPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [testResults, setTestResults] = useState({})
  const [loading, setLoading] = useState(false)

  const testHealthEndpoint = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/health')
      setTestResults(prev => ({
        ...prev,
        health: { success: true, data: response }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        health: { success: false, error: error.message }
      }))
    }
    setLoading(false)
  }

  const testProfileEndpoint = async () => {
    if (!isAuthenticated) {
      setTestResults(prev => ({
        ...prev,
        profile: { success: false, error: 'Not authenticated' }
      }))
      return
    }

    setLoading(true)
    try {
      const response = await apiClient.get('/users/profile')
      setTestResults(prev => ({
        ...prev,
        profile: { success: true, data: response }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        profile: { success: false, error: error.message }
      }))
    }
    setLoading(false)
  }

  const renderTestResult = (testName, result) => {
    if (!result) return null

    return (
      <div className="mb-4 p-4 border rounded">
        <h3 className="font-bold text-lg mb-2">{testName}</h3>
        <div className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <strong>Status:</strong> {result.success ? 'Success' : 'Failed'}
        </div>
        {result.success && result.data && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <strong>Response:</strong>
            <pre className="text-sm mt-1 overflow-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
        {!result.success && result.error && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <strong>Error:</strong> {result.error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">API Integration Test</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-semibold mb-2">Current State</h2>
        <p><strong>Authentication Status:</strong> {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
        {user && (
          <div className="mt-2">
            <strong>User:</strong> {user.email} ({user.first_name} {user.last_name})
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={testHealthEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Health Endpoint
        </button>

        <button
          onClick={testProfileEndpoint}
          disabled={loading || !isAuthenticated}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          Test Profile Endpoint
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Test Results</h2>
        {renderTestResult('Health Check', testResults.health)}
        {renderTestResult('User Profile', testResults.profile)}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default APITestPage
