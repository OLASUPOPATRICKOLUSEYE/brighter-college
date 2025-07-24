"use client";

import MainAbout from "@/components/MainAbout";
import MainAchievement from "@/components/MainAchievement";
import MainCourse from "@/components/MainCourse";
import MainDescription from "@/components/MainDescription";
import MainHero from "@/components/MainHero";
import MainStaff from "@/components/MainStaff";
import MainTestimony from "@/components/MainTestimony";

export default function HomePage() {
  return (
    <div>
        <MainHero />
        <MainDescription />
        <MainAbout />
        <MainCourse />
        <MainAchievement />
        <MainStaff />
        <MainTestimony />        
    </div>
  );
}
