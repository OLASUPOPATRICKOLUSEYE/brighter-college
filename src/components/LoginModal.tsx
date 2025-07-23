// components/LoginModal.tsx
"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      onClose(); // Close modal if user is logged in
    }
  }, [isSignedIn, user, onClose]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-2xl p-6 sm:p-10 rounded-xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-pascalRed hover:text-pascalBlue"
        >
          &times;
        </button>

        <SignIn.Root>
          <SignIn.Step name="start" className="flex flex-col gap-5">
            <div className="text-center space-y-3">
              <Image src="/logo.png" alt="logo" width={70} height={70} />
              <h1 className="text-2xl font-bold text-pascalBlue">Welcome, Login</h1>
            </div>

            <Clerk.GlobalError className="text-sm text-red-500 text-center" />

            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-semibold text-pascalRed">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                placeholder="John Doe"
                className="px-4 py-2 border border-pascalRed rounded-md"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-sm font-semibold text-pascalRed">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                placeholder="••••••••"
                className="px-4 py-2 border border-pascalRed rounded-md"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => alert("Password recovery coming soon.")}
                className="text-pascalBlue hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <SignIn.Action
              submit
              className="bg-pascalRed hover:bg-pascalBlue text-white px-5 py-3 rounded-md w-full"
            >
              Login
            </SignIn.Action>

            <div className="text-center mt-4 text-sm text-lamaGrayLight">
              <p>
                In case you forgot your password, contact us via the{" "}
                <span className="text-pascalBlue font-medium underline">Contact Us</span> section.
              </p>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default LoginModal;
