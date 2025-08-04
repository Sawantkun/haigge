import React, { useState, useEffect } from 'react'

const AIVirtualTryOn = ({ productImages }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleTryOn = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 3000)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto px-8 relative z-10">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center bg-black/5 rounded-full px-6 py-3 mb-6">
            <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
            <span className="text-black/70 text-sm font-medium tracking-wide">AI TECHNOLOGY</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
            Virtual Try-On
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the future of fashion with our revolutionary AI technology that brings your wardrobe to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Virtual Try-On Interface */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-black/5 border border-black/5 relative overflow-hidden">
              {/* Tech grid background */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="grid grid-cols-8 gap-4 h-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-black/20"></div>
                  ))}
                </div>
              </div>

              {/* Main virtual try-on area */}
              <div className="relative z-10 aspect-[3/4] bg-stone-50 rounded-xl overflow-hidden border border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&crop=faces&w=400&h=600&q=80"
                  alt="Virtual Try-On Model"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-stone-100 flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-black/40 text-lg font-light">Virtual Model</span>
                </div>

                {/* AI scanning overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/10">
                    <div className="absolute inset-0 border-2 border-black rounded-xl animate-pulse"></div>
                    <div className="absolute top-4 right-4 flex items-center bg-black/80 backdrop-blur-sm rounded-full px-3 py-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-white text-xs font-medium">AI Scanning...</span>
                    </div>
                    {/* Scanning lines */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-full h-0.5 bg-black/30 animate-pulse" style={{
                        animation: 'scan 2s linear infinite',
                        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.5), transparent)'
                      }}></div>
                    </div>
                  </div>
                )}

                {/* Outfit selection dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <button
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === 0 ? 'bg-black' : 'bg-black/30 hover:bg-black/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={handleTryOn}
                  disabled={isScanning}
                  className="flex items-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-black/90 transition-all duration-300 disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Try Now
                    </>
                  )}
                </button>
                <button className="border-2 border-black/20 text-black px-6 py-3 rounded-full font-medium hover:border-black/40 hover:bg-black/5 transition-all duration-300">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h3 className="text-4xl lg:text-5xl font-black text-black mb-8 leading-tight tracking-tight">
              See How Clothes
              <span className="block text-black/60">Look On You</span>
            </h3>

            <p className="text-xl text-black/60 mb-12 leading-relaxed font-light">
              Our advanced AI technology creates photorealistic previews of how any garment
              will look and fit on your unique body shape, revolutionizing your shopping experience.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-12">
              {[
                { icon: "⚡", title: "Instant Results", desc: "Real-time virtual fitting in seconds" },
                { icon: "📏", title: "Perfect Fit", desc: "AI-powered size recommendations" },
                { icon: "🎨", title: "True Colors", desc: "Photorealistic color matching" },
                { icon: "🔄", title: "Multiple Angles", desc: "360° view of your virtual outfit" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center text-lg group-hover:bg-black/10 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">{feature.title}</h4>
                    <p className="text-black/60 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-black text-white px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <span className="relative z-10 flex items-center">
                  Start Virtual Fitting
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="border-2 border-black/20 text-black px-8 py-4 rounded-full font-medium hover:border-black/40 hover:bg-black/5 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  )
}

export default AIVirtualTryOn
