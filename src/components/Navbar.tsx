import React from "react";
import {
  FiSearch,
  FiMessageCircle,
  FiBell,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiMenu,
} from "react-icons/fi";
import { FaWhatsapp, FaTasks, FaDollarSign } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { UserButton, useUser } from "@clerk/nextjs";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useUser();

  const iconClass =
    "rounded-full w-7 h-7 flex items-center justify-center cursor-pointer";

  return (
    <div className="w-full p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        {/* LEFT: Hamburger + Search */}
        <div className="flex items-center gap-4">
          {/* Hamburger - visible on small screens only */}
          <button
            onClick={onMenuClick}
            className="block lg:hidden text-2xl text-gray-700"
          >
            <FiMenu />
          </button>

          {/* SEARCH BAR - hidden on small screens */}
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <FiSearch size={14} />
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] p-2 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* RIGHT: Icons and Profile */}
        <div className="w-full flex justify-center md:justify-end mt-1 md:mt-0">
          {/* PHONE VIEW: GRID FOR ICONS */}
          <div className="flex flex-col items-center  md:hidden">
            <div className="grid grid-cols-8 gap-2">
              <div className={iconClass}><FiMessageCircle size={20} /></div>
              <div className={iconClass}><FaWhatsapp size={20} color="#25D366" /></div>
              <div className={iconClass}><FaTasks size={20} /></div>
              <div className={iconClass}><FiCalendar size={20} /></div>
              <div className={iconClass}><MdLanguage size={20} /></div>
              <div className={iconClass}><FaDollarSign size={20} /></div>
              <div className={iconClass}><FiMessageSquare size={20} /></div>
              <div className="relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                <FiBell size={20} />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  1
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-tight">
                  {user?.fullName || user?.username || "User"}
                </span>
                <span className="text-[10px] text-gray-500">
                  {user?.publicMetadata?.role?.toString().toUpperCase() || "ROLE"}
                </span>
              </div>
              <div className="mt-1">
                <UserButton />
              </div>
            </div>
          </div>

          {/* TABLET AND UP: FLEX ROW */}
          <div className="hidden md:flex items-center gap-4">
            <div className={iconClass}><FiMessageCircle size={20} /></div>
            <div className={iconClass}><FaWhatsapp size={20} color="#25D366" /></div>
            <div className={iconClass}><FaTasks size={20} /></div>
            <div className={iconClass}><FiCalendar size={20} /></div>
            <div className={iconClass}><MdLanguage size={20} /></div>
            <div className={iconClass}><FaDollarSign size={20} /></div>
            <div className={iconClass}><FiMessageSquare size={20} /></div>
            <div className="relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
              <FiBell size={20} />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center">
                1
              </div>
            </div>

            <div className="hidden sm:flex flex-col pl-3">
              <span className="leading-3 text-xs font-medium">
                {user?.fullName || user?.username || "User"}
              </span>
              <span className="text-[10px] text-gray-500 text-right">
                {user?.publicMetadata?.role?.toString().toUpperCase() || "ROLE"}
              </span>
            </div>

            <div className="bg-gray-300 rounded-full w-9 h-9 flex items-center justify-center">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
