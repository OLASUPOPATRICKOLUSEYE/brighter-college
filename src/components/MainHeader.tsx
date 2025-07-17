"use client";

import React, { useEffect, useState } from "react";
import {
  FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn,
  FaYoutube, FaPinterestP, FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdCall } from "react-icons/md";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./Login";


const academicDropdownItems = [
  { name: "Facilities", href: "/academics/facilities" },
  { name: "Annual Sports Day", href: "/academics/sports-day" },
  { name: "Course", href: "/academics/course" },
  { name: "School Uniform", href: "/academics/uniform" },
  { name: "Principal Message", href: "/academics/principal-message" },
  { name: "School Management", href: "/academics/management" },
  { name: "Know Us", href: "/academics/know-us" },
  { name: "Approach", href: "/academics/approach" },
  { name: "Pre Primary", href: "/academics/pre-primary" },
  { name: "Teacher", href: "/academics/teachers" },
  { name: "Houses & Mentoring", href: "/academics/houses" },
  { name: "Student Council", href: "/academics/student-council" },
  { name: "Career Counselling", href: "/academics/counselling" },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Online Course", href: "/online-course" },
  { name: "Online Admission", href: "/online-admission" },
  { name: "Cbse Exam Result", href: "/cbse-result" },
  { name: "Exam Result", href: "/exam-result" },
  { name: "Annual Calendar", href: "/calendar" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "#" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const MainHeader = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAcademicDropdown, setShowAcademicDropdown] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isLoginOpen ? "hidden" : "auto";
  }, [isLoginOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-sans bg-white shadow">
      {/* Top Bar */}
      <div className="bg-pascalBlue text-white text-xs sm:text-sm">
        <div className="flex justify-between max-w-[1440px] mx-auto px-0 sm:px-10 lg:px-12">
          <div className="bg-pascalRed p-4 font-semibold">LATEST NEWS</div>
          <div className="flex flex-row gap-1 sm:gap-3 items-center">
            <div className="text-yellow-300 font-semibold">07 July 2025</div>
            <div className="text-white sm:whitespace-nowrap pr-5">
              National Level Workshop for Science Teachers Teaching in Class X to XII
            </div>
          </div>
        </div>
      </div>

      {/* Email + Social Icons */}
      <div className="bg-pascalRed text-white text-xs sm:text-lg py-3">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-10 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-1">
            <MdEmail className="mt-1" />
            <a href="mailto:brightercollege@gmail.com" className="hover:underline text-lg">
              brightercollege@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">Follow Us:</span>
            {[FaWhatsapp, FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaYoutube, FaPinterestP].map((Icon, i) => (
              <Icon key={i} className="h-5 w-5" />
            ))}
          </div>
        </div>
      </div>

      {/* Logo + Call + Login */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/images.png" alt="logo" width={90} height={90} />
            <h1 className="text-2xl font-bold text-[#7a1f1f] tracking-wide">Brighter College</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#7a1f1f]">
              <MdCall className="text-2xl" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-pink-600 font-bold">89562423934</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-pascalRed hover:bg-pascalBlue text-white px-10 py-4 rounded-full shadow-md hover:scale-105 transition"
            >
              Login
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-white bg-pascalRed py-2 px-3 rounded-md"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow relative z-20">
        <div className="max-w-[1540px] mx-auto sm:px-16">
          <ul className="hidden md:flex justify-center text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.name === "Academics" ? (
                  <>
                    <button className="px-6 py-5 text-gray-700 hover:bg-gray-100">
                      {item.name}
                    </button>
                    <ul className="absolute top-full left-0 w-64 bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50">
                      {academicDropdownItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={`block px-4 py-2 hover:bg-pascalRed hover:text-white ${pathname === subItem.href ? "bg-pascalRed text-white" : ""}`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-6 py-5 ${pathname === item.href ? "bg-pascalRed text-white" : "hover:bg-gray-100 text-gray-700"}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Nav */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col py-4 space-y-2 bg-white">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.name === "Academics" ? (
                    <>
                      <button
                        onClick={() => setShowAcademicDropdown(!showAcademicDropdown)}
                        className="w-full text-left py-2 px-4 hover:bg-gray-100"
                      >
                        {item.name}
                      </button>
                      {showAcademicDropdown && (
                        <ul className="pl-4 space-y-1">
                          {academicDropdownItems.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className={`block py-2 px-2 hover:bg-pascalRed hover:text-white ${pathname === subItem.href ? "bg-pascalRed text-white" : ""}`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-2 px-4 ${pathname === item.href ? "bg-pascalRed text-white" : "hover:bg-gray-100"}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full mt-2 bg-black text-white px-4 py-2 rounded-full shadow"
                >
                  Login
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};

export default MainHeader;
