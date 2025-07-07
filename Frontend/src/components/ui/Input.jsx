import React from 'react'

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
