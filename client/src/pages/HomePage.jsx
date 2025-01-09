import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import Features from '@/components/Home/Features'
import Testimonials from '@/components/Home/Testimonials'
import FaQ from '@/components/Home/FaQ'
import CallToAction from '@/components/Home/CallToAction'
import Pricing from '@/components/Home/Pricing'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <Pricing />
      <Testimonials />
      <FaQ />
      <CallToAction />
    </>
  )
}

export default HomePage