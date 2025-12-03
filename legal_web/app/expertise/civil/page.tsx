import Expertise_Civil from '@/components/Expertise_Civil'
import React from 'react'
export const metadata = {
  title: "Civil Law Services | JP Law Suvidha",
  description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
  alternates: {
    canonical: "https://jplawsuvidha.com/civil/",
  },
  openGraph: {
    title: "Civil Law Services | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    url: "https://jplawsuvidha.com/civil/",
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
    title: "Civil Law Services | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    images: ["https://jplawsuvidha.com/og_logo.jpg"],
    site: "@",
  },
};
function page() {
  return (
    <div>
        <Expertise_Civil/>
    </div>
  )
}

export default page