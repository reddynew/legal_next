"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import  '../app/index.css'

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-24 md:pb-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
  <img
    src="/hero.jpeg"
    alt=""
  className="
    w-full h-full object-cover
    object-[center_100%]
    sm:object-[center_40%]
    md:object-[right_10%]
    md:object-[center_100%]
  "
    loading="lazy"
  />
  <div className="absolute inset-0 bg-black/50"></div>
</div>

      {/* Hero Content */}
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div
            className="
              max-w-2xl animate-fade-in relative 
              left-0 sm:left-10 -top-2 sm:-top-6 
              px-4 sm:px-0 text-center sm:text-left
            "
          >
            <h1 className="heading-xl mb-6 text-white">
              Professional Legal Solutions for Every Challenge
            </h1>

            <p
              className="
                paragraph mb-7 text-white/90 
                text-base sm:text-lg md:text-lg leading-relaxed
                px-4 sm:px-6 md:px-0 text-center sm:text-left max-w-2xl
              "
            >
              JP Law Suvidha is a secure, tech-enabled platform designed to
              connect clients with the right legal professionals. We combine
              advanced digital tools with deep legal industry insight to
              simplify communication and ensure timely, effective access to
              legal support.
            </p>

            {/* Button */}
            <Button
              size="lg"
              className="
                bg-white group
                transition-all duration-300 hover:scale-105 hover:bg-white rounded-xl
              "
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                });
                // Optional: toggle chat widget
                if (typeof window !== "undefined" && (window as any).Tawk_API) {
                  (window as any).Tawk_API.toggle();
                }
              }}
            >
              {/* Glow Layer */}
              <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>

              {/* Content */}
              < div>

              <span className="relative z-10 flex items-center gap-2 text-black">
                <Rocket className="w-5 h-5" />
                Chat with Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
