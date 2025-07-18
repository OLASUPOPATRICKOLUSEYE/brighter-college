"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const contactDetails = [
  {
    icon: <FaMapMarkerAlt className="text-pascalRed text-8xl mb-2" />,
    title: "Our Location",
    content: "350 Fifth Avenue, 34th floor New York NY 10118-3299 USA",
  },
  {
    icon: <FaPhoneAlt className="text-pascalRed text-8xl mb-2" />,
    title: "Call Us",
    content: (
      <>
        <div>Email: brightercollege@gmail.com</div>
        <div>Mobile: +91 -89562423934</div>
      </>
    ),
  },
  {
    icon: <FaClock className="text-pascalRed text-8xl mb-2" />,
    title: "Working Hours",
    content: (
      <>
        <div>Mon - Fri: 7am to 5pm</div>
        <div>Sat: 9am to 3pm</div>
      </>
    ),
  },
];

const ContactDes = () => {
  return (
    <section className="bg-white pt-5 pb-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 2xl:px-48 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7a1f1f] mb-4">
          Get In Touch Via The Details Below?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          Tmply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center mb-12">
        {contactDetails.map((detail, idx) => (
          <div key={idx} className="flex flex-col items-center p-6 border rounded-lg shadow-sm">
            {detail.icon}
            <h4 className="text-lg font-semibold text-pascalBlue mb-2">
              {detail.title}
            </h4>
            <p className="text-black text-sm md:text-base">{detail.content}</p>
          </div>
        ))}
      </div>

      {/* Live Map Embed */}
      <div className="w-full h-[400px] border rounded-lg overflow-hidden shadow-md">
        <iframe
          title="Live Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.942511265755!2d-73.99040228459513!3d40.74881707932748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18c7aaaf%3A0x3314d80a0e893d26!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629292968074!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ContactDes;
