"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const [openParent, setOpenParent] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenParent(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleParentClick = (title: string) => {
    setOpenParent((prev) => (prev === title ? null : title));
  };

  return (
    <div className="mt-10 text-sm" ref={menuRef}>
      {menuItems.map((group) => (
        <div className="flex flex-col gap-2" key={group.title}>
          <button
            type="button"
            className={`hidden lg:flex text-gray-400 font-light px-2 py-4 rounded-md transition-colors
              ${openParent === group.title ? "bg-lamaSkyLight text-gray-800" : "hover:bg-lamaSkyLight"}
            `}
            onClick={() => handleParentClick(group.title)}
          >
          
            {group.title}
          </button>

          <AnimatePresence>
            {openParent === group.title && (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1"
              >
                {group.items.map(
                  (item) =>
                    item.visible.includes(role) && (
                      <Link
                        href={item.href}
                        key={item.label}
                        className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-4 md:px-2 rounded-md hover:bg-lamaSkyLight"
                      >
                        <Image src={item.icon} alt="" width={20} height={20} />
                        <span className="hidden lg:block">{item.label}</span>
                      </Link>
                    )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Menu;
