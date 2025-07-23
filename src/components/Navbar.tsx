"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useUser();

  return (
    <div className="bg-white px-4 py-3 overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* LEFT: Hamburger + Search */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="block lg:hidden text-2xl text-gray-700"
          >
            <FiMenu />
          </button>

          {/* SEARCH BAR */}
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" alt="" width={14} height={14} />
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] p-2 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* RIGHT: Icons + User */}
        <div className="flex items-center gap-4 flex-wrap justify-end ml-auto">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/message.png" alt="" width={20} height={20} />
          </div>

          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <Image src="/announcement.png" alt="" width={20} height={20} />
            <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px]">
              1
            </div>
          </div>

          {/* User Info */}
          <div className="hidden sm:flex flex-col text-right leading-tight max-w-[100px] truncate">
            <span className="text-sm font-medium truncate">
              {user?.fullName || user?.username || "User"}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {user?.publicMetadata?.role as string}
            </span>
          </div>

          {/* Clerk Profile */}
          <div className="min-w-[36px]">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
