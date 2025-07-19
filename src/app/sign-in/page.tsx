"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      setIsRedirecting(true); // show loader
      const role = user.publicMetadata.role;
      if (role) {
        setTimeout(() => {
          router.push(`/${role}`);
        }, 1500); // simulate loading delay (optional)
      }
    }
  }, [isSignedIn, user, router]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-pascalBlue">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-pascalRed border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-semibold">Logging you in, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-10 px-4">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white w-full max-w-2xl p-6 sm:p-10 rounded-xl shadow-2xl flex flex-col gap-5"
        >
          {/* Logo & Title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
            <h1 className="text-2xl font-bold text-pascalBlue">
              Welcome, Login
            </h1>
          </div>

          <hr className="w-full my-4 bg-pascalRed h-[3px] rounded" />

          <Clerk.GlobalError className="text-sm text-red-500 text-center" />

          {/* Username Field */}
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

          {/* Password Field */}
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm font-semibold text-pascalRed">
              Password <span className="text-pascalRed">*</span>
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              placeholder="••••••••"
              className="px-4 py-2 border border-[#7a1f1f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7a1f1f]"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-pascalBlue hover:underline"
              onClick={() =>
                alert("Password recovery coming soon or use Contact Us.")
              }
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <SignIn.Action
            submit
            className="bg-pascalRed hover:bg-pascalBlue transition text-white font-semibold px-5 py-3 rounded-md w-full text-center"
          >
            Login
          </SignIn.Action>

          {/* Footer */}
          <hr className="w-full my-4 bg-pascalRed h-[3px] rounded" />
          <div className="text-center text-sm text-lamaGrayLight leading-relaxed space-y-3">
            <p>
              Kindly login with your assigned login details. In case you forgot
              your password, kindly reach out to us via the{" "}
              <span className="text-pascalBlue font-medium underline">
                Contact Us
              </span>{" "}
              section on our website.
            </p>
            <Link
              href="/"
              className="inline-block text-pascalRed hover:text-pascalBlue font-semibold underline transition"
            >
              ← Back to Home Page
            </Link>
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
