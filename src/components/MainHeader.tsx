"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MdEmail, MdCall } from "react-icons/md";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Redirect from "@/components/Redirect";

// Lazy load social icons
const FaFacebookF = dynamic(() => import("react-icons/fa").then(mod => mod.FaFacebookF));
const FaTwitter = dynamic(() => import("react-icons/fa").then(mod => mod.FaTwitter));
const FaGooglePlusG = dynamic(() => import("react-icons/fa").then(mod => mod.FaGooglePlusG));
const FaLinkedinIn = dynamic(() => import("react-icons/fa").then(mod => mod.FaLinkedinIn));
const FaYoutube = dynamic(() => import("react-icons/fa").then(mod => mod.FaYoutube));
const FaPinterestP = dynamic(() => import("react-icons/fa").then(mod => mod.FaPinterestP));
const FaWhatsapp = dynamic(() => import("react-icons/fa").then(mod => mod.FaWhatsapp));

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
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollUp(currentY < lastScrollY || currentY < 20);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLoginClick = () => {
    setIsLoggingIn(true);
  };

  if (isLoggingIn) {
    return <Redirect to="/sign-in" message="Redirecting to Login..." delay={1500} />;
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 font-sans transition-transform duration-300 ${scrollUp ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Top Bar */}
      <div className="bg-pascalBlue text-white text-xs sm:text-sm">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-pascalRed px-3 py-2 font-semibold whitespace-nowrap">LATEST NEWS</div>
          <div className="overflow-hidden whitespace-nowrap flex-1 ml-4">
            <div className="inline-block animate-marquee text-white font-medium px-2 py-2">
              National Level Workshop for Science Teachers Teaching in Class X to XII
            </div>
          </div>
        </div>
      </div>

      {/* Email + Social Icons */}
      <div className="bg-pascalRed text-white text-xs sm:text-sm py-2">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2 text-[15px]">
            <MdEmail />
            <a href="mailto:brightercollege@gmail.com" className="hover:underline text-sm sm:text-base">
              brightercollege@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <span className="font-semibold">Follow Us:</span>
            {[FaWhatsapp, FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaYoutube, FaPinterestP].map((Icon, i) => (
              <Icon key={i} className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
            ))}
          </div>
        </div>
      </div>

      {/* Logo + Call + Login */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/images.png" alt="logo" width={70} height={70} className="w-16 sm:w-20 md:w-[90px] h-auto" priority />
            <h1 className="text-xl sm:text-2xl font-bold text-[#7a1f1f] tracking-wide">Brighter College</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#7a1f1f]">
              <MdCall className="text-2xl" />
              <div>
                <p className="font-semibold text-sm">Call Us</p>
                <p className="text-pink-600 font-bold text-base">89562423934</p>
              </div>
            </div>
            <button
              onClick={handleLoginClick}
              className="bg-pascalRed hover:bg-pascalBlue text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition"
            >
              Login
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden text-2xl text-white bg-pascalRed py-2 px-3 rounded-md"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Nav Bar - Desktop */}
      <nav className="bg-white shadow relative z-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <ul className="hidden xl:flex justify-center text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                {item.name === "Academics" ? (
                  <>
                    <button
                      className="px-6 py-5 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowAcademicDropdown(!showAcademicDropdown)}
                    >
                      {item.name}
                    </button>
                    {showAcademicDropdown && (
                      <ul className="absolute top-full left-0 w-64 bg-white shadow-md z-50">
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
                    )}
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
            <div className="block xl:hidden bg-white h-[calc(100dvh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
              <ul className="flex flex-col py-4 space-y-2">
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
                    onClick={handleLoginClick}
                    className="block w-full mt-2 bg-black text-white px-4 py-2 rounded-full text-center shadow"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
