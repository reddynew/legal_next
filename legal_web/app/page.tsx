import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Expertise from '@/pages/Expertise'
import FAQSection from '@/components/Faq'
import React from 'react'
import BlogListComponent from '@/components/BlogList'
import WhyChooseUs from '@/components/Usp'
import Testimonials from '@/components/Testimonials'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <WhyChooseUs/>
      {/* <Services/> */}
      <Expertise/>
      <BlogListComponent/>
      <Testimonials/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default page