import Contact_Us from '@/components/Contact_Us'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

function page() {
  return (
    <div>
      <Navbar/>
        <Contact_Us/>
      <Footer/>
    </div>
  )
}

export default page