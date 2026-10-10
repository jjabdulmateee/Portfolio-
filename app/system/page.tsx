import type { Metadata } from "next";
import { WorkstationBar } from "@/components/WorkstationBar";
import { Footer } from "@/components/Footer";
import { NowWidget } from "@/components/NowWidget";
import { StackTag } from "@/components/ui/StackTag";
import { projects, site } from "@/data/projects";

export const metadata: Metadata = { title: "/system — MD" };

export default function SystemPage() {
  const allStack = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();

  return (
    <>
      <WorkstationBar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
        <h1 className="font-mono text-sm text-zinc-400">
          <span className="text-emerald-400">❯</span> cat /system/status
        </h1>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          Live workstation state: what&apos;s being built right now, and the full
          toolchain across every project.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <NowWidget />

          <div className="glass rounded-xl p-5">
            <h2 className="font-mono text-xs text-zinc-500">
              <span className="text-emerald-400">❯</span> toolchain ({allStack.length})
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {allStack.map((t) => (
                <StackTag key={t}>{t}</StackTag>
              ))}
            </div>

            <h2 className="mt-6 font-mono text-xs text-zinc-500">
              <span className="text-emerald-400">❯</span> build_log
            </h2>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {projects.map((p) => (
                <li key={p.id} className="flex gap-3 text-zinc-400">
                  <span className="text-zinc-600">{p.year}</span>
                  <span className="text-zinc-200">{p.name}</span>
                  <span className="ml-auto text-blue-400">{p.status}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[11px] text-zinc-600">
              handle: {site.handle} · tz: {site.now.location}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
