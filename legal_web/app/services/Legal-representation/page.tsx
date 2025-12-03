import LegalRepresentationPage from '@/components/LegalRepresentation'
import React from 'react'
export const metadata = {
  title: "Legal Representation | JP Law Suvidha",
  description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
  alternates: {
    canonical: "https://jplawsuvidha.com/legal-representation/",
  },
  openGraph: {
    title: "Legal Representation | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    url: "https://jplawsuvidha.com/legal-representation/",
    siteName: "JP Law Suvidha",
    images: [
      {
        url: "https://next.app.jplawsuvidha.com/og_logo.jpg",
        width: 1200,
        height: 630,
        alt: "JP Law Suvidha",
      },
    ],
    type:'website'
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Representation | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    images: ["https://nex.app.jplawsuvidha.com/og_logo.jpg"],
    site: "@",
  },
};
function page() {
  return (
    <div>
      <LegalRepresentationPage/>
    </div>
  )
}

export default page