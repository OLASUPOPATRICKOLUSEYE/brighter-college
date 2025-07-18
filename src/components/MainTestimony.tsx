"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonies = [
  {
    id: 1,
    name: "OLASUPO, Patrick O",
    position: "CEO, PascalTech",
    image: "/staff1.jpg",
    testimony: "This school transformed my childs life. The teachers are truly passionate!",
  },
  {
    id: 2,
    name: "ADEBAYO, Grace T",
    position: "Parent",
    image: "/staff2.jpg",
    testimony: "Outstanding teaching and caring staff. Highly recommended!",
  },
  {
    id: 3,
    name: "AJAYI, David K",
    position: "Alumni",
    image: "/staff3.jpg",
    testimony: "I owe my success to the foundation laid here. Grateful forever.",
  },
  {
    id: 4,
    name: "FATIMA, Sulaimon M",
    position: "Teacher",
    image: "/staff4.jpg",
    testimony: "A wonderful environment to work and grow professionally.",
  },
  {
    id: 5,
    name: "OLUWASEUN, Racheal B",
    position: "Student",
    image: "/staff5.jpg",
    testimony: "Fun, engaging, and highly motivating. I love my school!",
  },
  {
    id: 6,
    name: "IDOWU, Rihanat B",
    position: "Parent",
    image: "/staff2.jpg",
    testimony: "Supportive community and academic excellence combined.",
  },
  {
    id: 7,
    name: "LAWAL, Idris A",
    position: "PTA Member",
    image: "/staff3.jpg",
    testimony: "The leadership and discipline here are unmatched.",
  },
];

const MainTestimony = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const currentPageRef = useRef(0); // For internal loop tracking

  // Responsive layout
  const updateLayout = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(1);
    } else if (width < 1024) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(testimonies.length / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const nextPage =
        currentPageRef.current + 1 >= totalPages ? 0 : currentPageRef.current + 1;
      const itemWidth = container.clientWidth / itemsPerPage;

      container.scrollTo({
        left: itemWidth * itemsPerPage * nextPage,
        behavior: "smooth",
      });

      currentPageRef.current = nextPage;
      setCurrentPage(nextPage);
    }, 2000);

    return () => clearInterval(interval);
  }, [itemsPerPage, totalPages]);

  const handleDotClick = (index: number) => {
    const container = scrollRef.current;
    if (container) {
      const itemWidth = container.clientWidth / itemsPerPage;
      container.scrollTo({
        left: itemWidth * itemsPerPage * index,
        behavior: "smooth",
      });
      currentPageRef.current = index;
      setCurrentPage(index);
    }
  };

  return (
    <section className="bg-pascalBlue py-10 px-2 sm:px-6 md:px-10 lg:px-16 xl:px-48 w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">What People Say About Us</h2>
        <p className="text-white max-w-3xl mx-auto">
          Discover what our parents, students, and staff are saying.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar"
      >
        {testimonies.map((person, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-4"
            style={{
              width: `${100 / itemsPerPage}%`,
              boxSizing: "border-box",
            }}
          >
            <div className="border-2 rounded-xl shadow-md p-10 flex flex-col items-center text-center h-full transform transition duration-300 hover:scale-105">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-lamaYellow">{person.name}</h3>
              <p className="text-sm text-white mb-3">{person.position}</p>
              <p className="text-white text-sm leading-relaxed italic">
                "{person.testimony}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentPage ? "bg-pascalRed scale-110" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default MainTestimony;
