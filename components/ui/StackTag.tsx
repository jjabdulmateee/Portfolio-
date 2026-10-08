import { cn } from "@/lib/utils";

export function StackTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5 font-mono text-[11px] leading-5 text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
