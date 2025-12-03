import Expertise_Corporate from '@/components/Expertise_Corporate'
import React from 'react'
export const metadata = {
  title: "Corporate Law Services | JP Law Suvidha",
  description:"JP Law Suvidha is a technology-driven legal platform dedicated to empowering legal access through technology.We transform how legal services are accessed and delivered, bridging the gap between clients and legal experts with intelligent tools, secure communication, and a user-centric experience for individuals and businesses.",
  alternates: {
    canonical: "https://jplawsuvidha.com/corporate/",
  },
  openGraph: {
    title: "Corporate Law Services | JP Law Suvidha",
  description:"JP Law Suvidha is a technology-driven legal platform dedicated to empowering legal access through technology.We transform how legal services are accessed and delivered, bridging the gap between clients and legal experts with intelligent tools, secure communication, and a user-centric experience for individuals and businesses.",
    url: "https://jplawsuvidha.com/corporate/",
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
    title: "Corporate Law Services | JP Law Suvidha",
  description:"JP Law Suvidha is a technology-driven legal platform dedicated to empowering legal access through technology.We transform how legal services are accessed and delivered, bridging the gap between clients and legal experts with intelligent tools, secure communication, and a user-centric experience for individuals and businesses.",
    images: ["https://jplawsuvidha.com/og_logo.jpg"],
    site: "@",
  },
};
function page() {
  return (
    <div>
        <Expertise_Corporate/>
    </div>
  )
}

export default page