"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Redirect user based on their role
  useEffect(() => {
    if (isSignedIn && user) {
      setIsRedirecting(true);
      const role = user.publicMetadata.role;
      if (role) {
        setTimeout(() => {
          router.push(`/${role}`);
        }, 1000);
      }
    }
  }, [isSignedIn, user, router]);

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] px-4 py-8">
        <div className="bg-white rounded-xl p-10 shadow-xl animate-slideIn text-center">
          <p className="text-xl font-semibold text-pascalBlue mb-2">Redirecting...</p>
          <p className="text-gray-600">You are being redirected to your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] px-4 py-8 animate-slideIn">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-xl shadow-2xl relative overflow-y-auto max-h-[90vh]"
      >
        <SignIn.Root>
          <SignIn.Step name="start" className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <Image src="/images.png" alt="logo" width={80} height={80} />
              <h1 className="text-2xl font-bold text-pascalBlue">Welcome, Login</h1>
              <hr className="w-full my-4 bg-pascalRed h-[3px] rounded" />
            </div>
            <Clerk.GlobalError className="text-sm text-red-500 text-center" />
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-semibold text-pascalRed">
                Username <span className="text-pascalRed">*</span>
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                placeholder="John Doe"
                className="px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-semibold text-pascalRed">
                Password <span className="text-pascalRed">*</span>
              </Clerk.Label>
              <div className="relative">
                <Clerk.Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-pascalRed hover:text-pascalBlue"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-pascalBlue hover:underline"
                onClick={() => alert("Password recovery coming soon.")}
              >
                Forgot Password?
              </button>
            </div>
            <SignIn.Action
              submit
              className="bg-pascalRed hover:bg-pascalBlue transition text-white font-semibold px-5 py-3 rounded-md w-full text-center"
            >
              Login
            </SignIn.Action>
            <hr className="w-full mt-4 bg-pascalRed h-[3px] rounded" />
            <div className="text-center text-sm text-lamaGrayLight leading-relaxed space-y-3">
              <p>
                Kindly login with your assigned login details. If you forgot your password,
                contact us via the{" "}
                <span className="text-pascalBlue font-medium underline">Contact Us</span> section.
              </p>
              <button
                onClick={onClose}
                className="inline-block text-pascalRed hover:text-pascalBlue font-semibold underline transition"
              >
                ← Back to Home Page
              </button>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginModal;
