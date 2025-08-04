import React from 'react'

const TopSelling = ({ productImages }) => {
  const products = [
    { name: "Classic White T-Shirt", price: "$212", originalPrice: "$232", rating: 5.0, image: productImages[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop' },
    { name: "Denim Jacket", price: "$145", rating: 4.0, image: productImages[1] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop' },
    { name: "Cotton Chinos", price: "$80", rating: 3.0, image: productImages[2] || 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop' },
    { name: "Casual Sneakers", price: "$210", rating: 4.5, image: productImages[3] || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop' }
  ]
 return (
    <section className="pb-20 relative overflow-hidden">
      {/* Subtle background pattern */}
    {/* Header */}
        <div className="text-center ">
          <div className="inline-flex items-center gap-2 bg-[#ECEDED] px-4 py-2 rounded-full text-black font-medium text-sm mb-4">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            AI TECHNOLOGY
          </div>
          <h2 className="text-5xl font-black text-black mb-4">TOP SELLING</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of fashion with our revolutionary AI technology that brings your wardrobe to life
          </p>
        </div>

      <div className="max-w-[90vw] mx-auto px-6 relative z-10">
        <div className="text-center mt-10 mb-16">
          <div className="w-20 h-1 bg-[#ECEDED] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-[#F2F0F1] aspect-[3/4] rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center  hover:border-[#d4a574] transition-colors duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-[#2a2a4a] flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-black/40">{item.name}</span>
                </div>
              </div>

              <h3 className="font-medium text-black mb-2 group-hover:text-[#d4a574] transition-colors">{item.name}</h3>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex text-[#000]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-600'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-black/60">{item.rating}/5</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-bold text-[#000] text-lg">{item.price}</span>
                {item.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">{item.originalPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
        {/* CTA Section */}
        <div className="text-center pt-10">

          <button className="border-2 border-gray-300 text-gray-700 px-16 py-3 rounded-full font-medium hover:bg-gray-50 hover:border-gray transition-all duration-300">
            View All Products
          </button>
        </div>
    </section>
  )
}
export default TopSelling
