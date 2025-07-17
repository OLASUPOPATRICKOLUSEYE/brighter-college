"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { FaUserGraduate, FaChalkboardTeacher, FaUniversity, FaUsers } from "react-icons/fa";

const achievements = [
  {
    label: "Graduates",
    value: 565,
    icon: <FaUserGraduate size={60} className="text-yellow-300" />,
  },
  {
    label: "Certified Teachers",
    value: 282,
    icon: <FaChalkboardTeacher size={60} className="text-yellow-300" />,
  },
  {
    label: "Student Campuses",
    value: 6,
    icon: <FaUniversity size={60} className="text-yellow-300" />,
  },
  {
    label: "Students",
    value: 429,
    icon: <FaUsers size={60} className="text-yellow-300" />,
  },
];

const MainAchievement = () => {
  return (
    <section className="bg-pascalBlue py-10 px-2 sm:px-6 md:px-10 lg:px-16 xl:px-48 w-full">
      <div className=" flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Side - Text & Image */}
        <div className="flex flex-col items-start text-white w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">ACHIEVEMENT</h2>
          <p className="mb-6 text-sm leading-relaxed">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy
            with my whole heart like mine.
          </p>

          <div className="relative w-full h-80 sm:h-[400px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src="/bg1.jpg"
              alt="Achievement"
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>

        {/* Right Side - Achievement Stats */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 lg:w-1/2">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="w-full min-h-[300px] border-2 rounded-xl shadow-md px-6 py-5 flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105"
            >
              <div className="mb-3">{item.icon}</div>
              <div className="text-4xl font-extrabold text-white pt-5 transition">
                <CountUp end={item.value} duration={2} />
              </div>
              <hr className="w-full border-t-2 border-white my-5" />
              <p className="text-base font-semibold text-white transition">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainAchievement;
