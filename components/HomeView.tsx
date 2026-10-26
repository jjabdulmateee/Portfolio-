"use client";

import { useSearchParams } from "next/navigation";
import { Hero } from "./Hero";
import { ProjectGrid } from "./ProjectGrid";

export function HomeView() {
  const searchParams = useSearchParams();
  const openId = searchParams.get("p");

  return (
    <>
      {!openId && <Hero />}
      <ProjectGrid />
    </>
  );
}
