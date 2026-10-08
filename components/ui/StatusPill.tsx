import { STATUS_TONE, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  link: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  neutral: "border-zinc-700 bg-zinc-800/60 text-zinc-300",
} as const;

const DOT_CLASSES = {
  live: "bg-emerald-400",
  link: "bg-blue-400",
  neutral: "bg-zinc-400",
} as const;

export function StatusPill({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const tone = STATUS_TONE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 tracking-tight",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", DOT_CLASSES[tone])} />
      {status}
    </span>
  );
}
