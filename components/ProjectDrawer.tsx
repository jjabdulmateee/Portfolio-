"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Circle,
  Compass,
  FileText,
  KeyRound,
  Link2,
  MessageSquareQuote,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Wrench,
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
  backHref = "/",
}: {
  project: Project | null;
  onClose?: () => void;
  /** Switch the view to another project (used by cross-link callouts) */
  onNavigate?: (id: string) => void;
  backHref?: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState<SectionId>("story");
  /** Only one Q&A card open at a time; Q1 open by default. */
  const [expandedQAIndex, setExpandedQAIndex] = useState(0);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(backHref);
    }
  };

  // Reset the active tab and accordion when a different project opens
  const [prevId, setPrevId] = useState(project?.id);
  if (project && project.id !== prevId) {
    setPrevId(project.id);
    setActive("story");
    setExpandedQAIndex(0);
  }

  // ESC key navigation
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project?.id, onClose, backHref]);

  // Scroll to top whenever a project opens
  useEffect(() => {
    if (!project) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project?.id]);

  // Scroll-spy for the sticky section nav
  useEffect(() => {
    if (!project) return;
    const els = SECTIONS.map((s) => document.getElementById(`sec-${s.id}`)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("sec-", "") as SectionId);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [project?.id]);

  const jumpTo = (id: SectionId) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!project) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="w-full space-y-8"
    >
      {/* ── Top Breadcrumb & Return Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>cd ~/builds</span>
          <span className="text-zinc-500">(back to all builds)</span>
        </button>
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span className="text-zinc-400">~/builds/{project.id}</span>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span className="hidden sm:inline">
            <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
              esc
            </kbd>{" "}
            to return
          </span>
        </div>
      </div>

      {/* ── Main Project Header Card ── */}
      <header className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
          <AppLogo src={project.logo} name={project.name} tone={project.logoTone} size={72} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusPill status={project.status} />
              <span className="font-mono text-xs text-zinc-500">
                {project.year} · ~/builds/{project.id}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
              {project.name}
            </h1>
            {project.title && project.title !== project.name ? (
              <p className="mt-2 text-sm font-medium text-zinc-300 sm:text-base">
                {project.title}
              </p>
            ) : project.subtitle ? (
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                {project.subtitle}
              </p>
            ) : null}
            {project.category && (
              <p className="mt-1 font-mono text-xs text-zinc-500">{project.category}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(project.techStack ?? project.stack).map((t) => (
                <StackTag key={t}>{t}</StackTag>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky Section Nav ── */}
      <nav
        aria-label="Project sections"
        className="sticky top-16 z-30 flex gap-1 rounded-xl border border-zinc-800/80 bg-zinc-950/85 p-1.5 backdrop-blur-md"
      >
        {SECTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => jumpTo(id)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs transition-colors",
              active === id
                ? "text-blue-400"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200",
            )}
          >
            {active === id && (
              <motion.span
                layoutId="project-tab"
                className="absolute inset-0 rounded-lg bg-blue-500/10 ring-1 ring-inset ring-blue-500/30"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <Icon className="relative size-3.5" />
            <span className="relative">{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Body Content ── */}
      <div className="space-y-10">
        {/* Cross-link callout (e.g. admin console → mobile app) */}
        {project.relatedProject && (
          <RelatedCallout
            related={project.relatedProject}
            onNavigate={onNavigate}
          />
        )}

        {/* Executive Summary & Tagline */}
        <div className="space-y-3">
          {project.tagline && (
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/[0.04] px-4 py-2.5 font-mono text-xs text-blue-300">
              <span className="mr-1.5 text-blue-500 select-none">❯</span>
              <span className="italic">&ldquo;{project.tagline}&rdquo;</span>
            </div>
          )}
          {project.subtitle && project.title && project.title !== project.name && (
            <p className="text-base font-medium text-zinc-200">
              {project.subtitle}
            </p>
          )}
          <p className="text-base leading-relaxed text-zinc-300">
            {project.description ?? project.shortSummary}
          </p>
        </div>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
              <span className="text-emerald-400">❯</span>
              <span>Key System Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-inner"
                >
                  <div className="text-xs font-medium leading-tight text-zinc-400">
                    {m.label}
                  </div>
                  <div className="mt-2 font-mono text-base font-semibold text-emerald-400 sm:text-lg">
                    {m.value}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500/40 via-emerald-500/10 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 1: Founder Story & Q&A */}
        <Section id="story" index="01" title="Founder Story & Q&A" Icon={MessageSquareQuote}>
          <ol className="space-y-3">
            {(project.qa ?? project.storyQA).map((qa, i) => (
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
          <div className="grid gap-4 sm:grid-cols-2">
            <ChecklistBlock
              title="What is Built"
              tone="live"
              items={project.built ?? project.technical.built}
              Icon={CheckCircle2}
            />
            <ChecklistBlock
              title="What's Remaining Before Launch"
              tone="neutral"
              items={project.technical.remaining ?? []}
              Icon={Circle}
            />
          </div>

          {project.technical.nextStepsAndNeeds && (
            <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-5">
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-400">
                <Compass className="size-4" />
                What is Needed to Succeed
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                {project.technical.nextStepsAndNeeds}
              </p>
            </div>
          )}

          {/* Progress strip */}
          <ProgressStrip
            built={(project.built ?? project.technical.built).length}
            remaining={(project.technical.remaining ?? []).length}
          />
        </Section>

        {/* Section 3: Proof of Work */}
        <Section id="proof" index="03" title="Proof of Work" Icon={ShieldCheck}>
          <div className="grid gap-3.5 sm:grid-cols-3">
            <ProofButton
              href={project.proofLinks.github}
              label="GitHub Repo"
              hint="Read the source"
              Icon={GithubIcon}
            />
            {project.proofLinks.researchPdf ? (
              <ProofButton
                href={project.proofLinks.researchPdf}
                label="Our Research"
                hint="Read the PDF"
                Icon={FileText}
              />
            ) : (
              <ProofButton
                href={project.proofLinks.videoDemo}
                label="Video Demo"
                hint="Watch it work"
                Icon={PlayCircle}
              />
            )}
            <ProofButton
              href={project.proofLinks.liveApp}
              label={project.proofLinks.liveAppLabel ?? "Test App"}
              hint="Try it yourself"
              Icon={Smartphone}
              primary
            />
          </div>
          {project.evaluatorNote && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <KeyRound className="mt-0.5 size-4 shrink-0 text-emerald-400" />
              <p className="text-sm leading-relaxed text-zinc-300">
                {project.evaluatorNote}
              </p>
            </div>
          )}
        </Section>

        {/* ── Bottom Return Navigation ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/80 pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>cd ~/builds</span>
            <span className="text-zinc-500">(return to all builds)</span>
          </button>
          <span className="font-mono text-xs text-zinc-500">
            ~/builds/{project.id} · status: {project.status}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export { ProjectDrawer as ProjectDetailView };

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
    <section id={`sec-${id}`} className="scroll-mt-32">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-xs text-emerald-400">❯ {index}</span>
        <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-zinc-100">
          <Icon className="size-4 text-zinc-400" />
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
  const router = useRouter();
  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(related.id);
    } else {
      router.push(`/?p=${related.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3.5"
    >
      <Link2 className="size-4 shrink-0 text-emerald-400" />
      <p className="text-sm text-zinc-300">
        {related.note}{" "}
        <button
          type="button"
          onClick={handleNavigate}
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
      transition={{ delay: 0.05 + index * 0.04, duration: 0.35, ease: EASE }}
      className={cn(
        "overflow-hidden rounded-xl border bg-zinc-900/40 transition-colors",
        expanded ? "border-blue-500/40" : "border-zinc-800 hover:border-zinc-700",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full items-start gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/60"
      >
        <span className="mt-0.5 shrink-0 font-mono text-xs text-blue-400">
          Q{index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-zinc-100 sm:text-base">
            {question}
          </span>
          {/* Collapsed preview */}
          <AnimatePresence initial={false}>
            {!expanded && (
              <motion.span
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-2 line-clamp-2 block text-sm leading-relaxed text-zinc-500"
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
            <div className="space-y-3.5 border-t border-zinc-800 px-5 py-4 pl-12 text-sm leading-relaxed text-zinc-300 sm:text-base">
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500">
        {title}
        <span className="ml-2 text-zinc-600">({items.length})</span>
      </h4>
      <ul className="mt-3.5 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
            <Icon
              className={cn(
                "mt-1 size-3.5 shrink-0",
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
    <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
        <span>launch_readiness</span>
        <span className="text-zinc-300">{pct}%</span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        />
      </div>
      <div className="mt-2.5 flex gap-5 font-mono text-xs text-zinc-500">
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
  href?: string;
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
        "group flex items-center gap-3.5 rounded-xl border p-4 transition-all",
        primary
          ? "border-blue-500/40 bg-blue-500/10 hover:border-blue-400/60 hover:bg-blue-500/15"
          : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80",
        disabled && "cursor-not-allowed opacity-50 hover:border-zinc-800 hover:bg-zinc-900/40",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg border",
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
            "block text-sm font-semibold",
            primary ? "text-blue-200" : "text-zinc-100",
          )}
        >
          {label}
        </span>
        <span className="block font-mono text-xs text-zinc-500">
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
