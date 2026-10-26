import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/projects";
import { NowWidget } from "./NowWidget";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

const QUICK_LINKS = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon },
  { label: "Email", href: site.links.email, Icon: Mail },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
] as const;

export function Hero() {
  return (
    <section className="relative">
      <div className="grid-bg pointer-events-none absolute inset-x-0 -top-14 h-[28rem]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-14 pt-16 md:px-12 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-14 lg:pt-20">
        {/* Copy */}
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/50 px-3 py-1 font-mono text-[11px] text-zinc-400">
            <span className="text-blue-400">~/builds</span>
            <span className="text-zinc-600">·</span>
            proof-of-work portfolio
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
            {site.tagline}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {QUICK_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-zinc-200 transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
              >
                <Icon className="size-4 text-zinc-400 transition-colors group-hover:text-blue-400" />
                {label}
                <ArrowUpRight className="size-3.5 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
              </a>
            ))}
          </div>
        </div>

        {/* The Now */}
        <NowWidget />
      </div>
    </section>
  );
}
