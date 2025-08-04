import React from 'react'

const BrowseByStyle = ({ productImages }) => {
  return (
    <section className="py-15 rounded-xl bg-[#F2F0F1] mx-auto max-w-[90vw]">
      <div className=" mx-auto px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-black mb-4">BROWSE BY DRESS STYLE</h2>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Casual - Large top left */}
          <div className="col-span-12 md:col-span-5 md:row-span-1 bg-white rounded-lg overflow-hidden group cursor-pointer relative">
            <img
              src={ 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=300&fit=crop'}
              alt="Casual"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-end justify-start p-6" style={{display: 'none'}}>
              <h3 className="text-2xl font-bold text-black">Casual</h3>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-black bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">Casual</h3>
            </div>
          </div>

          {/* Formal - Large top right */}
          <div className="col-span-12 md:col-span-7 md:row-span-1 bg-white rounded-lg overflow-hidden group cursor-pointer relative">
            <img
              src={ 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=300&fit=crop'}
              alt="Formal"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-end justify-start p-6" style={{display: 'none'}}>
              <h3 className="text-2xl font-bold text-black">Formal</h3>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-black bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">Formal</h3>
            </div>
          </div>

          {/* Party - Large bottom left */}
          <div className="col-span-12 md:col-span-7 md:row-span-1 bg-white rounded-lg overflow-hidden group cursor-pointer relative">
            <img
              src={'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?fit=crop&crop=top'}
              alt="Party"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-end justify-start p-6" style={{display: 'none'}}>
              <h3 className="text-2xl font-bold text-black">Party</h3>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-black bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">Party</h3>
            </div>
          </div>

          {/* Gym - Small bottom right */}
          <div className="col-span-12 md:col-span-5 md:row-span-1 bg-white rounded-lg overflow-hidden group cursor-pointer relative">
            <img
              src={'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop'}
              alt="Gym"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-end justify-start p-6" style={{display: 'none'}}>
              <h3 className="text-2xl font-bold text-black">Gym</h3>
            </div>
            <div className="absolute top-6 left-6">
              <h3 className="text-2xl font-bold text-black bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">Gym</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrowseByStyle
