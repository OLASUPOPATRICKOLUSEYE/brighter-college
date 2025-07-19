"use client";

import MainAbout from "@/components/MainAbout";
import MainAchievement from "@/components/MainAchievement";
import MainCourse from "@/components/MainCourse";
import MainDescription from "@/components/MainDescription";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import MainHero from "@/components/MainHero";
import MainStaff from "@/components/MainStaff";
import MainTestimony from "@/components/MainTestimony";

export default function HomePage() {
  return (
    <>
        <MainHeader />
          <div className="pt-[100px] md:pt-[150px] lg:pt-[100px]">
        <MainHero />
          </div>
        <MainDescription />
        <MainAbout />
        <MainCourse />
        <MainAchievement />
        <MainStaff />
        <MainTestimony />
        <MainFooter />
    </>
  );
}
