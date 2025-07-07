import React from 'react'
import AnimatedPage from '../components/ui/AnimatedPage'
import Header from '../components/sections/Header'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import CTASection from '../components/sections/CTASection'
import Footer from '../components/sections/Footer'

const Home = () => {
  return (
    <AnimatedPage className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </AnimatedPage>
  )
}

export default Home
