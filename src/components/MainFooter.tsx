"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const MainFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-white w-full">
      <div className="mx-auto px-5 lg:px-40 py-10">
        <div className="grid md:grid-cols-2 gap-8 border-b pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
            <Image src="/images.png" alt="School Logo" width={90} height={90} />
            <h2 className="text-2xl font-bold text-[#7a1f1f]">Brighter College</h2>
          </div>

          <div>
            <h3 className="text-lg text-center font-semibold text-gray-800">Keep up to date</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Join our newsletter for regular updates. No spam ever.
            </p>
            <form
              className="flex flex-col sm:flex-row items-center gap-3"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pascalRed"
              />
              <button
                type="submit"
                className="bg-pascalRed hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-sm">
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Links</h2>
            <div className="grid gap-x-10 gap-y-2 text-gray-600 text-sm">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">Online Course</a>
              <a href="#" className="hover:underline">Online Admission</a>
              <a href="#" className="hover:underline">Cbse Exam Result</a>
              <a href="#" className="hover:underline">Exam Result</a>
              <a href="#" className="hover:underline">Annual Calendar</a>
              <a href="#" className="hover:underline">About Us</a>
              <a href="#" className="hover:underline">Academics</a>
              <a href="#" className="hover:underline">Facilities</a>
              <a href="#" className="hover:underline">Annual Sports Day</a>
              <a href="#" className="hover:underline">Course</a>
              <a href="#" className="hover:underline">School Uniform</a>
              <a href="#" className="hover:underline">Principal Message</a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Other Links</h2>
            <div className="grid gap-x-10 gap-y-2 text-gray-600 text-sm">
              <a href="#" className="hover:underline">School Management</a>
              <a href="#" className="hover:underline">Know Us</a>
              <a href="#" className="hover:underline">Approach</a>
              <a href="#" className="hover:underline">Pre Primary</a>
              <a href="#" className="hover:underline">Teacher</a>
              <a href="#" className="hover:underline">Houses & Mentoring</a>
              <a href="#" className="hover:underline">Student Council</a>
              <a href="#" className="hover:underline">Career Counselling</a>
              <a href="#" className="hover:underline">Gallery</a>
              <a href="#" className="hover:underline">Events</a>
              <a href="#" className="hover:underline">News</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Help Center</h2>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center gap-2"><FaFacebookF className="text-blue-600" /> Facebook</li>
              <li className="flex items-center gap-2"><FaTwitter className="text-blue-400" /> Twitter</li>
              <li className="flex items-center gap-2"><FaInstagram className="text-pink-500" /> Instagram</li>
              <li className="flex items-center gap-2"><FaLinkedinIn className="text-blue-700" /> LinkedIn</li>
              <li className="flex items-center gap-2"><FaGithub className="text-gray-800" /> GitHub</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
            <ul className="text-gray-600 space-y-3">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Licensing</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between bg-pascalRed rounded-md items-center border-t px-5 py-5 text-sm text-white">
          <span className="mb-4 md:mb-0 text-center">
            © {new Date().getFullYear()} <a href="#" className="font-semibold hover:underline">Brighter College™</a>. All Rights Reserved.
          </span>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white rounded-full text-gray-700 hover:bg-pascalBlue hover:text-white transition"><FaFacebookF className="text-lg" /></a>
            <a href="#" className="p-2 bg-white rounded-full text-gray-700 hover:bg-pascalBlue hover:text-white transition"><FaTwitter className="text-lg" /></a>
            <a href="#" className="p-2 bg-white rounded-full text-gray-700 hover:bg-pascalBlue hover:text-white transition"><FaInstagram className="text-lg" /></a>
            <a href="#" className="p-2 bg-white rounded-full text-gray-700 hover:bg-pascalBlue hover:text-white transition"><FaLinkedinIn className="text-lg" /></a>
            <a href="#" className="p-2 bg-white rounded-full text-gray-700 hover:bg-pascalBlue hover:text-white transition"><FaGithub className="text-lg" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
