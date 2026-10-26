import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkstationBar } from "@/components/WorkstationBar";
import { Footer } from "@/components/Footer";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { getProject, projects, site } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Build Not Found" };

  return {
    title: `${project.name} — ${site.name}`,
    description: project.description ?? project.shortSummary,
  };
}

export default async function BuildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <WorkstationBar />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pb-24 pt-6 sm:px-6">
          <ProjectDrawer project={project} backHref="/" />
        </section>
      </main>
      <Footer />
    </>
  );
}
