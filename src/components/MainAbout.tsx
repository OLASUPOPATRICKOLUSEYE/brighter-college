"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const collapsibles = [
  {
    title: "Scholarship Facility",
    content:
      "We offer scholarship support to deserving students based on merit and financial needs.",
  },
  {
    title: "Book and Libraries",
    content:
      "Our school library is fully stocked with modern academic and inspirational materials.",
  },
  {
    title: "Certified Teachers",
    content:
      "We employ highly qualified and certified teachers with years of experience.",
  },
];

const MainAbout = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* About Us Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-2">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
          Fusce sem dolor, interdum in efficitur at, faucibus nec lorem. Sed nec
          molestie justo.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <Image
            src="/bg2.jpg"
            alt="About Brighter College"
            width={600}
            height={300}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Text + Collapsible */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#7a1f1f] mb-3">
              WELCOME TO Brighter College
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
          </div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {collapsibles.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-pascalRed text-white font-medium text-left text-sm hover:bg-pascalRed/90 transition"
                  >
                    <span>{item.title}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] py-3 px-4" : "grid-rows-[0fr] px-4"
                    } overflow-hidden text-sm sm:text-base text-gray-700`}
                  >
                    <div className="overflow-hidden">
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainAbout;
