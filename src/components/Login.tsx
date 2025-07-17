"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-full max-w-3xl mt-20 mx-4 p-6 rounded-xl shadow-xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Logo and Title */}
            <div className="flex flex-col items-center gap-3 text-center justify-center">
              <Image src="/profile.png" alt="logo" width={80} height={80} />
              <div className="text-xl font-bold text-center text-pascalBlue">
                {showForgotPassword ? "Forgot Password" : "Welcome, Login"}
              </div>
            </div>

            <hr className="w-full my-10 bg-pascalRed h-1" />

            {showForgotPassword ? (
              // 👉 Forgot Password Form
              <form className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-semibold text-pascalRed mb-1">
                    Enter Your Email <span className="text-pascalRed">*</span>
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-pascalBlue hover:underline text-sm"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    className="bg-pascalRed hover:bg-pascalBlue text-white font-semibold px-5 py-3 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              // 👉 Login Form
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-pascalRed mb-1">
                    Email ID <span className="text-pascalRed">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="olasupo@gmail.com"
                    className="w-full px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-pascalRed mb-1">
                    Password <span className="text-pascalRed">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    defaultValue="mypassword"
                    className="w-full px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
                    required
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <button
                    type="button"
                    className="text-pascalBlue hover:underline"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password
                  </button>
                  <button
                    type="submit"
                    className="bg-pascalRed hover:bg-pascalBlue text-white font-semibold px-5 py-3 rounded-md"
                  >
                    Login
                  </button>
                </div>
              </form>
            )}

            <hr className="w-full my-10 bg-pascalRed h-1" />

            {!showForgotPassword && (
              <>
                {/* Login Type Switch */}
                <div className="flex flex-row gap-3 text-sm font-semibold text-center justify-between">
                  <button
                    type="button"
                    className="text-pascalRed hover:underline"
                  >
                    Admin/Teacher/Librarian/Accountant/Receptionist Login
                  </button>
                  <button
                    type="button"
                    className="text-pascalBlue hover:underline"
                  >
                    Student/Parent Login
                  </button>
                </div>

                {/* Footer Note */}
                <div className="flex justify-center gap-5 text-center text-lamaGrayLight pt-4">
                  <div className="p-3 w-10 h-10 text-center justify-center items-center bg-pascalRed rounded-full text-white hover:bg-pascalBlue hover:text-white transition">
                    <FaArrowUp className="text-lg text-center justify-center items-center" />
                  </div>
                  ....................Kindly login with your assigned login details....................
                  <div className="p-3 w-10 h-10 text-center justify-center items-center bg-pascalRed rounded-full text-white hover:bg-pascalBlue hover:text-white transition">
                    <FaArrowUp className="text-lg text-center justify-center items-center" />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
