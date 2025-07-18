"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const staffList = [
  { id: 1, name: "OLASUPO, Patrick O", field: "Chemistry Teacher", image: "/staff1.jpg" },
  { id: 2, name: "ADEBAYO, Grace T", field: "Biology Teacher", image: "/staff2.jpg" },
  { id: 3, name: "AJAYI, David K", field: "English Teacher", image: "/staff3.jpg" },
  { id: 4, name: "FATIMA, Sulaimon M", field: "Physics Teacher", image: "/staff4.jpg" },
  { id: 5, name: "OLUWASEUN, Racheal B", field: "Economics Teacher", image: "/staff5.jpg" },
  { id: 6, name: "IDOWU, Rihanat B", field: "Math Teacher", image: "/staff2.jpg" },
  { id: 7, name: "LAWAL, Idris A", field: "Geography Teacher", image: "/staff3.jpg" },
];

const MainStaff = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const currentPageRef = useRef(0);

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
    setTotalPages(Math.ceil(staffList.length / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      let nextPage = currentPageRef.current + 1;
      if (nextPage >= totalPages) {
        nextPage = 0;
      }

      const itemWidth = container.clientWidth / itemsPerPage;
      container.scrollTo({
        left: itemWidth * itemsPerPage * nextPage,
        behavior: "smooth",
      });

      currentPageRef.current = nextPage;
      setCurrentPage(nextPage);
    }, 3000);

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
    <section className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-2">
          Our Dedicated Staff
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Meet the passionate educators behind our excellence.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar"
      >
        {staffList.map((staff, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-2 sm:px-3 md:px-4"
            style={{
              width: `${100 / itemsPerPage}%`,
              boxSizing: "border-box",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#7a1f1f]">{staff.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{staff.field}</p>
              </div>
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

export default MainStaff;
