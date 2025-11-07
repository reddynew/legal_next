"use client"
import { Card } from '@/components/ui/card';
import { ArrowLeft, Scale } from 'lucide-react';
import VideoPlayer from '@/components/Videoplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export const dynamic = 'force-dynamic';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white ">
      <Navbar/>
      <section id="about" className="py-24 bg-surface-light relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--surface-medium))_25%,hsl(var(--surface-medium))_50%,transparent_50%,transparent_75%,hsl(var(--surface-medium))_75%)] bg-[length:20px_20px] opacity-30"></div>

        <div className="relative max-w-4xl mx-auto px-6 ">
          {/* Header Section */}
          <div className="text-center mb-10 animate-fade-in -mt-16">
            <h2 className="text-5xl font-bold mb-2 text-primary tracking-tight">
              About Us
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-7"></div>
            <p className="text-2xl font-medium text-black max-w-3xl mx-auto leading-relaxed">
              Empowering Legal Access Through Technology
            </p>
          </div>
          <div className="relative flex justify-center items-center ">
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-10">
            {/* Left Column - Description */}
            <div className="space-y-6 animate-slide-in-left">
              <Card className="p-8 shadow-[var(--shadow-soft)] border-0 bg-background hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                <p className="text-lg text-text-primary leading-relaxed">
                  We are a technology-driven legal platform dedicated to transforming how legal services are accessed and delivered to individuals and businesses.
                </p>
              </Card>

              <Card className="p-8 shadow-[var(--shadow-soft)] border-0 bg-background hover:shadow-[var(--shadow-medium)] transition-all duration-300">
                <p className="text-lg text-text-primary leading-relaxed">
                  By seamlessly connecting clients with qualified legal professionals, we strive to make legal assistance more accessible, efficient, transparent, and confidential.
                </p>
              </Card>
            </div>

            {/* Right Column - Mission */}
            <div className="animate-scale-in">
              <Card className="p-7 h-full shadow-[var(--shadow-medium)] border-0 bg-gradient-to-br from-background to-surface-light mt-4">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                  <div className="w-7 h-7 bg-primary rounded-full mr-3 flex items-center justify-center">
                    <div className="w-3 h-3 bg-background rounded-full"></div>
                  </div>
                  Our Mission
                </h3>
                <p className="text-lg text-text-primary leading-relaxed">
                  To bridge the gap between clients and legal experts using intelligent tools, secure communication, and a user-centric experience-empowering both parties to address legal matters with confidence and clarity.
                </p>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="animate-fade-in">
            <h4 className="text-2xl font-bold text-center text-primary mb-12">
              What We Stand For
            </h4>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Client-Centric Approach",
                  icon: "👥",
                  description: "Putting client needs at the heart of everything we do"
                },
                {
                  title: "Secure & Confidential",
                  icon: "🔒",
                  description: "Ensuring the highest standards of data protection"
                },
                {
                  title: "Accessibility for All",
                  icon: "🌍",
                  description: "Making legal services available to everyone"
                },
                {
                  title: "Transparency",
                  icon: "💎",
                  description: "Clear, honest communication in all processes"
                },
                {
                  title: "Innovation",
                  icon: "🚀",
                  description: "Leveraging cutting-edge technology solutions"
                },
                {
                  title: "Excellence",
                  icon: "⭐",
                  description: "Delivering exceptional quality in every interaction"
                }
              ].map((value, index) => (
                <Card
                  key={index}
                  className="p-6 text-center shadow-[var(--shadow-soft)] border-0 bg-background hover:shadow-[var(--shadow-strong)] hover:scale-105 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h5 className="font-semibold text-text-primary mb-3 text-lg">
                    {value.title}
                  </h5>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 opacity-60">
              <div className="w-16 h-px bg-primary"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-16 h-px bg-primary"></div>
            </div>
          </div>
        </div>
      </section>
      <div>
      </div>
<Footer/>
    </div>
  );
};

export default AboutUs;