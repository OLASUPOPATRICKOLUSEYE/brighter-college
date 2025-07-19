"use client";
import React from "react";
import Image from "next/image";

const Facilities = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full space-y-10">
      
      {/* Overall Summary Section */}
      <div className="mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
          Outreach, Exposure & International Exchange Program
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Our international outreach programs provide students with the opportunity to explore, learn, and grow through cultural immersion and academic partnerships.           With exchange programs and foreign collaborations, students gain exposure beyond traditional classrooms—developing global perspectives and lifelong learning habits.
        </p>
      </div>

      {/* Bus Transportation */}
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            Bus Transportation
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/bg3.jpg"
            alt="Bus Transportation"
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* AC Smart Classrooms */}
      <div className="mx-auto flex flex-col lg:flex-row-reverse items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            AC Smart Classrooms
          </h2>
          <ul className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 list-disc list-inside text-justify space-y-2">
            <li>Visual learning, animated multimedia lessons</li>
            <li>Quick and immersive learning</li>
            <li>Progressive improvement in core student learning</li>
            <li>High Overall School performance</li>
            <li>Student assessment and evaluation</li>
            <li>Report cards</li>
          </ul>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/bg2.jpg"
            alt="Smart Classroom"
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Laboratories */}
      <div className="mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            Laboratories
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Its been the industrys standard since the 1500s, providing hands-on experiments and real-world scientific engagement.
          </p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
            Our well-equipped labs include Physics, Chemistry, Biology, and Computer Science. Safety protocols are strictly followed while ensuring students gain practical knowledge alongside theoretical learning.
          </p>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/bg1.jpg"
            alt="Laboratories"
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Library */}
      <div className="mx-auto flex flex-col lg:flex-row-reverse items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
            Library
          </h2>
          <ul className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 list-disc list-inside text-justify space-y-2">
            <li>Thousands of academic and fictional titles</li>
            <li>Quiet, well-lit reading environment</li>
            <li>Online catalog and digital borrowing options</li>
            <li>Helpful staff and guided research support</li>
          </ul>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. The library remains a cornerstone of our academic offerings, promoting independent learning and literacy.
          </p>
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/bg4.jpg"
            alt="Library"
            width={600}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Facilities;
