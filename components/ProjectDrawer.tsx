"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ImageOff, X } from "lucide-react";
import type { Project, ProjectScreenshot } from "@/data/projects";
import { StatusPill } from "./ui/StatusPill";
import { StackTag } from "./ui/StackTag";

export function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = project !== null;
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock scroll + ESC to close + move focus into the dialog
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-zinc-800/80 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.9 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 px-6 py-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={project.status} />
                  <span className="font-mono text-[11px] text-zinc-500">
                    {project.year} · ~/builds/{project.slug}
                  </span>
                </div>
                <h2
                  id="drawer-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50"
                >
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{project.subheadline}</p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-md border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-8">
                {/* Stack + links */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <StackTag key={t}>{t}</StackTag>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-blue-500/50 hover:text-blue-400"
                      >
                        {l.label}
                        <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <Section title="metrics">
                  <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {project.details.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-3"
                      >
                        <dt className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
                          {m.label}
                        </dt>
                        <dd className="mt-1 font-mono text-sm text-zinc-100">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Section>

                {/* Problem */}
                <Section title="problem">
                  <p className="text-sm leading-relaxed text-zinc-300">
                    {project.details.problem}
                  </p>
                </Section>

                {/* Architecture */}
                <Section title="architecture">
                  <ol className="space-y-2.5">
                    {project.details.architecture.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-0.5 shrink-0 font-mono text-[11px] text-blue-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </Section>

                {/* Highlights */}
                <Section title="highlights">
                  <ul className="space-y-2">
                    {project.details.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Section>

                {/* Screenshots */}
                <Section title="screenshots">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.details.screenshots.map((s) => (
                      <Screenshot key={s.src} shot={s} />
                    ))}
                  </div>
                </Section>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 px-6 py-3 font-mono text-[11px] text-zinc-500">
              <span>
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
                  esc
                </kbd>{" "}
                to close
              </span>
              <span>{project.details.architecture.length} architecture notes</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 font-mono text-xs text-zinc-500">
        <span className="text-emerald-400">❯</span> {title}
      </h3>
      {children}
    </section>
  );
}

/** Renders the screenshot, or a styled placeholder if the asset isn't present yet. */
function Screenshot({ shot }: { shot: ProjectScreenshot }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/50">
      {failed ? (
        <div className="flex aspect-video flex-col items-center justify-center gap-2 text-zinc-600">
          <ImageOff className="size-5" />
          <span className="px-4 text-center font-mono text-[11px]">{shot.alt}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="aspect-video w-full object-cover"
        />
      )}
    </figure>
  );
}
