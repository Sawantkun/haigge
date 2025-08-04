import React from 'react'
import AnimatedPage from '../components/ui/AnimatedPage'
import Header from '../components/sections/Header'
import HeroSection from '../components/sections/HeroSection'
import BrandLogos from '../components/sections/BrandLogos'
import AIVirtualTryOn from '../components/sections/AIVirtualTryOn'
import NewArrivals from '../components/sections/NewArrivals'
import TopSelling from '../components/sections/TopSelling'
import BrowseByStyle from '../components/sections/BrowseByStyle'
import Testimonials from '../components/sections/Testimonials'
import Newsletter from '../components/sections/Newsletter'
import Footer from '../components/sections/Footer'

const Home = () => {
  const [productImages, setProductImages] = React.useState([])

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProductImages(data.map(item => item.image))
      })
      .catch(() => setProductImages([]))
  }, [])

  return (
    <AnimatedPage className="min-h-screen bg-white">
      <Header />
      <HeroSection productImages={productImages} />
      <BrandLogos />
      <AIVirtualTryOn productImages={productImages} />
      <NewArrivals productImages={productImages} />
      <TopSelling productImages={productImages} />
      <BrowseByStyle productImages={productImages} />
      <Testimonials />
      <Newsletter />
      <Footer />
    </AnimatedPage>
  )
}

export default Home
