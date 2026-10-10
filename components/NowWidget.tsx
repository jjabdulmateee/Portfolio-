"use client";

import { useEffect, useState } from "react";
import { projects, site } from "@/data/projects";

function useClock(tz: string) {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

/** Converts "UTC+5" → IANA-compatible Etc/GMT offset (sign inverted by spec). */
function toIanaOffset(label: string): string {
  const m = /UTC([+-])(\d{1,2})/.exec(label);
  if (!m) return "UTC";
  return `Etc/GMT${m[1] === "+" ? "-" : "+"}${m[2]}`;
}

export function NowWidget() {
  const time = useClock(toIanaOffset(site.now.location));
  const active = site.now.activeBuilds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <aside
      aria-label="Current status"
      className="glass relative overflow-hidden rounded-xl font-mono text-[12.5px] leading-relaxed"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="size-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 text-zinc-500">now.sh</span>
        </div>
        <span className="tabular-nums text-zinc-500">
          {time || "--:--:--"} {site.now.location}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3 px-4 py-4">
        <Line prompt="status">
          <span className="relative mr-1.5 inline-flex size-2 translate-y-px">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-emerald-400">{site.now.status.toLowerCase()}</span>
          <span className="text-zinc-600"> · </span>
          <span className="text-zinc-300">{site.now.context}</span>
        </Line>

        <Line prompt="focus">
          <span className="text-zinc-200">{site.now.focus}</span>
        </Line>

        <Line prompt="active_builds">
          <ul className="mt-1 space-y-1">
            {active.map((p) => (
              <li key={p.id} className="flex items-center gap-2 text-zinc-300">
                <span className="text-zinc-600">├─</span>
                <span>{p.name}</span>
                <span className="text-zinc-600">—</span>
                <span className="text-blue-400">{p.status}</span>
              </li>
            ))}
          </ul>
        </Line>

        <Line prompt="core_stack">
          <span className="text-zinc-300">
            [{site.now.coreStack.map((s) => `"${s}"`).join(", ")}]
          </span>
        </Line>

        <div className="flex items-center gap-2 pt-1 text-zinc-500">
          <span className="text-emerald-400">❯</span>
          <span className="inline-block h-4 w-2 animate-blink bg-zinc-400" />
        </div>
      </div>
    </aside>
  );
}

function Line({
  prompt,
  children,
}: {
  prompt: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-emerald-400">❯</span>
        <span className="text-blue-400">{prompt}</span>
      </div>
      <div className="pl-[1.35rem]">{children}</div>
    </div>
  );
}
