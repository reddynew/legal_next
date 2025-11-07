'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher({ onClose }: { onClose?: () => void }) {
  const { i18n } = useTranslation();
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = isButtonHover || isDropdownHover;

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ];

  // Persist chosen language in cookies
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    document.cookie = `preferredLanguage=${langCode}; path=/; max-age=31536000`;
    setIsDropdownHover(false);
    onClose?.();
  };

  // Read cookie helper
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  // Restore saved language on mount
  useEffect(() => {
    const savedLang = getCookie('preferredLanguage');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  // Scroll awareness
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 520);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownHover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Toggle button */}
      <button
        onMouseEnter={() => setIsButtonHover(true)}
        onMouseLeave={() => setIsButtonHover(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 border ${
          scrolled
            ? 'bg-white text-black border-gray-200 hover:bg-gray-50'
            : 'bg-white text-black border-gray-200 hover:bg-gray-50'
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="min-w-[50px] text-center">{current.native}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-0 w-40 rounded-md border border-gray-200 bg-white shadow-md z-50 transition-all duration-200"
          onMouseEnter={() => setIsDropdownHover(true)}
          onMouseLeave={() => setIsDropdownHover(false)}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-50 transition-colors ${
                i18n.language === lang.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
              }`}
            >
              <span>{lang.native}</span>
              {i18n.language === lang.code && <span className="text-blue-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
