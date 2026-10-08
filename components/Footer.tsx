import { site } from "@/data/projects";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 font-mono text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:px-6">
        <span>
          © {site.copyrightYear} {site.name} · built with Next.js, Tailwind,
          Framer Motion
        </span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          deployed on Vercel · auto-ships on push
        </span>
      </div>
    </footer>
  );
}
