"use client";
import React from "react";
import Image from "next/image";

const AboutUsDes = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            Who We Are
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 text-justify">
            Pascal College Residential School is a beacon of academic excellence and character development. 
            Our mission is to nurture inquisitive minds and foster a sense of integrity, responsibility, and confidence in our students.
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            What We Do
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
            We provide a comprehensive educational experience combining rigorous academics with vibrant co-curricular opportunities. 
            From modern classrooms and certified teachers to sports, culture, and environmental awareness, we equip students to thrive in every aspect of life.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full">
          <Image
            src="/bg3.jpg"
            alt="Students of Brighter College"
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsDes;
