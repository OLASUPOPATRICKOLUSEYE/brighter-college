"use client";
import React, { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const images = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
  "/bg4.jpg", 
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 2000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[80vh] sm:h-[90vh] lg:h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

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
