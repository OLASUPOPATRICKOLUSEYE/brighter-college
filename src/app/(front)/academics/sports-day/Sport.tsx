"use client";
import React from "react";
import Image from "next/image";

// Sample images array
const sportImages = [
  { src: "/about1.jpg", alt: "Running Race" },
  { src: "/about2.jpg", alt: "Team Parade" },
  { src: "/about3.jpg", alt: "Long Jump" },
  { src: "/gallery3.jpg", alt: "Tug of War" },
  { src: "/gallery2.jpg", alt: "March Past" },
];

const Sport = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full space-y-10">
      {/* Header */}
      <div className="mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-6">
          Annual Sports Day
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Sports Day encourages active participation in sports, promoting physical health and combating issues like obesity and sedentary habits. Involvement in team sports teaches students teamwork, cooperation, and unity, skills transferrable to academics and future careers. On this day, students participate in various sporting activities such as running, jumping, throwing, and team games. The day begins with a parade, where all the students march in their respective houses or classes, displaying their house colors and flags.
        </p>
      </div>

      {/* Image Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sportImages.map((image, index) => (
          <div key={index} className="w-full overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              layout="responsive"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sport;
