"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { ArrowDown, ArrowLeft, ArrowUp, ChevronDown, ChevronUp, Mouse } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import "../app/index.css"
import { Button } from "./ui/button";

const services = [
    {
        category: "Property and Real Estate Services",
        image: '/property2.jpeg',
        color: 'teal-300',
        style: {},
        items: [
            "Property dispute resolution (with tenants, relatives, or encroachers).",
            "Title verification and property due diligence before purchase/sale.",
            "Property partition and settlement (between siblings or relatives).",
            "Drafting and registration of Power of Attorney (POA) to manage property.",
            "Illegal possession or encroachment cases.",
            "Property transfer, mutation, and registration services.",
            "Assistance in selling, renting, or managing ancestral property.",
            "Stamp duty, land revenue, and property tax issues.",
        ],
    },
    {
        category: "Family and Matrimonial Services",
        image: '/family.jpeg',
        color: 'white',
        items: [
            "Divorce filing and representation in India.",
            "Child custody and visitation rights.",
            "Maintenance and alimony claims.",
            "Marriage registration or annulment services.",
            "Domestic violence cases.",
            "Inter-country marriage disputes (where spouse is in India).",
        ],
    },
    {
        category: "Inheritance and Succession",
        image: '/inheritance2.jpeg',
        color: 'green-400',
        items: [
            "Drafting wills and succession planning for Indian assets.",
            "Probate of wills.",
            "Legal heirship certificate procurement.",
            "Partition of ancestral property.",
            "Trust and estate management for parents in India.",
        ],
    },
    {
        category: "Civil and Criminal Services",
        image: '/civil.jpeg',
        color: 'yellow-400',
        items: [
            "Civil disputes (contracts, agreements, money recovery).",
            "Criminal defense for false FIRs or complaints.",
            "Cybercrime complaints (fraud, online scams affecting NRIs).",
            "Cheque bounce and financial fraud cases.",
        ],
    },
    {
        category: "Immigration and Visa-Related Services",
        image: '/immigration.jpeg',
        color: 'orange-600',
        items: [
            "Assistance in OCI (Overseas Citizen of India) and PIO card issues.",
            "Visa extension, renewal, or overstay issues.",
            "Citizenship renunciation services.",
            "Immigration fraud cases.",
            "Representation in India for immigration-related disputes.",
        ],
    },
    {
        category: "Documentation and Certification",
        image: '/documentation.jpeg',
        color: 'emerald-400',
        items: [
            "Attestation and notarization of documents.",
            "Birth, marriage, and death certificate procurement in India.",
            "Police clearance certificate (PCC) for NRI applications.",
            "PAN card, Aadhaar, and Indian ID documentation issues.",
            "Drafting affidavits, indemnity bonds, and NRI declarations.",
        ],
    },
    {
        category: "Banking and Financial Services",
        image: '/financial.jpeg',
        color: 'lime-300',
        items: [
            "NRI bank account disputes.",
            "Repatriation of funds (from India to abroad).",
            "Tax compliance and representation before authorities.",
            "Insurance claim settlements in India.",
            "Loan recovery and disputes with banks/NBFCs.",
        ],
    },
    {
        category: "Corporate and Business Services",
        image: '/corporate.jpeg',
        color: 'amber-600',
        items: [
            "Setting up a company or LLP in India.",
            "Drafting partnership agreements or shareholder agreements.",
            "Contract enforcement and disputes.",
            "Trademark, patent, and copyright registrations.",
            "Arbitration and mediation in commercial disputes.",
        ],
    },
    {
        category: "Parents and Elderly Care Services",
        image: '/elderly.jpeg',
        color: 'rose-300',
        style: { objectPosition: '70% 74%' },
        items: [
            "Legal guardianship or caretaking agreements.",
            "Resolving disputes with tenants/caretakers in parents’ property.",
            "Protection against frauds targeting elderly parents in India.",
            "Medical insurance and claim assistance.",
        ],
    },
    {
        category: "Insurance and Compensation",
        image: '/insurance2.jpeg',
        color: 'cyan-300',
        items: [
            "Life insurance or health insurance claim settlement in India.",
            "Accident or compensation claims.",
            "Property insurance disputes.",
        ],
    },
];

