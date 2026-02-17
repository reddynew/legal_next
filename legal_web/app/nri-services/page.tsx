import NriServices from '@/components/NriServices'
import React from 'react'

export const metadata = {
  title: "NRI Services | JP Law Suvidha",
  description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
  alternates: {
    canonical: "https://jplawsuvidha.com/Nriservices/",
  },
  openGraph: {
    title: "NRI Services | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    url: "https://jplawsuvidha.com/Nriservices/",
    siteName: "JP Law Suvidha",
    images: [
      {
        url: "https://jplawsuvidha.com/og_logo.jpg",
        width: 1200,
        height: 630,
        alt: "JP Law Suvidha",
      },
    ],
    type:'website'
  },
  twitter: {
    card: "summary_large_image",
    title: "NRI Services | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    images: ["https://jplawsuvidha.com/og_logo.jpg"],
    site: "@",
  },
};
function page() {
  return (
    <div>
      <NriServices/>
    </div>
  )
}

export default page