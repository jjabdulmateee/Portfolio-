"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerminalSquare } from "lucide-react";
import { site } from "@/data/projects";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "/builds" },
  { href: "/system", label: "/system" },
  { href: "/about", label: "/about" },
] as const;

export function WorkstationBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: app identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex size-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-blue-400 transition-colors group-hover:border-zinc-700">
            <TerminalSquare className="size-4" />
          </span>
          <span className="font-mono text-sm text-zinc-200">
            {site.name.toLowerCase()}
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">workstation</span>
          </span>
        </Link>

        {/* Center: nav tabs */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-1 sm:flex"
        >
          {TABS.map((tab) => {
            const active =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1 font-mono text-xs transition-colors",
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: live ping */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/50 py-1 pl-2 pr-3 font-mono text-[11px] text-zinc-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-emerald-400">{site.now.status}</span>
          <span className="hidden text-zinc-600 sm:inline">|</span>
          <span className="hidden sm:inline">{site.now.context}</span>
        </div>
      </div>

      {/* Mobile tabs */}
      <nav
        aria-label="Primary mobile"
        className="flex items-center gap-1 overflow-x-auto border-t border-zinc-800/60 px-4 py-1.5 sm:hidden"
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "rounded-md px-3 py-1 font-mono text-xs",
                active ? "bg-blue-500/15 text-blue-400" : "text-zinc-400",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
