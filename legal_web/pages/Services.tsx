"use client";
import React, { useEffect, useState } from "react";
import { Scale, FileText, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const servicesData = {
  section_title: "Our Legal Services",
  section_desc:
    "Comprehensive legal solutions tailored to meet your unique requirements with precision and care.",
  service: [
    {
      title: "Legal Consultation",
      tag: "legal consultation",
      basic:
        "JP LAW SUVIDHA combines expert legal advice with AI to deliver fast, secure, and personalized consultations anytime, anywhere.",
      description: [
        "JP LAW SUVIDHA revolutionizes the consultation experience by combining expert human insight with cutting-edge technology.",
        "Our platform intelligently matches you with a qualified legal professional based on your specific needs.",
        "AI-driven algorithms analyze your legal concerns and instantly connect you with verified lawyers.",
        "Secure video conferencing, real-time messaging, and document exchange ensure confidentiality and convenience.",
        "All interactions are encrypted and securely logged for peace of mind and follow-ups.",
        "Whether individual or business, we ensure faster responses and better outcomes.",
      ],
    },
    {
      title: "Legal Representation",
      tag: "legal representation",
      basic:
        "JP LAW SUVIDHA connects clients with trusted lawyers, streamlining legal discovery, communication, and consultation.",
      description: [
        "JP LAW SUVIDHA helps clients find and engage legal professionals.",
        "Uses intelligent algorithms to connect clients with lawyers based on case type, location, and expertise.",
        "Supports wide-ranging legal needs: court proceedings, contract negotiations, and advisory services.",
        "Provides secure communication tools and appointment scheduling for easy consultation.",
        "Simplifies document sharing and case tracking for clients and lawyers.",
        "Makes legal support more approachable and responsive.",
      ],
    },
    {
      title: "Enterprise Legal",
      tag: "enterprise legal",
      basic:
        "JP LAW SUVIDHA offers startups and companies digital legal services ensuring compliance, IP protection, and expert guidance.",
      description: [
        "Designed for startups and mid-sized firms, removing the need for in-house legal teams.",
        "Provides easy access to essential legal documentation and compliance tools.",
        "Covers company incorporation, employment contracts, vendor agreements, and filings.",
        "Ensures compliance and legal safety through a digital platform.",
        "Offers IP protection: trademark, copyright, and policy drafting.",
        "Enables encrypted, efficient collaboration with legal experts.",
      ],
    },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const router = useRouter();

  const icons = [
    <Scale className="w-10 h-10 text-blue-700" key="scale" />,
    <Users className="w-10 h-10 text-orange-700" key="users" />,
    <FileText className="w-10 h-10 text-pink-700" key="file" />,
  ];

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedService ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {servicesData.section_title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {servicesData.section_desc}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {servicesData.service.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 p-7 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02]"
              onClick={() => {
                if (window.innerWidth >= 1024) setSelectedService(service);
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                {icons[index]}
              </div>

              <h2 className="text-xl font-semibold mt-14 text-center mb-2 text-primary">
                {service.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 line-clamp-4 text-center lg:hidden">
                {service.basic}
              </p>

              <div className="flex flex-col items-center mt-4">
                <div className="hidden lg:flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:gap-3 transition-all">
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white dark:bg-gray-900 max-w-4xl w-full mx-4 p-8 rounded-xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition"
                aria-label="Close modal"
              >
                ✕
              </button>

              <h3 className="text-2xl font-semibold text-center text-primary mb-6">
                {selectedService.title}
              </h3>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {selectedService.description.map((point: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      <span className="text-primary mr-2 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
