"use client";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import Image from "next/image";

const MainDescription = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Top Features Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center px-4 py-6 bg-pascalRed rounded-md transition-all duration-300 hover:bg-pascalBlue">
          <FaGraduationCap className="text-white text-7xl md:text-8xl mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white underline mb-2">Scholarship Facility</h3>
          <p className="text-white text-sm md:text-base">
            Providing financial assistance to brilliant and deserving students.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center px-4 py-6 bg-pascalRed rounded-md transition-all duration-300 hover:bg-pascalBlue">
          <GiBookshelf className="text-white text-7xl md:text-8xl mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white underline mb-2">Books & Libraries</h3>
          <p className="text-white text-sm md:text-base">
            A well-stocked library with digital access and diverse resources.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center px-4 py-6 bg-pascalRed rounded-md transition-all duration-300 hover:bg-pascalBlue">
          <PiChalkboardTeacherBold className="text-white text-7xl md:text-8xl mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white underline mb-2">Certified Teachers</h3>
          <p className="text-white text-sm md:text-base">
            Skilled and certified professionals dedicated to your success.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center px-4 py-6 bg-pascalRed rounded-md transition-all duration-300 hover:bg-pascalBlue">
          <PiChalkboardTeacherBold className="text-white text-7xl md:text-8xl mb-4" />
          <h3 className="text-base md:text-lg font-semibold text-white underline mb-2">Well Equipped Environments</h3>
          <p className="text-white text-sm md:text-base">
            Modern classrooms and facilities for optimal learning.
          </p>
        </div>
      </div>

      {/* Bottom Description Section */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col lg:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7a1f1f] mb-6">
            Brighter College Residential School
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
            Tmply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.

            Tmply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.

            Tmply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 w-full">
          <Image
            src="/bg1.jpg"
            alt="Brighter College Student"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MainDescription;
