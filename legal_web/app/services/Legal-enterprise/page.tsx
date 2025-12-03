import EnterpriseLegalSection from '@/components/LegalEnterprise'
import React from 'react'
export const metadata = {
  title: "Enterprise Legal | JP Law Suvidha",
  description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
  alternates: {
    canonical: "https://jplawsuvidha.com/legal-enterprise/",
  },
  openGraph: {
    title: "Enterprise Legal| JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    url: "https://jplawsuvidha.com/legal-enterprise/",
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
    title: "Enterprise Legal | JP Law Suvidha",
    description:"Comprehensive legal services for Non-Resident Indians including property disputes, family law, inheritance, documentation, and business law across India.",
    images: ["https://jplawsuvidha.com/og_logo.jpg"],
    site: "@",
  },
};
function page() {
  return (
    <div>
      <EnterpriseLegalSection/>
    </div>
  )
}

export default page