import type { Metadata } from "next";
import { ArrowUpRight, Quote, Crosshair, TreePine, Cpu } from "lucide-react";
import { WorkstationBar } from "@/components/WorkstationBar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/projects";

export const metadata: Metadata = { title: "/about — MD" };

/* ───────── section wrapper ───────── */
function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
        <span className="inline-flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-0.5 font-mono text-xs text-blue-400">
          {index}
        </span>
        <h2 className="font-mono text-base font-semibold tracking-wide text-zinc-100 md:text-lg">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ───────── bullet list helper ───────── */
function Bullet({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-zinc-300 md:text-base">
      <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-blue-500/60" />
      <span>
        <span className="font-semibold text-zinc-100">{label}</span>{" "}
        {children}
      </span>
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <WorkstationBar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-14 md:px-12">
        <h1 className="font-mono text-base text-zinc-400 md:text-lg">
          <span className="text-emerald-400">❯</span> cat ~/about.md
        </h1>

        <div className="mt-8 space-y-14">
          {/* ═══════ 01 / PHILOSOPHY & AMBITION ═══════ */}
          <Section index="01" title="PHILOSOPHY & AMBITION">
            {/* Palmer Luckey quote */}
            <blockquote className="relative rounded-lg bg-white px-6 py-5 shadow-lg">
              <Quote className="absolute -top-3 left-4 size-6 text-red-500" />
              <p className="text-[16px] italic leading-relaxed text-red-600 font-medium md:text-[17px]">
                &ldquo;Running a startup and failing looks better on your resume
                than a typical part-time student job in your late teens or early
                20s. At 18–19, you have no family or career to lose, so the only
                real cost is time, and the experience you gain is worth
                it.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs font-semibold text-red-600 md:text-sm">
                — <span className="text-red-600">Palmer Luckey</span>
              </footer>
            </blockquote>

            <p className="text-[16px] leading-relaxed text-zinc-300 md:text-[17px]">
              Every problem I&apos;ve built software for comes directly from
              real, acute friction—issues I have lived through alongside my
              community. But fixing today&apos;s friction is only step one. The
              long-term goal is engineering systems that actively shape the
              future.
            </p>

            {/* Defense tech sub-section */}
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-sm text-zinc-300 md:text-base">
                <Crosshair className="size-4 text-blue-400" />
                <span className="font-semibold text-zinc-100">
                  Current Frontier: Defense Tech &amp; Autonomous Hardware
                </span>
              </div>
              <p className="mb-4 text-[15px] leading-relaxed text-zinc-300 md:text-base">
                My primary technical focus is expanding into defense systems and
                hardware engineering. I am diving deep into modern autonomous
                drones and anti-drone technology:
              </p>
              <ul className="space-y-3.5">
                <Bullet label="Engineering Objectives:">
                  Developing ultra-low-cost, non-detectable, jam-resistant drone
                  platforms and hunter-drones capable of extended endurance on
                  minimal battery payloads.
                </Bullet>
                <Bullet label="Long-Term Vision:">
                  Hardware and autonomous systems are redefining global security.
                  I want to build at the forefront of next-gen defense technology
                  and collaborate with visionary founders like Palmer Luckey
                  (Anduril Industries) to redefine defense capabilities for the
                  modern era.
                </Bullet>
              </ul>
            </div>
          </Section>

          {/* ═══════ 02 / ORIGIN & COMMUNITY ═══════ */}
          <Section index="02" title="ORIGIN & COMMUNITY PROOF-OF-WORK">
            <p className="text-[16px] leading-relaxed text-zinc-300 md:text-[17px]">
              Growing up in a rural village surrounded by over a dozen brick
              factories, reliable internet was nonexistent, quality education was
              a rare privilege, and daily transportation was a struggle. Despite
              these constraints, I fought my way into Islamia Collegiate
              Peshawar.
            </p>

            <p className="text-[15px] leading-relaxed text-zinc-400 md:text-base">
              Observing neighborhood children working in brick kilns instead of
              holding pencils compelled me to take direct action:
            </p>

            <ul className="space-y-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-6">
              <Bullet label="Community Connectivity & EdTech:">
                Distributed my personal Wi-Fi network for free to local students
                during lockdowns, enabling over 50 youth to keep learning.
              </Bullet>
              <Bullet label="Direct Mentorship:">
                Tutored 8 neighborhood students in core subjects and digital
                tools, showing them how technology can build real independence
                and financial capability.
              </Bullet>
              <Bullet label="Environmental Intervention:">
                <TreePine className="mr-1 inline size-4 text-emerald-400" />
                Planted local tree clusters to directly combat the dense air
                pollution produced by surrounding brick kilns.
              </Bullet>
              <Bullet label="Healthcare Advocacy:">
                Worked alongside local mobilization teams to address vaccine
                hesitancy and directly reduce polio refusals in our village.
              </Bullet>
              <Bullet label="Early Financial Stewardship:">
                When my family faced severe financial hardship after my
                father&apos;s salary was halted, I built digital
                content/freelance channels at a young age to earn income, clear
                family debt, and stabilize our household.
              </Bullet>
            </ul>
          </Section>

          {/* ═══════ 03 / APPLIED PRODUCT ECOSYSTEM ═══════ */}
          <Section index="03" title="APPLIED PRODUCT ECOSYSTEM">
            <p className="text-[15px] leading-relaxed text-zinc-400 md:text-base">
              To solve immediate logistical bottlenecks across Pakistan, I built
              and shipped functional software platforms across EdTech, logistics,
              and field operations:
            </p>

            <ul className="space-y-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-6">
              <Bullet label="Campus Apply:">
                Centralized higher-education application engine built on Express
                5, Drizzle ORM, and PostgreSQL. Streamlines fragmented
                admissions for Pakistani students with a unified portal and
                multi-tenant university routing.
              </Bullet>
              <Bullet label="Best Cut & Best Cut Admin:">
                On-demand barbering and grooming ecosystem engineered in
                Flutter/Dart and Firebase to eliminate physical queue waiting
                hours across local shops.
              </Bullet>
              <Bullet label="PoliceApp (Voice-to-Text):">
                Secure voice dictation tool built for field police officers to
                transcribe legally structured case documentation in real time.
              </Bullet>
              <Bullet label="EV Battery Swapping Network:">
                <Cpu className="mr-1 inline size-4 text-emerald-400" />
                Operational tracking framework designed to minimize commercial
                transit delays through standardized battery swap stations.
              </Bullet>
            </ul>
          </Section>
        </div>

        {/* Quick links row */}
        <div className="mt-12 flex flex-wrap gap-2.5">
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
