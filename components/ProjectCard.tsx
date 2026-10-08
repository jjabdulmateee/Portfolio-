"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { StatusPill } from "./ui/StatusPill";
import { StackTag } from "./ui/StackTag";

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70 focus-within:border-blue-500/50"
    >
      {/* Whole-card click target (links below are stacked above it) */}
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        aria-label={`Open details for ${project.title}`}
        className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      />

      <div className="relative z-10 pointer-events-none flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="text-zinc-700">/</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-zinc-50">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-400">{project.subheadline}</p>
        </div>
        <StatusPill status={project.status} className="shrink-0" />
      </div>

      <p className="relative z-10 pointer-events-none mt-4 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <div className="relative z-10 pointer-events-none mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <StackTag key={tech}>{tech}</StackTag>
        ))}
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-5">
        <div className="flex items-center gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 transition-colors hover:text-blue-400"
            >
              {link.label}
              <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
        <span className="pointer-events-none inline-flex items-center gap-1 font-mono text-xs text-zinc-500 transition-colors group-hover:text-blue-400">
          details
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  );
}
