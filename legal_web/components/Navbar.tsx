"use client"
import React, { useState, useEffect, useRef, act } from 'react';
import { Menu, X, User, UserPlus, ArrowRight } from 'lucide-react';
import Logo from './Logo';
// import { button } from "./ui/button";
// import Languagechecker from './languagechecker';
import { useRouter,usePathname } from 'next/navigation';
import Link from 'next/link'
import HashLink from './HashLink';
import LanguageSwitcher from './LanguageChecker';
import { Button } from './ui/button';


const MobileMenu = ({
  isOpen,
  onClose,
  menuItems,
  activeSection,
  handleNavClick,
  handleLogin,
  handleSignup,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{ label: string; href?: string; children?: { label: string; to: string }[] }>;
  activeSection: string;
  handleNavClick: (href: string) => void;
  handleLogin: () => void;
  handleSignup: () => void;
}) => {
  const navigate = useRouter();

  return (
    <div className={`lg:hidden fixed inset-x-0 top-0 z-40 transform transition-all duration-300 ease-out ${isOpen ? 'translate-y-20 opacity-100' : '-translate-y-[150%] opacity-0 pointer-events-none'}`}>
      <div className="bg-white border-b border-border shadow-xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="py-4">
            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                const isHash = item.href?.startsWith('');

                return (
                  <div key={item.label} className="group flex items-center justify-between w-full">
                    {isHash ? (
                      <Link
                        href={`/${item.href}`} // fixed template literal
                        className={`flex-1 px-4 py-3 text-left rounded-lg transition-all duration-200 ${activeSection === item.href?.substring(1)
                            ? 'bg-primary/10 text-primary border-l-4 border-primary'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }`}
                          onClick={()=>onClose()}
                      >
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => item.href === 'Nriservices' && navigate.push('/Nriservices')}
                        className={`flex-1 px-4 py-3 text-left rounded-lg transition-all duration-300 ${activeSection === item.href?.substring(1)
                            ? 'text-primary'
                            : 'text-gray-600'
                          }`}
                      >
                        {item.label}
                      </button>
                    )}

                    {/* <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" /> */}
                  </div>
                );
              })}


              <button
                onClick={() => { navigate.push('/Aboutus'); onClose(); }}
                className="group flex items-center justify-between w-full px-4 py-3 text-left rounded-lg transition-all duration-200 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              >
                <span className="font-medium">About Us</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            </nav>
          </div>

          <div className="py-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Language</span>
              <div className="p-1 rounded-md">
                <LanguageSwitcher onClose={onClose} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleLogin} className="flex items-center justify-center gap-2 h-12 group bg-white text-black border">
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" /> Login
              </Button>
              <Button onClick={handleSignup} className="flex items-center justify-center gap-2 h-12 group transform hover:scale-105 transition-all duration-200">
                <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const[activebar,setActiveBar]=useState('')
  const navigate = useRouter();
  const location=usePathname()
  // console.log(location)
  useEffect(() => {
    if (window.innerWidth < 1024 && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const mobileMenuRef = useRef<HTMLDivElement>(null);


  const menuItems = [
    {
      label: "Services",
      href: "services/legal-consultation",
      children: [
        { label: "Legal Consultation", to: "/services/legal-consultation" },//services/legal-consultation
        { label: "Legal Representation", to: "/services/legal-representation" },//services/legal-representation
        { label: "Enterprise Legal", to: "/services/legal-enterprise" },//services/enterprise
      ]
    },
    {
      label: "Expertise", href: "#expertise",
      children: [
        // { label: "Business Law", to: "/expertise/business" },//Expertise/business-law
        { label: "Civil Law", to: "/expertise/civil" },//Expertise/civil-law
        { label: "Corporate Law", to: "/expertise/corporate" },//Expertise/corporate-law
        { label: "Criminal Law", to: "/expertise/criminal" },//Expertise/criminal-law
        { label: "Family Law", to: "/expertise/family" }//Expertise/family-law
      ]
    },
    { label: "NRI Services", href: "Nriservices" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 630);
      const sections = menuItems.map(i => i.href?.substring(1));
      const currentSection = sections.find(section => {
        const el = section ? document.getElementById(section) : null;
        return el && el.getBoundingClientRect().top <= 0 && el.getBoundingClientRect().bottom >=100;
      });
      if
    (currentSection) {setActiveSection(currentSection);
      setActiveBar(currentSection)
      }
      else
      {
        setActiveBar('')
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleNavClick = (href: string) => {
    // console.log('href ', href)
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  return (
    <>
<div
  className={`
    sticky top-0 z-50 w-full
    bg-white/80 backdrop-blur-md
    shadow-sm
    transition-all duration-300
  `}
>        <div className="container-custom pl-2 pr-2 mx-auto px-4 max-w-7xl flex items-center justify-between py-4">
          <Logo onPress={() => navigate.push('/')} />

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {menuItems.map(item => (
              <div
                key={item.label}
                className="relative hover:text-orange-400"
                onMouseEnter={() => item.children &&setActiveSection(item.label)}
                onMouseLeave={() => item.children && setActiveSection('')}>

                <Link
                  href={item.href === "Nriservices" ? "/Nriservices" : ``}
                  className={`text-md font-semibold cursor-pointer hover:text-orange-400`}

                >
                  {item.label}
                  {/* <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-black origin-left transform transition-transform duration-300
        ${activebar === item.href?.substring(1)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'}`}
                  /> */}
                </Link>
                {/* Dropdown */}
                <div className=''>
                {item.children && activeSection === item.label && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden z-50 backdrop-blur-sm animate-in fade-in slide-in-from-top-3 duration-300">                    {/* Header Section */}
                  <div className="">
                    <div className="px-5 py-4 bg-gray-200 border-b border-gray-100">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                       { `Our ${item.label}`}
                      </h3>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {item.children.map((child, index) => (
                        <Link
                          key={child.to}
                          href={child.to}
                          className="group flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:text-gray-700 transition-all duration-300 border-l-4 border-transparent hover:border-gray-600 hover:text-gray-10"
                        >
                          <div className="flex items-center gap-3">
                            {/* Optional Icon */}
                            <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-black transition-colors duration-300" />
                            <span className="font-sm">{child.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  </div>
                )}



              </div>
              </div>
            ))}
            <Link
            href='/Aboutus'
            className={`text-md font-semibold cursor-pointer hover:text-orange-400`}>
              About Us
              </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button onClick={() => navigate.push('/login')} className="group bg-white flex items-center gap-2 transform hover:scale-105  hover:bg-gray-100 transition-all duration-200 text-blue-500">
              <User className="w-4 h-4 text-yellow-700 group-hover:scale-110 transition-transform" /> Login
            </Button>
            <Button onClick={() => navigate.push('/signup')} className="group flex items-center gap-2  text-white hover:text-gray-400 transform hover:scale-105 transition-all duration-200">
              <UserPlus className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" /> Register
            </Button>
           <div className="relative rounded-lg">
                {location !== '/Nriservices/' && location!== '/Aboutus/' && location !== '/signup/' && location !== '/PrivacyPolicy/' && location !=='/Disclaimers/' && location!=='/UserAgreement/' && (
                  <LanguageSwitcher onClose={() => { }} />
                )}
              </div>
          </div>

          {/* Mobile Menu button */}
          <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transform transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
              <X className={`absolute inset-0 transform transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
            </div>
          </button>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          menuItems={menuItems}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          handleLogin={() => navigate.push('/login')}
          handleSignup={() => navigate.push('/signup')}
        />
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </>

  );
};

export default Navbar;
