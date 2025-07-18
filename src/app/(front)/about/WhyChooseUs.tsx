"use client";
import React from "react";
import {
  FaGraduationCap,
  FaBook,
  FaChalkboardTeacher,
  FaHistory,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    icon: <FaGraduationCap className="text-pascalRed text-8xl mb-4" />,
    title: "Scholarship Facility",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
  {
    icon: <FaChalkboardTeacher className="text-pascalRed text-8xl mb-4" />,
    title: "Skilled Lecturers",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
  {
    icon: <FaBook className="text-pascalRed text-8xl mb-4" />,
    title: "Book Library & Store",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
  {
    icon: <FaHistory className="text-pascalRed text-8xl mb-4" />,
    title: "Our History 2018",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
  {
    icon: <FaUniversity className="text-pascalRed text-8xl mb-4" />,
    title: "Over 100 Faculties",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
  {
    icon: <FaUsers className="text-pascalRed text-8xl mb-4" />,
    title: "We Have 15,000 Students",
    description:
      "Dorem Ipsum has been the industrys standard dummy text ever since the en an unknown printer galley dear.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-4">
          Why Choose Our Institution?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Tmply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industrys standard dummy text ever since the 1500s, when
          an unknown printer took.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 md:gap-8 text-center">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center border-2 px-6 py-8 rounded-lg transition-all duration-300 h-full"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold text-pascalBlue underline mb-2">
              {feature.title}
            </h3>
            <p className="text-black text-sm md:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
