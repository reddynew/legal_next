"use client"
import { Scale } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Logo = ({ onPress }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 630); // Customize threshold
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex gap-2 cursor-pointer">
      {/* <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif text-xl font-bold">
        <Scale className='text-white'></Scale>
      </div> */}
      <div className="w-16 h-16 flex items-center rounded-lg  justify-center cursor-pointer" onClick={onPress}>
        {/* <Scale className="w-7 h-7 text-white" /> */}
        <img src="/TLogo.png" alt="img" className="w-16 h-16 rounded-lg " />
      </div>
      <div className={` flex flex-col font-Poppins font-bold text-[30px]
         font-semibold transition-all duration-100 text-black -mt-1 `} onClick={onPress}>
        JP Law Suvidha
        <p className="text-sm font-normal  font-merriweather  font-Poppins">
          Justice for People Driven by Technology
        </p>
      </div>
    </div>
  );
};

export default Logo;
