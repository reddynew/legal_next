"use client"
import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
   const testimonials = [ //later make an api call to fetch the client reviews from db.
    {
        name: "Jagath Reddy",
        position: "Business Owner",
        image: "/ ",
        stars: 5,
        text: "Law Suvidha’s corporate advisory team helped streamline our compliance process. Their guidance made navigating business regulations simple and efficient."
    },
    {
        name: "Vineet Reddy",
        position: "Entrepreneur",
        image: "/ ",
        stars: 5,
        text: "The legal due-diligence support provided by Law Suvidha was extremely thorough. Their expertise gave me confidence before finalising a major business partnership."
    },
     {
        name: "Aliff Consultancy",
        position: "Consultancy",
        image: "/ ",
        stars: 5,
        text: "Law Suvidha’s contract litigation team managed case with professionalism and clarity. Their guidance made the entire process stress-free."
    },
    {
        name: "Rohith Reddy",
        position: "Client",
        image: "/ ",
        stars: 4,
        text: "I approached Law Suvidha for a civil dispute, and their clarity in explaining each step was reassuring. Their strategic approach helped resolve the matter smoothly."
    },
    {
        name: "Saritha Anjali",
        position: "Corporate Executive",
        image: "/ ",
        stars: 5,
        text: "Law Suvidha provided excellent support with contract drafting and negotiation. Their corporate law knowledge helped us avoid several potential risks."
    },
    {
        name: "Narmada Reddy",
        position: "Client",
        image: "/ ",
        stars: 5,
        text: "My property-related civil case was handled professionally and with great attention to detail. Law Suvidha ensured a hassle-free resolution."
    },
    {
        name: "Pradeep Kumar",
        position: "Startup Founder",
        image: "/ ",
        stars: 5,
        text: "From business incorporation to compliance consulting, Law Suvidha has been a dependable partner. Their corporate legal services are top-notch."
    },
    {
        name: "Hanuman Reddy",
        position: "Client",
        image: "/ ",
        stars: 5,
        text: "I approached Law Suvidha for help with a business contract dispute. Their legal team handled it efficiently, ensuring my interests were protected."
    }
];


    return (
        <section id="testimonials" className="py-16 bg-gray-50">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="heading-lg mb-4">Client Testimonials</h2>
                    <p className="paragraph">Hear from our clients about their experiences working with Law Suvidha.</p>
                </div>
                <div className=''>
                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                   navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 }, // Show 2 slides on medium screens
                        1024: { slidesPerView: 3 }, // Show 3 slides on large screens
                    }}
                    className="px-4 h-[350px]"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-[300px]">
                                <div className="flex items-center space-x-1 mb-6">
                                    {[...Array(testimonial.stars)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    {[...Array(5 - testimonial.stars)].map((_, i) => (
                                        <Star key={i + testimonial.stars} className="w-5 h-5 text-gray-300" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name.split(" ")
    .map(n => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.position}</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                </div>
                 {/* <button className="swiper-button-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 text-gray-800">
    <ChevronLeft size={24} />
  </button>
  <button className="swiper-button-next absolute top-1/2 right-0 -translate-y-1/2 z-10 text-gray-800">
    <ChevronRight size={24} />
  </button> */}
            </div>
            <style jsx global>{`


  /* ↓↓↓ ADD THIS ↓↓↓ */
  .swiper-button-next,
  .swiper-button-prev {
    width: 24px !important;   /* decrease button area */
    height: 24px !important;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 18px !important; /* decrease arrow icon size */
  }
`}</style>

        </section>
    );
};

export default Testimonials;