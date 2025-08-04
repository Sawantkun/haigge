import React, { useState, useEffect } from 'react'

const HeroSection = ({ productImages = [] }) => {
  const [isVisible, setIsVisible] = useState(false)

  const heroImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?fit=crop&crop=center&w=800&h=1000&q=80"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-[90vw] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[85vh]">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="inline-flex items-center bg-black/5 rounded-full px-6 py-3 mb-10 border border-black/10">
              <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
              <span className="text-black/70 text-sm font-medium tracking-wide">EXCLUSIVE COLLECTION</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-black mb-8 leading-[0.85] tracking-tight">
              <span className="block">FIND CLOTHES</span>
              <span className="block">THAT MATCHES</span>
              <span className="block text-black/60">YOUR STYLE</span>
            </h1>

            <p className="text-xl text-black/60 mb-12 leading-relaxed max-w-lg font-light">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your refined sense of style.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <button className="group relative bg-black text-white px-12 py-4 text-lg font-medium transition-all duration-300 hover:bg-black/90 hover:scale-[1.02] hover:shadow-xl overflow-hidden">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="group border-2 border-black/20 text-black px-12 py-4 text-lg font-medium hover:border-black/40 hover:bg-black/5 transition-all duration-300">
                <span className="flex items-center">
                  View Catalog
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </button>
            </div>

            {/* Elegant Stats */}
            <div className="grid grid-cols-3 gap-12 pt-4 border-t border-black/10">
              {[
                { number: '200+', label: 'International Brands' },
                { number: '2,000+', label: 'High-Quality Products' },
                { number: '30,000+', label: 'Happy Customers' }
              ].map((stat, index) => (
                <div key={index} className={`transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="text-3xl font-black text-black mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <p className="text-black/50 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Elegant Image Section */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative h-[650px] w-full">
              {/* Main image container */}
              <div className="absolute inset-0 bg-white rounded-lg overflow-hidden shadow-2xl shadow-black/10 border border-black/5">
                <img
                  src={heroImage}
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-stone-100 flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-black/40 text-2xl font-light">Fashion Collection</span>
                </div>
              </div>

              {/* Elegant floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-stone-200 border-4 border-white rounded-full shadow-lg"></div>

            </div>

            {/* Elegant floating info card */}
            <div className="absolute top-12 -left-12 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-black/10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-black font-semibold text-sm">Premium Quality</p>
                  <p className="text-black/60 text-xs tracking-wide">Verified & Authentic</p>
                </div>
              </div>
            </div>

            {/* Subtle accent elements */}
            <div className="absolute top-1/2 -right-8 w-1 h-24 bg-black/20 rounded-full"></div>
            <div className="absolute bottom-1/4 -left-8 w-1 h-16 bg-black/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Minimalist bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
    </section>
  )
}

export default HeroSection
