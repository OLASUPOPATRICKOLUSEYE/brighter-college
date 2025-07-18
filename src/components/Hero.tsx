"use client";
import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

type HeroProps = {
  images: string[];
  interval?: number;
  overlay?: boolean;
  heightClass?: string;
};

const Hero: React.FC<HeroProps> = ({
  images,
  interval = 4000,
  overlay = true,
  heightClass = "relative h-[100vh] sm:h-[100vh] lg:h-screen overflow-hidden",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      />
      
      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black bg-opacity-30" />}

      {/* Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 sm:p-3 rounded-full z-10"
        aria-label="Previous Slide"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 sm:p-3 rounded-full z-10"
        aria-label="Next Slide"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Hero;
