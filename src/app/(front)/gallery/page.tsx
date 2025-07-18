"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import GalleryHero from "./GalleryHero";

const galleryItems = [
  {
    id: 1,
    title: "Annual Sports Day",
    description: "Students competing with enthusiasm and sportsmanship.",
    image: "/bg1.jpg",
    date: "2024-03-10",
    category: "Sports",
  },
  {
    id: 2,
    title: "Science Exhibition",
    description: "Innovative projects presented by our young scientists.",
    image: "/bg2.jpg",
    date: "2024-04-05",
    category: "Academics",
  },
  {
    id: 3,
    title: "Independence Day",
    description: "Celebrating patriotism and national pride.",
    image: "/bg3.jpg",
    date: "2023-08-15",
    category: "National Events",
  },
  {
    id: 4,
    title: "Cultural Fest",
    description: "Showcasing diverse cultural performances by students.",
    image: "/bg4.jpg",
    date: "2023-11-20",
    category: "Culture",
  },
  {
    id: 5,
    title: "Farewell Party",
    description: "Sending off our seniors with memories and gratitude.",
    image: "/bg3.jpg",
    date: "2023-06-01",
    category: "Ceremony",
  },
  {
    id: 6,
    title: "Tree Plantation Drive",
    description: "Encouraging eco-consciousness through action.",
    image: "/bg4.jpg",
    date: "2024-01-25",
    category: "Environment",
  },
];

const MainGallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const filteredItems = [...galleryItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((item) => filter === "All" || item.category === filter);

     const categories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category))).sort()];


  return (
    <>
      <GalleryHero />
      <section className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-3">School Gallery</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            A glimpse into the vibrant moments and milestones of our campus life.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`text-sm sm:text-base px-4 py-1.5 rounded-full border transition-all duration-300 ${
                filter === cat
                  ? "bg-pascalRed text-white border-pascalRed"
                  : "border-gray-400 text-gray-700 hover:bg-pascalRed hover:text-white hover:border-pascalRed"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group relative border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 cursor-pointer" onClick={() => setLightboxIndex(index)}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 pt-5">
                <h3 className="text-lg font-bold text-pascalBlue">{item.title}</h3>
                <p className="text-lg text-gray-600 my-3">{item.description}</p>
                <p className="text-sm text-pascalRed">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex >= 0 && (
          <Lightbox
            mainSrc={filteredItems[lightboxIndex].image}
            nextSrc={filteredItems[(lightboxIndex + 1) % filteredItems.length].image}
            prevSrc={filteredItems[(lightboxIndex + filteredItems.length - 1) % filteredItems.length].image}
            onCloseRequest={() => setLightboxIndex(-1)}
            onMovePrevRequest={() =>
              setLightboxIndex((lightboxIndex + filteredItems.length - 1) % filteredItems.length)
            }
            onMoveNextRequest={() =>
              setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
            }
          />
        )}
      </section>
    </>
  );
};

export default MainGallery;
