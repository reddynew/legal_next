"use client";

import { ChevronLeft, ChevronRight, Scale, Users, Award, Clock, Shield, Globe } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Scale,
      title: "LEGAL GUIDANCE",
      description: "Digital legal services for startups: compliance, IP protection, expert guidance.",
    },
    {
      icon: Users,
      title: "TRUSTED NETWORK",
      description: "Connects clients with trusted advocates securely across diverse legal domains.",
    },
    {
      icon: Award,
      title: "DIGITAL PLATFORM",
      description: "Centralizes legal consultation, documents, and representation to save time and simplify the process.",
    },
    {
      icon: Clock,
      title: "SEAMLESS ACCESS",
      description: "Quick and secure access to the right advocates anytime, anywhere.",
    },
    {
      icon: Shield,
      title: "SECURE AND CONFIDENTIAL",
      description: "All consultations use encrypted channels with industry-standard data protection protocols.",
    },
    {
      icon: Globe,
      title: "CLIENT CENTRIC",
      description: "Technology-driven, transparent legal experience tailored personally to client needs.",
    },
  ];

  return (
    <section id="jplaw" className="py-16 bg-white w-full">
      <div className="container-custom mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-black font-bold text-2xl md:text-4xl font-serif tracking-tight">
            Why Choose <span className="text-gray-700">JP Law Suvidha</span>
          </h2>
          <p className="text-gray-600 paragraph mx-auto">
            Your trusted legal partner committed to delivering excellence and justice
          </p>
        </div>

        {/* Swiper */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className} w-3 h-3 mx-1 inline-block rounded-full bg-black transition-all"></span>`,
            }}
            className="pb-12" // Make space for pagination
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <SwiperSlide key={i}>
                  <div className="group relative border border-gray-200 rounded-2xl shadow transition-all duration-300 bg-white hover:shadow-2xl hover:border-gray-600 h-[340px] sm:h-[300px] p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-6 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-700 group-hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-300 border-4 border-gray-50">
                          <Icon className="text-white group-hover:text-gray-700 transition-colors duration-300" size={32} />
                        </div>
                      </div>
                      <h3 className="mb-4 text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 text-center">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-400 text-base text-center transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-gray-700 group-hover:h-2 rounded-full transition-all duration-300"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation buttons: show on md+ screen, hide on mobile */}
          <button
            className="prev-btn hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="next-btn hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-gray-900 transition z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={14} />
          </button>

          {/* Custom Pagination Dots */}
          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>
      <style jsx global>{`
  /* Swiper Pagination Bullets */
  .swiper-pagination-bullet {
    background: #d1d5db !important; /* gray-300 */
    opacity: 1 !important;
    width: 6px;
    height: 6px;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: #000 !important; /* black */
    width: 6px !important;
    border-radius: 999px !important;
  }
`}</style>

    </section>
    
  );
}
