import React from "react";
import { 
  FiSearch, 
  FiMessageCircle, 
  FiBell, 
  FiUser, 
  FiCalendar, 
  FiMessageSquare 
} from "react-icons/fi";
import { FaWhatsapp, FaTasks, FaDollarSign } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <FiSearch size={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* ICON AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FiMessageCircle size={20} />
        </div>

        {/* WhatsApp Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FaWhatsapp size={20} color="#25D366" />
        </div>

        {/* Task Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FaTasks size={20} />
        </div>

        {/* Calendar Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FiCalendar size={20} />
        </div>

        {/* Language Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <MdLanguage size={20} />
        </div>

        {/* Currency Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FaDollarSign size={20} />
        </div>

        {/* Chat Icon */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FiMessageSquare size={20} />
        </div>

        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <FiBell size={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 items-center flex justify-center bg-purple-500 rounded-full text-xs text-white">
            1
          </div>
        </div>

        <div className="flex flex-col">
          <span className="leading-3 text-xs font-medium">Zach Pascal</span>
          <span className="text-[10px] text-gray-500 text-right">Admin</span>
        </div>

        <div className="bg-gray-300 rounded-full w-9 h-9 flex items-center justify-center">
          <FiUser size={28} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
