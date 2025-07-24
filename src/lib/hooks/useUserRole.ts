// lib/hooks/useUserRole.ts
"use client";

import { useUser } from "@clerk/nextjs";

export const useUserRole = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "user";

  const isAdmin = role === "admin";
  const isTeacher = role === "teacher";
  const isAccountant = role === "accountant";
  const isReceptionist = role === "receptionist";
  const isLibrarian = role === "librarian";
  const isParent = role === "parent";
  const isStudent = role === "student";

  return {
    user,
    role,
    isAdmin,
    isTeacher,
    isAccountant,
    isReceptionist,
    isLibrarian,
    isParent,
    isStudent,
  };
};
