// lib/hooks/useUserRole.ts
"use client";

import { useUser } from "@clerk/nextjs";

export const useUserRole = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || "user";
  const isAdmin = role === "admin";

  return {
    user,
    role,
    isAdmin,
  };
};
