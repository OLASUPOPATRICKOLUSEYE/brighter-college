// app/(public)/layout.tsx
"use client";

import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

export default function PublicLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <MainHeader />
      <main className="">{children}</main>
      <MainFooter />
    </>
  );
}