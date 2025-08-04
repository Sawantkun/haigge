import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: "James K.",
      title: "Founder",
      rating: 5,
      review: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sarah M.",
      title: "Designer",
      rating: 5,
      review: "The AI try-on feature is incredible! I can see exactly how clothes will look before buying. Game changer!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Alex W.",
      title: "Customer",
      rating: 5,
      review: "Amazing quality and the virtual fitting saved me so much time. Highly recommend Haigge!",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[90vw] mx-auto ">
        <h2 className="text-4xl font-bold text-center text-black mb-16">This Is What Our Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div>
                  <h4 className="font-bold text-black">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
