import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { WorkstationBar } from "@/components/WorkstationBar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/projects";

export const metadata: Metadata = { title: "/about — MD" };

export default function AboutPage() {
  return (
    <>
      <WorkstationBar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6">
        <h1 className="font-mono text-sm text-zinc-400">
          <span className="text-emerald-400">❯</span> cat ~/about.md
        </h1>

        <article className="mt-6 space-y-5 text-[15px] leading-relaxed text-zinc-300">
          <p className="text-xl font-medium tracking-tight text-zinc-50">
            I build and ship complete products: mobile apps, web platforms, and AI
            tooling, from first architecture sketch to tested release.
          </p>
          <p>
            The five builds on this site span Flutter/Firebase mobile scheduling,
            a multi-tenant admissions platform shipped inside a buildathon
            window, an explainable AI authenticity detector, a browser-only
            dictation engine, and a systems spec for an EV battery-swap network.
          </p>
          <p>
            What ties them together is a bias toward working software: real
            data models, real auth boundaries, and builds that run on real
            devices. {site.tagline2}
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {Object.entries(site.links).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 font-mono text-xs capitalize text-zinc-200 transition-colors hover:border-blue-500/50 hover:text-blue-300"
            >
              {label}
              <ArrowUpRight className="size-3.5" />
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
