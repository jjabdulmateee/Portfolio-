"use client";

import { useSearchParams } from "next/navigation";
import { Hero } from "./Hero";
import { ProjectGrid } from "./ProjectGrid";
import { AchievementsSection } from "./AchievementsSection";

export function HomeView() {
  const searchParams = useSearchParams();
  const openId = searchParams.get("p");

  return (
    <>
      {!openId && <Hero />}
      <ProjectGrid />
      {!openId && <AchievementsSection />}
    </>
  );
}
