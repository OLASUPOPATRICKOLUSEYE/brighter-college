"use client";
import Hero from "@/components/Hero";
import MainAbout from "@/app/front/MainAbout";
import MainAchievement from "@/app/front/MainAchievement";
import MainCourse from "@/app/front/MainCourse";
import MainDescription from "@/app/front/MainDescription";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import MainHero from "@/components/MainHero";
import MainStaff from "@/app/front/MainStaff";
import MainTestimony from "@/app/front/MainTestimony";

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
