import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Expertise from '@/pages/Expertise'
import FAQSection from '@/components/Faq'
import Services from '@/pages/Services'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Services/>
      <Expertise/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default page