"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";

const achievements = [
  {
    label: "Graduates",
    value: 565,
    icon: <FaUserGraduate size={50} className="text-yellow-300" />,
  },
  {
    label: "Certified Teachers",
    value: 282,
    icon: <FaChalkboardTeacher size={50} className="text-yellow-300" />,
  },
  {
    label: "Student Campuses",
    value: 6,
    icon: <FaUniversity size={50} className="text-yellow-300" />,
  },
  {
    label: "Students",
    value: 429,
    icon: <FaUsers size={50} className="text-yellow-300" />,
  },
];

const MainAchievement = () => {
  return (
    <section className="bg-pascalBlue py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side */}
        <div className="flex flex-col items-start text-white w-full lg:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">ACHIEVEMENT</h2>
          <p className="mb-6 text-sm sm:text-base leading-relaxed">
            A wonderful serenity has taken possession of my entire soul, like these
            sweet mornings of spring which I enjoy with my whole heart like mine.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg group">
            <Image
              src="/bg1.jpg"
              alt="Achievement"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Right Side - Stats */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-1/2">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105"
            >
              <div className="mb-3">{item.icon}</div>
              <div className="text-3xl font-bold text-white pt-2">
                <CountUp end={item.value} duration={2} />
              </div>
              <hr className="w-full border-t border-white/40 my-4" />
              <p className="text-white font-medium text-sm sm:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainAchievement;
