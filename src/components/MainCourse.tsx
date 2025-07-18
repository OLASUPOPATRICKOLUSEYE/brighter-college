"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const courseList = [
  {
    id: 1,
    title: "Mathematics",
    category: "Science",
    description: "Deepen your understanding of algebra, calculus, and geometry.",
    image: "/bg1.jpg",
  },
  {
    id: 2,
    title: "Biology",
    category: "Science",
    description: "Explore life from cells to ecosystems and human anatomy.",
    image: "/bg2.jpg",
  },
  {
    id: 3,
    title: "English Language",
    category: "Arts",
    description: "Master grammar, vocabulary, and creative writing skills.",
    image: "/bg3.jpg",
  },
  {
    id: 4,
    title: "Computer Science",
    category: "Technology",
    description: "Learn coding, algorithms, and modern tech concepts.",
    image: "/bg4.jpg",
  },
  {
    id: 5,
    title: "Economics",
    category: "Social Science",
    description: "Understand supply, demand, and global financial systems.",
    image: "/bg1.jpg",
  },
  {
    id: 6,
    title: "Chemistry",
    category: "Science",
    description: "Analyze the elements and chemical reactions in real life.",
    image: "/bg2.jpg",
  },
  {
    id: 7,
    title: "Civic Education",
    category: "Humanities",
    description: "Learn your rights, responsibilities, and governance roles.",
    image: "/bg3.jpg",
  },
];

const MainCourse = () => {
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
    } else if (width < 1440) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4); // Plasma TVs and ultra-wide screens
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(courseList.length / itemsPerPage));
  }, [itemsPerPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      let nextPage = currentPageRef.current + 1;
      if (nextPage >= totalPages) nextPage = 0;

      const itemWidth = container.clientWidth / itemsPerPage;
      container.scrollTo({
        left: itemWidth * itemsPerPage * nextPage,
        behavior: "smooth",
      });

      currentPageRef.current = nextPage;
      setCurrentPage(nextPage);
    }, 4000);

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
    <section className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-3">
          Our Courses
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
          Explore our wide range of academic programs designed for excellence.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar transition-all duration-300"
      >
        {courseList.map((course, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-2 md:px-3"
            style={{
              width: `${100 / itemsPerPage}%`,
              boxSizing: "border-box",
            }}
          >
            <div className="w-full flex flex-col items-center bg-white border rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-t-xl overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="p-4 w-full">
                <p className="text-xs sm:text-sm font-semibold text-pascalRed mb-1">
                  {course.category}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-pascalBlue mb-2">
                  {course.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-justify mb-4">
                  {course.description}
                </p>
                <button className="px-4 py-2 bg-pascalRed text-white rounded-full text-sm hover:bg-pascalBlue transition-all duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Pagination */}
      <div className="flex justify-center mt-8 space-x-3">
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

export default MainCourse;
