"use client"
import { Scale } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Logo = ({onPress}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 630); // Customize threshold
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex gap-2">
      {/* <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif text-xl font-bold">
        <Scale className='text-white'></Scale>
      </div> */}
      <div className="w-14 h-14 bg-white flex items-center rounded-lg  justify-center">
                {/* <Scale className="w-7 h-7 text-white" /> */}
                <img src="/jpicon4.avif" alt="img" className="w-14 h-14 rounded-lg cursor-pointer" onClick={onPress} />
              </div>
      <div className={` flex flex-col justify-center font-serif font-bold text-xl 
         font-bold transition-all duration-100 text-black`}>
        JP Law Suvidha
        <p className="text-sm font-normal  font-merriweather font-serif">
          Justice for People Driven by Technology
        </p>
      </div>
    </div>
  );
};

export default Logo;
