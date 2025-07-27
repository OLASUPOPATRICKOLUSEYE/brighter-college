"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="h-screen flex relative">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block z-20 w-[16%] p-4 flex-col bg-white border-r overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 mb-4">
          <Image src="/images.png" alt="logo" width={50} height={50} />
          <span className="hidden lg:block font-bold text-gray-800">Pascal College</span>
        </Link>
        <hr className="w-full mb-2 border-gray-300" />
        <Menu />
      </div>

      {/* Sidebar overlay for small screens */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <Image src="/images.png" alt="logo" width={50} height={50} />
              <span className=" lg:block font-bold text-gray-800 pr-3">Brighter College</span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-xl font-bold"><IoClose /></button>
            </div>
            <hr className="mb-2 border-gray-300" />
            <Menu />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-[#F7F8FA] overflow-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
        {/* Navbar stays at the top */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        {/* Content takes remaining height and is scrollable */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
          {children}
        </div>
        {/* Footer stays at the bottom */}
        <Footer />
      </div>
    </div>
  );
}
