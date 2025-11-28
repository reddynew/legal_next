import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Expertise from '@/pages/Expertise'
import FAQSection from '@/components/Faq'
import React from 'react'
import BlogListComponent from '@/components/BlogList'
import WhyChooseUs from '@/components/Usp'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <WhyChooseUs/>
      {/* <Services/> */}
      <Expertise/>
      <BlogListComponent/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default page