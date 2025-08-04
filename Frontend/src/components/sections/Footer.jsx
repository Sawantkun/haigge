import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#F2F0F1] py-12">
      <div className="max-w-[90vw] mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black text-black mb-4">HAIGGE</h3>
            <p className="text-black/60 mb-6 text-sm">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <div className="w-7 h-7 bg-white border border-black/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-7 h-7 bg-black rounded-full"></div>
              <div className="w-7 h-7 bg-white border border-black/20 rounded-full"></div>
              <div className="w-7 h-7 bg-white border border-black/20 rounded-full"></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">COMPANY</h4>
            <ul className="space-y-2 text-black/70">
              <li><a href="#" className="hover:text-black">About</a></li>
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Works</a></li>
              <li><a href="#" className="hover:text-black">Career</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">HELP</h4>
            <ul className="space-y-2 text-black/70">
              <li><a href="#" className="hover:text-black">Customer Support</a></li>
              <li><a href="#" className="hover:text-black">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">RESOURCES</h4>
            <ul className="space-y-2 text-black/70">
              <li><a href="#" className="hover:text-black">Free eBooks</a></li>
              <li><a href="#" className="hover:text-black">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-black">How to - Blog</a></li>
              <li><a href="#" className="hover:text-black">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/20 mt-8 pt-8 flex justify-between items-center">
          <p className="text-black/60 text-sm">HAIGGE © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-4">
            <img src="/path-to-visa.png" alt="Visa" className="h-6" />
            <img src="/path-to-mastercard.png" alt="Mastercard" className="h-6" />
            <img src="/path-to-paypal.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
