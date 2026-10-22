"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Square app logo with graceful fallback to initials if the image URL fails.
 * Sized via `size` (px); keeps a consistent rounded-square frame.
 */
export function AppLogo({
  src,
  name,
  size = 48,
  /** "light" backs the logo with white — for dark artwork on transparent backgrounds */
  tone = "dark",
  className,
}: {
  src: string;
  name: string;
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl border shadow-inner shadow-black/40",
        tone === "light" ? "border-zinc-700 bg-white" : "border-zinc-800 bg-zinc-900",
        className,
      )}
    >
      {failed ? (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 font-mono font-semibold text-blue-400">
          <span style={{ fontSize: Math.max(11, size * 0.32) }}>{initials}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}
