"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, UserPlus, ArrowRight } from 'lucide-react';
import Logo from './Logo';
// import { button } from "./ui/button";
// import Languagechecker from './languagechecker';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

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
              {menuItems.map((item, index) => (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => {
                      if (item.href === "nri") {
                        navigate.push('/nri');
                      } else if (item.children) {
                        // toggle children if needed
                      } else {
                        // handleNavClick(item.href);
                        onClose();
                      }
                    }}
                    className={`group flex items-center justify-between w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${activeSection === item.href?.substring(1)
                      ? 'bg-primary/10 text-primary border-l-4 border-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-medium ">{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </button>
                  {/* Render children for mobile */}
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          href={child.to}
                          onClick={onClose}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => { navigate.push('/about'); onClose(); }}
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
              {/* <div className="p-1 rounded-md">
                <Languagechecker onClose={onClose} />
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button  onClick={handleLogin} className="flex items-center justify-center gap-2 h-12 group">
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" /> Login
              </button>
              <button onClick={handleSignup} className="flex items-center justify-center gap-2 h-12 group transform hover:scale-105 transition-all duration-200">
                <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Subscribe
              </button>
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
  const navigate = useRouter();
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
      href: "#services",
      children: [
        { label: "Legal Consultation", to: "/services/legal-consultation" },
        { label: "Legal Representation", to: "/services/legal-representation" },
        { label: "Enterprise Legal", to: "/services/enterprise" },
      ]
    },
    { label: "Expertise", href: "#expertise" },
    { label: "NRI Services", href: "Nriservices" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 630);
      const sections = menuItems.map(i => i.href?.substring(1));
      const currentSection = sections.find(section => {
        const el = section ? document.getElementById(section) : null;
        return el && el.getBoundingClientRect().top <= 100 && el.getBoundingClientRect().bottom >= 100;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
const handleNavClick = (href: string) => {
  console.log('href ',href)
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  return (
    <>
      <div className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white`}>
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between py-4">
          <Logo onPress={()=>navigate.push('/')} />

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {menuItems.map(item => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && setServicesOpen(true)} onMouseLeave={() => item.children && setServicesOpen(false)}>
                <button
                  onClick={() => {item.href === "Nriservices" ? navigate.push('/Nriservices') : item.href && setActiveSection(item.href.substring(1))}}
                  className={`text-md font-medium transition-all duration-300 cursor-pointer ${activeSection === item.href?.substring(1) ? 'text-primary' : 'text-gray-600'}`}
                >
                  {item.label}
                </button>
                <span
                    className={`absolute left-0 right-0 bottom-0 h-0.5 transform origin-left transition-transform duration-300 
              ${activeSection === item.href.substring(1)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'} `}
                  />

                {/* Dropdown */}
                {item.children && servicesOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-border shadow-lg rounded-md z-50">
                    {item.children.map(child => (
                     <Link key={child.to} href={child.to}>

    {child.label}

</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button onClick={() => navigate.push('/Aboutus')} className={`text-md font-medium transition-all duration-300 hover:text-primary text-gray-600 cursor-pointer`}>About Us</button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button   onClick={() => navigate.push('/login')} className="group flex items-center gap-2 transform hover:scale-105 transition-all duration-200 text-blue-500">
              <User className="w-4 h-4 text-yellow-700 group-hover:scale-110 transition-transform" /> Login
            </button>
            <button  onClick={() => navigate.push('/signup')} className="group flex items-center gap-2  text-black hover:text-gray-400 transform hover:scale-105 transition-all duration-200">
              <UserPlus className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" /> Subscribe
            </button>
            {/* <Languagechecker onClose={() => { }} /> */}
          </div>

          {/* Mobile Menu button */}
          <button   className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
    </>
  );
};

export default Navbar;
