"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";

const PARAM = "p";

export function ProjectGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openId = searchParams.get(PARAM);
  const openProject = useMemo(
    () => (openId ? getProject(openId) ?? null : null),
    [openId],
  );

  const setId = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set(PARAM, id);
      else params.delete(PARAM);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
    },
    [router, pathname, searchParams],
  );

  if (openProject) {
    return (
      <section id="build-detail" className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:px-6">
        <ProjectDrawer
          project={openProject}
          onClose={() => setId(null)}
          onNavigate={(id) => setId(id)}
        />
      </section>
    );
  }

  return (
    <section id="builds" className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
      <div className="mb-6 flex items-end justify-between border-b border-zinc-800/80 pb-3">
        <div>
          <h2 className="font-mono text-sm text-zinc-400">
            <span className="text-emerald-400">❯</span> ls ~/builds
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {projects.length} shipped or in-flight builds. Click any card for the
            founder story, technical reality, and proof of work.
          </p>
        </div>
        <span className="hidden font-mono text-[11px] text-zinc-600 sm:inline">
          sorted: recency
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={(id) => setId(id)}
          />
        ))}
      </div>
    </section>
  );
}
