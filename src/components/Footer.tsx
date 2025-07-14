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

const Footer = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white">
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
      <div className="flex items-center gap-4 justify-end w-full">

      <div className="flex flex-col pl-4">
          <span className="text-xs font-medium text-right">@2025:</span>
          <span className="text-sm text-gray-500 text-right">Brighter College Ibadan</span>
        </div>
      
        <div className="flex flex-col pl-4">
          <span className="text-xs font-medium text-right">Develop By:</span>
          <span className="text-sm text-gray-500 text-right">ZachPascal Global Tech</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
