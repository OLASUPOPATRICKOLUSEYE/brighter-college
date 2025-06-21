
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[16%] p-4 flex flex-col overflow-y-auto">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 mb-4"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Brighter College</span>
        </Link>
        <hr className="w-full"/>
        <Menu />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[84%] bg-[#F7F8FA] flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}