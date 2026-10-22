"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { AppLogo } from "./ui/AppLogo";
import { StatusPill } from "./ui/StatusPill";
import { StackTag } from "./ui/StackTag";

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-lg hover:shadow-black/30 focus-within:border-blue-500/50"
    >
      {/* Whole-card click target */}
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-label={`Open details for ${project.name}`}
        className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      />

      {/* Header: logo + name + status */}
      <div className="pointer-events-none relative z-10 flex items-start gap-3.5">
        <AppLogo src={project.logo} name={project.name} tone={project.logoTone} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-tight text-zinc-50 sm:text-lg">
                {project.name}
              </h3>
              {project.subtitle && (
                <p className="mt-0.5 truncate text-xs text-zinc-400">{project.subtitle}</p>
              )}
            </div>
            <StatusPill status={project.status} className="hidden shrink-0 sm:inline-flex" />
          </div>
          <div className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="text-zinc-700">/</span>
            <span>{project.year}</span>
            {project.category && (
              <>
                <span className="text-zinc-700">/</span>
                <span className="truncate">{project.category}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile status pill */}
      <StatusPill status={project.status} className="pointer-events-none relative z-10 mt-3 self-start sm:hidden" />

      {/* Short summary */}
      <p className="pointer-events-none relative z-10 mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {project.shortSummary}
      </p>

      {/* Stack */}
      <div className="pointer-events-none relative z-10 mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <StackTag key={tech}>{tech}</StackTag>
        ))}
      </div>

      {/* Footer */}
      <div className="pointer-events-none relative z-10 mt-auto flex items-center justify-between pt-5 font-mono text-xs">
        <span className="text-zinc-600">{project.storyQA.length} Q&amp;A · {project.technical.built.length} shipped</span>
        <span className="inline-flex items-center gap-1 text-zinc-500 transition-colors group-hover:text-blue-400">
          open
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.article>
  );
}
