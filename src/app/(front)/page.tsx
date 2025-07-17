"use client";
import Hero from "@/components/Hero";
import MainAbout from "@/components/MainAbout";
import MainAchievement from "@/components/MainAchievement";
import MainCourse from "@/components/MainCourse";
import MainDescription from "@/components/MainDescription";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import MainStaff from "@/components/MainStaff";
import MainTestimony from "@/components/MainTestimony";

export default function HomePage() {
  return (
    <>
      <div className="pt-[150px] md:pt-[180px] lg:pt-[250px]">
        <Hero />
      </div>
        <MainDescription />
        <MainAbout />
        <MainCourse />
        <MainAchievement />
        <MainStaff />
        <MainTestimony />
    </>
  );
}
