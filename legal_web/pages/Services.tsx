"use client";
import React, { useEffect, useState } from "react";
import { Scale, FileText, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import '../app/index.css'
// import '@/lib/i18n';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const router = useRouter();
  const { t } = useTranslation('services');

  const icons = [
    <Scale className="w-10 h-10 text-blue-700" key="scale" />,
    <Users className="w-10 h-10 text-orange-700" key="users" />,
    <FileText className="w-10 h-10 text-pink-700" key="file" />,
  ];

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedService ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  // Get services from translations
  const services = [0, 1, 2].map(index => ({
    title: t(`service.${index}.title`),
    tag: t(`service.${index}.tag`),
    basic: t(`service.${index}.basic`),
    description: Array.from({ length: 6 }, (_, i) => 
      t(`service.${index}.description.${i}`)
    ),
  }));

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
         <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-lg font-bold tracking-tight sm:text-4xl mb-4">{t('section_title')}</h2>
          <p className="paragraph text-gray-700">{t('section_desc')}</p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <div
              key={index}
              className="group  relative bg-card p-7 rounded-xl border gray-400 transition-all duration-400 ease-out hover:scale-100 hover:shadow-xl animate-slide-up transform-gpu will-change-transform"
              onClick={() => {
                if (window.innerWidth >= 1024) setSelectedService(service);
              }}
            >
              <div 
              className="mb-6 text-primary transition-transform duration-400 group-hover:scale-110 group-hover:rotate-2 absolute top-4 left-2/4 transform -translate-x-1/2 ">
                {icons[index]}
              </div>

              <h2 
               className=" heading-sm mt-11 text-center mb-2">
                {service.title}
              </h2>

              <p 
              className="text-gray-600  line-clamp-4 text-center lg:hidden">
                {service.basic}
              </p>

              <div className="flex flex-col items-center mt-4">
                <div 
                className="hidden lg:flex items-center gap-2 text-xs text-gray-700 font-medium group-hover:gap-2 transition-all mt-2 ">
                  <span>Know More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedService && (
          <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 "
            onClick={() => setSelectedService(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
                className="bg-card max-w-4xl w-full mx-4 p-7 rounded-xl shadow-2xl border border-border relative animate-scale-in hover-scale"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                aria-label="Close modal"
              >
               <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
              </button>
            <div>
              <h3
                className="heading-sm font-semibold mb-4 text-primary pr-7 text-center">

                {selectedService.title}
              </h3>
              </div>

              {selectedService && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {selectedService.description.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                          <span className="text-primary mt-1 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;