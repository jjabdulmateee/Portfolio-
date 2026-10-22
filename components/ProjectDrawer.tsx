"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Circle,
  Compass,
  KeyRound,
  Link2,
  MessageSquareQuote,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Wrench,
  X,
} from "lucide-react";
import type { Project, RelatedProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import { AppLogo } from "./ui/AppLogo";
import { GithubIcon } from "./ui/BrandIcons";
import { StatusPill } from "./ui/StatusPill";
import { StackTag } from "./ui/StackTag";

const SECTIONS = [
  { id: "story", label: "Story & Q&A", Icon: MessageSquareQuote },
  { id: "technical", label: "Technical Reality", Icon: Wrench },
  { id: "proof", label: "Proof of Work", Icon: ShieldCheck },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectDrawer({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  /** Switch the drawer to another project (used by cross-link callouts) */
  onNavigate?: (id: string) => void;
}) {
  const open = project !== null;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionId>("story");
  /** Only one Q&A card open at a time; Q1 open by default. */
  const [expandedQAIndex, setExpandedQAIndex] = useState(0);

  // Reset the active tab and accordion when a different project opens
  const [prevId, setPrevId] = useState(project?.id);
  if (project && project.id !== prevId) {
    setPrevId(project.id);
    setActive("story");
    setExpandedQAIndex(0);
  }

  // Scroll lock + ESC + initial focus
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

  // Reset scroll position whenever a different project opens
  useEffect(() => {
    if (!project) return;
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project?.id, project]);

  // Scroll-spy for the sticky section nav
  useEffect(() => {
    if (!open || !scrollRef.current) return;
    const root = scrollRef.current;
    const els = SECTIONS.map((s) => root.querySelector<HTMLElement>(`#sec-${s.id}`)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("sec-", "") as SectionId);
      },
      { root, rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open, project?.id]);

  const jumpTo = (id: SectionId) => {
    const el = scrollRef.current?.querySelector<HTMLElement>(`#sec-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.9 }}
          >
            {/* ── Header ── */}
            <header className="border-b border-zinc-800 bg-zinc-950/95 px-5 pb-4 pt-5 backdrop-blur sm:px-6">
              <div className="flex items-start gap-4">
                <AppLogo src={project.logo} name={project.name} tone={project.logoTone} size={64} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <StatusPill status={project.status} />
                    <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">
                      {project.year} · ~/builds/{project.id}
                    </span>
                  </div>
                  <h2
                    id="drawer-title"
                    className="mt-2 text-xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-2xl"
                  >
                    {project.name}
                  </h2>
                  {project.subtitle && (
                    <p className="mt-1 text-sm text-zinc-400">{project.subtitle}</p>
                  )}
                  {project.category && (
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">{project.category}</p>
                  )}
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {project.shortSummary}
                  </p>
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

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <StackTag key={t}>{t}</StackTag>
                ))}
              </div>
            </header>

            {/* ── Sticky section nav ── */}
            <nav
              aria-label="Drawer sections"
              className="flex gap-1 border-b border-zinc-800 bg-zinc-950/90 px-3 py-2 backdrop-blur sm:px-4"
            >
              {SECTIONS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => jumpTo(id)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors sm:text-xs",
                    active === id
                      ? "text-blue-400"
                      : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200",
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="drawer-tab"
                      className="absolute inset-0 rounded-md bg-blue-500/10 ring-1 ring-inset ring-blue-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <Icon className="relative size-3.5" />
                  <span className="relative hidden sm:inline">{label}</span>
                  <span className="relative sm:hidden">{label.split(" ")[0]}</span>
                </button>
              ))}
            </nav>

            {/* ── Scrollable body ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-5 py-6 sm:px-6"
            >
              <div className="space-y-10 pb-6">
                {/* Cross-link callout (e.g. admin console → mobile app) */}
                {project.relatedProject && (
                  <RelatedCallout
                    related={project.relatedProject}
                    onNavigate={onNavigate}
                  />
                )}

                {/* Section 1: Founder Story & Q&A */}
                <Section id="story" index="01" title="Founder Story & Q&A" Icon={MessageSquareQuote}>
                  <ol className="space-y-3">
                    {project.storyQA.map((qa, i) => (
                      <QACard
                        key={i}
                        index={i}
                        question={qa.question}
                        answer={qa.answer}
                        expanded={expandedQAIndex === i}
                        onToggle={() =>
                          setExpandedQAIndex((current) => (current === i ? -1 : i))
                        }
                      />
                    ))}
                  </ol>
                </Section>

                {/* Section 2: Technical Reality & Roadblocks */}
                <Section id="technical" index="02" title="Technical Reality & Roadblocks" Icon={Wrench}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ChecklistBlock
                      title="What is Built"
                      tone="live"
                      items={project.technical.built}
                      Icon={CheckCircle2}
                    />
                    <ChecklistBlock
                      title="What's Remaining Before Launch"
                      tone="neutral"
                      items={project.technical.remaining}
                      Icon={Circle}
                    />
                  </div>

                  <div className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/[0.06] p-4">
                    <h4 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-blue-400">
                      <Compass className="size-3.5" />
                      What is Needed to Succeed
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {project.technical.nextStepsAndNeeds}
                    </p>
                  </div>

                  {/* Progress strip */}
                  <ProgressStrip
                    built={project.technical.built.length}
                    remaining={project.technical.remaining.length}
                  />
                </Section>

                {/* Section 3: Proof of Work */}
                <Section id="proof" index="03" title="Proof of Work" Icon={ShieldCheck}>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <ProofButton
                      href={project.proofLinks.github}
                      label="GitHub Repo"
                      hint="Read the source"
                      Icon={GithubIcon}
                    />
                    <ProofButton
                      href={project.proofLinks.videoDemo}
                      label="Video Demo"
                      hint="Watch it work"
                      Icon={PlayCircle}
                    />
                    <ProofButton
                      href={project.proofLinks.liveApp}
                      label={project.proofLinks.liveAppLabel ?? "Test App"}
                      hint="Try it yourself"
                      Icon={Smartphone}
                      primary
                    />
                  </div>
                  {project.evaluatorNote && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                      <KeyRound className="mt-0.5 size-3.5 shrink-0 text-emerald-400" />
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {project.evaluatorNote}
                      </p>
                    </div>
                  )}
                </Section>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-5 py-3 font-mono text-[11px] text-zinc-500 sm:px-6">
              <span>
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
                  esc
                </kbd>{" "}
                to close
              </span>
              <span className="truncate">~/builds/{project.id}</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Building blocks ───────────────────────── */

function Section({
  id,
  index,
  title,
  Icon,
  children,
}: {
  id: SectionId;
  index: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={`sec-${id}`} className="scroll-mt-4">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[11px] text-emerald-400">❯ {index}</span>
        <h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100">
          <Icon className="size-4 text-zinc-500" />
          {title}
        </h3>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      {children}
    </section>
  );
}

function RelatedCallout({
  related,
  onNavigate,
}: {
  related: RelatedProject;
  onNavigate?: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex items-center gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3"
    >
      <Link2 className="size-4 shrink-0 text-emerald-400" />
      <p className="text-sm text-zinc-300">
        {related.note}{" "}
        <button
          type="button"
          onClick={() => onNavigate?.(related.id)}
          className="inline-flex items-center gap-1 font-medium text-emerald-300 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-200 hover:decoration-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 rounded-sm"
        >
          {related.linkLabel}
          <ArrowUpRight className="size-3.5" />
        </button>
        .
      </p>
    </motion.div>
  );
}

/**
 * First two sentences of an answer, used as the collapsed preview.
 * Falls back to the first ~160 characters when no sentence boundary is found.
 */
function previewOf(answer: string): string {
  const sentences = answer.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    return sentences.slice(0, 2).join(" ").trim();
  }
  return answer.length > 160 ? `${answer.slice(0, 160).trim()}…` : answer;
}

function QACard({
  index,
  question,
  answer,
  expanded,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const panelId = `qa-panel-${index}`;
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.35, ease: EASE }}
      className={cn(
        "overflow-hidden rounded-lg border bg-zinc-900/40 transition-colors",
        expanded ? "border-blue-500/40" : "border-zinc-800 hover:border-zinc-700",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full items-start gap-2.5 px-4 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/60"
      >
        <span className="mt-0.5 shrink-0 font-mono text-[11px] text-blue-400">
          Q{index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-zinc-100">{question}</span>
          {/* Collapsed preview: first two sentences, faded */}
          <AnimatePresence initial={false}>
            {!expanded && (
              <motion.span
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-zinc-500"
              >
                {previewOf(answer)}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <ChevronDown
          className={cn(
            "mt-0.5 size-4 shrink-0 text-zinc-500 transition-transform duration-300",
            expanded && "rotate-180 text-blue-400",
          )}
        />
      </button>

      {/* Expanded full answer */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            role="region"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-zinc-800 px-4 py-3.5 pl-[3.15rem] text-sm leading-relaxed text-zinc-300">
              {answer.split(/\n{2,}/).map((paragraph, p) => (
                <p key={p}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function ChecklistBlock({
  title,
  items,
  tone,
  Icon,
}: {
  title: string;
  items: string[];
  tone: "live" | "neutral";
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        {title}
        <span className="ml-2 text-zinc-600">({items.length})</span>
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
            <Icon
              className={cn(
                "mt-[3px] size-3.5 shrink-0",
                tone === "live" ? "text-emerald-400" : "text-zinc-600",
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressStrip({ built, remaining }: { built: number; remaining: number }) {
  const total = built + remaining || 1;
  const pct = Math.round((built / total) * 100);
  return (
    <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
        <span>launch_readiness</span>
        <span className="text-zinc-300">{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        />
      </div>
      <div className="mt-2 flex gap-4 font-mono text-[11px] text-zinc-500">
        <span>
          <span className="text-emerald-400">{built}</span> built
        </span>
        <span>
          <span className="text-zinc-300">{remaining}</span> remaining
        </span>
      </div>
    </div>
  );
}

function ProofButton({
  href,
  label,
  hint,
  Icon,
  primary = false,
}: {
  href: string;
  label: string;
  hint: string;
  Icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
}) {
  const disabled = !href || href === "#";
  return (
    <a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel="noreferrer"
      aria-disabled={disabled}
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3.5 transition-all",
        primary
          ? "border-blue-500/40 bg-blue-500/10 hover:border-blue-400/60 hover:bg-blue-500/15"
          : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80",
        disabled && "cursor-not-allowed opacity-50 hover:border-zinc-800 hover:bg-zinc-900/40",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md border",
          primary
            ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
            : "border-zinc-800 bg-zinc-900 text-zinc-300",
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm font-medium",
            primary ? "text-blue-200" : "text-zinc-100",
          )}
        >
          {label}
        </span>
        <span className="block font-mono text-[11px] text-zinc-500">
          {disabled ? "link pending" : hint}
        </span>
      </span>
      <ArrowUpRight
        className={cn(
          "size-4 shrink-0 text-zinc-600 transition-all",
          !disabled && "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400",
        )}
      />
    </a>
  );
}
