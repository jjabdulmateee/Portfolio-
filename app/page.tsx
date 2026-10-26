import { Suspense } from "react";
import { WorkstationBar } from "@/components/WorkstationBar";
import { HomeView } from "@/components/HomeView";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <WorkstationBar />
      <main className="flex-1">
        {/* HomeView reads ?p=<slug> via useSearchParams → needs a Suspense boundary */}
        <Suspense fallback={<GridSkeleton />}>
          <HomeView />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
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
