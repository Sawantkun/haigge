import React from 'react';

const NewArrivals = ({ productImages }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[90vw] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#ECEDED] px-4 py-2 rounded-full text-black font-medium text-sm mb-4">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            AI TECHNOLOGY
          </div>
          <h2 className="text-5xl font-black text-black mb-4">NEW ARRIVALS</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of fashion with our revolutionary AI technology that brings your wardrobe to life
          </p>
        </div>

        {/* Featured Collections - Top 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* New Arrivals Card */}
          <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] bg-black/70 shadow-2xl">
            <div className="absolute inset-0"></div>
            <img
              src={productImages?.[0] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"}
              alt="New Arrivals"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-3xl font-bold mb-2">New Arrivals</h3>
                <p className="text-white/80 text-sm mb-4">See how clothes look on you instantly</p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black-50 transition-all duration-300 shadow-lg">
                  TRY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Best-Sellers Card */}
          <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] bg-black/70 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray/20 to-black-600/20"></div>
            <img
              src={productImages?.[1] || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"}
              alt="Best-Sellers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-3xl font-bold mb-2">Best-Sellers</h3>
                <p className="text-white/80 text-sm mb-4">Perfect fit with AI precision</p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black-50 transition-all duration-300 shadow-lg">
                  SHOP FAVORITES
                </button>
              </div>
            </div>
          </div>

          {/* Virtual Styling Card */}
          <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/5] bg-black/70 shadow-2xl">
            <div className="absolute inset-0 "></div>
            <img
              src={productImages?.[2] || "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"}
              alt="Virtual Styling"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
            />
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-3xl font-bold mb-2">Virtual Styling</h3>
                <p className="text-white/80 text-sm mb-4">AI-powered outfit recommendations</p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black-50 transition-all duration-300 shadow-lg">
                  GET STYLED
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* CTA Section */}
        <div className="text-center">

          <button className="border-2 border-gray-300 text-gray-700 px-16 py-3 rounded-full font-medium hover:bg-gray-50 hover:border-gray transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
