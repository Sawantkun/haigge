import React from 'react'

const Newsletter = () => {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <div className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-3 rounded-full mb-4 text-white bg-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
