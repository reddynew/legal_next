import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/context/LoginContext";
import { PlanProvider } from "@/context/PlansContext";
import NotificationBanner from '@/components/NotificationBanner'
import LayoutVisibilityWrapper from "@/components/IconsWrapper";
import  I18nextProvider from "@/context/LanguageContext";
import '../i18n';
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/Cookies";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Law Suvidha | Justice for People Driven by Technology",
  description:
    "JP Law Suvidha is a secure, technology-driven platform connecting clients with expert legal professionals. We leverage advanced digital tools and deep legal insight to deliver efficient, transparent, and accessible legal services for individuals and businesses—covering family, corporate, criminal, civil, and business law.",
  keywords: [
    "JP Law Suvidha",
    "legal services",
    "tech-enabled legal platform",
    "Hyderabad",
    "family law",
    "corporate law",
    "criminal law",
    "civil law",
    "business law",
    "legal consultation",
    "digital law platform",
    "lawyer matching"
  ],
  authors: [{ name: "JP Law Suvidha Team", url: "https://jplawsuvidha.com" }],
  openGraph: {
    title: "JP Law Suvidha | Justice for People Driven by Technology",
    description:
      "Empowering legal access through cutting-edge technology. Find the right legal expert and access professional legal services confidentially, efficiently, and affordably.",
    url: "https://jplawsuvidha.com",
    siteName: "JP Law Suvidha",
    images: [
      {
        url: "https://jplawsuvidha.com/og_logo.jpg", // Update with your site logo or preview image
        alt: "JP Law Suvidha Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // Adjust as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/hero.avif" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {/* <CookieConsent/> */}
          <LayoutVisibilityWrapper>
  <I18nextProvider>
         
          <PlanProvider>
        <AuthProvider>
          <ScrollToTop/>
          <NotificationBanner/>


        {children}
        

        </AuthProvider>
          </PlanProvider>
          </I18nextProvider>
           </LayoutVisibilityWrapper>

        {/* Tawk.to widget */}
        <Script
          id="tawkto"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68938ad4a4fc79192a7bbeda/1j205ckk0';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
              setTimeout(function () {
                if (Tawk_API && Tawk_API.maximize) {
                  Tawk_API.maximize();
                }
              }, 10000);
            `,
          }}
        />
        
        
      
      </body>
    </html>
  );
}
