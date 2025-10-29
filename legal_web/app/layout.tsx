import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/context/LoginContext";
import { PlanProvider } from "@/context/PlansContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Law Suvidha",
  description: "JP Law Suvidha is professional legal service techonology platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <PlanProvider>
        <AuthProvider>

        {children}

        </AuthProvider>
          </PlanProvider>

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