function NriServices() {
    const [showScrollHint, setShowScrollHint] = useState(true);
    const [isMac, setIsMac] = useState(false);
    const [isEnd, setIsEnd] = useState(false)
    const [banner, setBanner] = useState(true)

    useEffect(() => {
        const checkEnd = () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
            setIsEnd(nearBottom);
        };
        window.addEventListener("scroll", checkEnd);
        checkEnd(); // run once on load
        return () => window.removeEventListener("scroll", checkEnd);
    }, []);

    const handleScroll = () => {
        window.scrollBy({
            top: isMac ? window.innerHeight : window.innerHeight + 200,
            behavior: "smooth",
        });
    };

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className=" pt-10 relative">
                {/* Hidden safelist for Tailwind v4 */}
                <div className="hidden text-teal-300 text-orange-600 text-amber-600 text-green-400 text-yellow-400 text-cyan-300 text-emerald-400 text-lime-300 text-white text-rose-300 text-amber-300 text-fuchsia-300" />

                <div className="container-custom relative z-10 text-center  mx-auto mb-7">
                    <div className="w-full animate-fade-in">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif  leading-tight tracking-tight sm:leading-[1.2] ">
                            Comprehensive <span className="text-orange-600 font-serif">NRI Legal Services</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Slider Section */}
            <section className="container-custom pt-2 h-[500px] text-center mb-20  ">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={0} // no space since we want big slide
                    slidesPerView={1} // only 1 slide visible
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    navigation={false}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            // Enhanced gradient, larger bullet with number
                            return `
                <span 
                  class="${className} inline-flex items-center justify-center 
                    w-8 h-8 rounded-full 
                    bg-gradient-to-br from-orange-400 via-teal-400 to-blue-500 
                    text-white font-extrabold shadow-md border-2 border-white mx-1 select-none
                    transition-transform duration-300
                    hover:scale-110 hover:ring-2 hover:ring-orange-500"
                  style="font-size:1.05rem;">
                 
                </span>
              `;
                        },
                    }}
                    onClick={(swiper) => {
                        swiper.autoplay.stop()
                        setTimeout(() => {
                            swiper.autoplay.start()
                        }, 10000);
                    }}
                    className="w-full h-full"
                >
                    {services.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full  overflow-hidden">
                                {/* Background Image */}
                                <img
                                    src={slide.image}
                                    alt={slide.category}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={slide.style}
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40" />
                                {/* Text on top */}
                                <div className={`relative z-10 flex items-center justify-center h-full  px-6 text-center top-20`}>
                                    <h2
                                        className={`text-3xl sm:text-5xl font-semibold leading-snug text-shadow-emboss text-${slide.color} `}
                                    >
                                        {slide.category}
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Downwards Arrow */}
            {!isEnd && (
                <div className="lg:fixed  bottom-2 left-1/2 transform -translate-x-1/2  z-50 transition-opacity duration-500">
                    <button
                        onClick={handleScroll}
                        className="relative flex flex-col items-center group"
                    >
                        <div className="p-3 bg-white rounded-full shadow-lg transition relative
                    ring-2 ring-gray-400 group-hover:ring-2 group-hover:ring-black
                    group-hover:animate-pulse">
                            <ChevronDown className="w-6 h-6 text-2xl text-black hover:text-black animate-bounce " />
                        </div>
                    </button>
                </div>
            )}
            {isEnd && (
                <div className="lg:fixed  bottom-16 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500">
                    <button
                        onClick={handleScrollTop}
                        className="relative flex flex-col items-center group"
                    >
                        <div className="p-3 bg-white rounded-full shadow-lg transition relative
                    ring-2 ring-white group-hover:ring-2 group-hover:ring-black
                    group-hover:animate-pulse">
                            <ChevronUp className="w-6 h-6 text-black hover:text-black animate-bounce" />
                        </div>
                    </button>
                </div>
            )}

            {/* Services Cards */}
            <div className="text-center max-w-7xl mx-auto mb-7">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
                    Comprehensive Solutions, Tailored to You
                </h2>
                <p className="text:sm sm:text-gray-600 leading-snug">
                    Explore our wide range of legal services designed to assist NRIs in resolving
                    property, family, business, and documentation matters with confidence.
                </p>
                <section className="z-10 px-6 md:px-0 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 mt-10">
                    {services.map((service, index) => (
                        <Card key={index} className="shadow-md rounded-2xl border flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-xl font-serif text-center">{service.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-gray-700">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-primary mt-1 mr-2">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                            </CardContent>

                            <Button className=" self-end mb-4 mr-4  rounded-lg"
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                    // Optional: toggle chat widget
                                    if (typeof window !== "undefined" && (window as any).Tawk_API) {
                                        (window as any).Tawk_API.toggle();
                                    }
                                }}>
                                Chat With Us....
                            </Button>


                        </Card>
                    ))}

                    <Card className="container-custom shadow-lg rounded-2xl  border border-blue-100 bg-blue-100  flex flex-col justify-between mb-8 md:max-w-7xl mx-auto  md:col-span-2">
                        <CardHeader>
                            <div className="font-serif text-center text-slate-900 mb-4">
                                <h1 className="text-3xl sm:text-4xl font-bold leading-tight sm:leading-[1.2]">For Your Parents and Loved Ones in India</h1>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <h4 className="text-lg sm:text-xl font-medium leading-relaxed">
                                Living miles away? <span className="text-gray-900 font-bold text-xl">We ensure your family's legal peace of mind in India.</span>
                                Our team delivers trusted legal help, document assistance, and on-call support-right at your family’s doorstep.
                            </h4>
                            <ul className="space-y-2 text-gray-700 sm:text-lg px-4 sm:px-0 mt-4">
                                <h2><li className="flex items-center"><span className="text-rose-500 mr-2 ">❤️</span> Dispute resolution with tenants & neighbors.</li></h2>
                                <h2><li className="flex items-center"><span className="text-rose-500 mr-2">❤️</span> Caretaking agreements & legal guardianship for elders.</li></h2>
                                <h2> <li className="flex items-center"><span className="text-rose-500 mr-2">❤️</span> Document delivery: wills, property, ID, insurance.</li></h2>
                                <h2> <li className="flex items-center"><span className="text-rose-500 mr-2">❤️</span> Fraud prevention and medical claim assistance.</li></h2>
                                <h2> <li className="flex items-center"><span className="text-rose-500 mr-2">❤️</span> Emergency help-swift, secure & compassionate.</li></h2>
                            </ul>
                        </CardContent>
                        <Button
                            className="self-center mt-6 mb-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                            onClick={() => {
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                if (typeof window !== "undefined" && (window as any).Tawk_API) {
                                    (window as any).Tawk_API.toggle();
                                }
                            }}>
                            Chat About Parent Support
                        </Button>
                    </Card>
                </section>


            </div>
            <Footer />
        </div>
    );
}

export default NriServices;
