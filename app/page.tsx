import { Suspense } from "react";
import { WorkstationBar } from "@/components/WorkstationBar";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <WorkstationBar />
      <main className="flex-1">
        <Hero />
        {/* ProjectGrid reads ?p=<slug> via useSearchParams → needs a Suspense boundary */}
        <Suspense fallback={<GridSkeleton />}>
          <ProjectGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-xl border border-zinc-800/80 bg-zinc-900/40"
          />
        ))}
      </div>
    </div>
  );
}
