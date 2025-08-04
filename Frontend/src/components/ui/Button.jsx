import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'cursor-pointer font-medium rounded-lg transition-all duration-200 flex items-center justify-center'

  const variants = {
    primary: 'hover:scale-[1.03] bg-black text-white hover:bg-gray-800 disabled:bg-gray-400',
    secondary: 'hover:scale-[1.03] bg-white text-black border border-black hover:bg-gray-50',
    outline: 'hover:scale-[1.03] border border-gray-300 text-gray-700 hover:bg-gray-50'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
      ) : null}
      {children}
    </button>
  )
}

export default Button
