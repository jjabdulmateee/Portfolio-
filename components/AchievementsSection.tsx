"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Award,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProofDocument {
  id: string;
  title: string;
  badge: string;
  badgeTone: "emerald" | "blue" | "amber";
  src: string;
  alt: string;
  fileLabel: string;
  description: string;
  highlight: string;
  verifiedDetails: string[];
}

export const PROOF_DOCUMENTS: ProofDocument[] = [
  {
    id: "admission-email",
    title: "TKS Official Admission Email",
    badge: "[VERIFIED_ADMISSION]",
    badgeTone: "emerald",
    src: "/images/tks/tks-admission-email.png",
    alt: "The Knowledge Society (TKS) Official Admission Acceptance Email",
    fileLabel: "tks-admission-email.png",
    highlight: "Accepted into 2026–2027 TKS Program",
    description:
      "Official acceptance email for the 2026–2027 TKS Program, acknowledging top applicant selection for drive, curiosity, and builder mindset.",
    verifiedDetails: [
      "Issued by: Andre Thibault (TKS)",
      "Program: 2026–2027 TKS Program",
      "Recipient: Abdulmateen",
      "Status: Official Admission Confirmed",
    ],
  },
  {
    id: "scholarship-letter",
    title: "TKS Financial Support & Scholarship Letter",
    badge: "[SCHOLARSHIP_AWARDED]",
    badgeTone: "blue",
    src: "/images/tks/tks-scholarship.png",
    alt: "The Knowledge Society (TKS) Financial Support and Scholarship Letter",
    fileLabel: "tks-scholarship.png",
    highlight: "$4,400 USD Financial Aid Granted",
    description:
      "Official financial support notice granting $4,400 USD in financial aid to support enrollment in the 2026–2027 TKS Program.",
    verifiedDetails: [
      "Award: $4,400 USD Financial Aid",
      "Program: 2026–2027 TKS Program",
      "Recipient: Abdulmateen",
      "Status: Grant Award Confirmed",
    ],
  },
  {
    id: "acceptance-letter",
    title: "TKS Official Letter of Acceptance",
    badge: "[SIGNED_ACCEPTANCE_LETTER]",
    badgeTone: "emerald",
    src: "/images/tks/tks-acceptance-letter.png",
    alt: "The Knowledge Society (TKS) Official Letter of Acceptance signed by Navid Nathoo",
    fileLabel: "tks-acceptance-letter.png",
    highlight: "Signed by Navid Nathoo, Co-Founder",
    description:
      "Official Letter of Acceptance from The Knowledge Society welcoming Abdulmateen to the 2026–2027 TKS Program.",
    verifiedDetails: [
      "Endorsed by: Navid Nathoo (Co-Founder)",
      "Institution: The Knowledge Society (TKS)",
      "Recipient: Abdulmateen",
      "Status: Verified Signature",
    ],
  },
];

export function AchievementsSection() {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeDoc =
    activeModalIndex !== null ? PROOF_DOCUMENTS[activeModalIndex] : null;

  const handleOpenModal = useCallback((index: number) => {
    setActiveModalIndex(index);
    setIsZoomed(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalIndex(null);
    setIsZoomed(false);
  }, []);

  const handleNext = useCallback(() => {
    setActiveModalIndex((prev) =>
      prev === null ? null : (prev + 1) % PROOF_DOCUMENTS.length,
    );
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveModalIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + PROOF_DOCUMENTS.length) % PROOF_DOCUMENTS.length,
    );
    setIsZoomed(false);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (activeModalIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalIndex, handleCloseModal, handleNext, handlePrev]);

  return (
    <section
      id="achievements"
      className="mx-auto max-w-7xl px-6 pb-24 md:px-12"
      aria-label="Achievements and Admissions"
    >
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-2 border-b border-zinc-800/80 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-sm text-zinc-400">
              <span className="text-emerald-400">❯</span> cat /achievements/tks
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              VERIFIED_CREDENTIAL
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            Proof of Admission &amp; Scholarships · The Knowledge Society (TKS)
          </p>
        </div>
        <span className="hidden font-mono text-[11px] text-zinc-600 sm:inline">
          status: authenticated [200_OK]
        </span>
      </div>

      {/* High-Impact Copy Banner */}
      <div className="mb-8 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Award className="size-4 text-emerald-400" />
              <span>THE KNOWLEDGE SOCIETY (TKS) · ACCELERATOR ADMISSION</span>
            </div>
            <p className="text-base font-medium leading-relaxed text-zinc-100 sm:text-lg">
              &ldquo;A few months ago, I was accepted into The Knowledge Society
              (TKS) accelerator program with financial scholarship
              support.&rdquo;
            </p>
            <p className="text-xs text-zinc-400">
              Selected among competitive global applicants for demonstrated curiosity,
              drive, and builder mindset, backed by an institutional financial aid grant.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 md:flex-col md:items-end">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1 font-mono text-xs text-zinc-300">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              2026–2027 TKS Program
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1 font-mono text-xs text-zinc-300">
              <ShieldCheck className="size-3.5 text-blue-400" />
              $4,400 USD Financial Aid
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Image Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Official Admission Email */}
        <ProofCard
          document={PROOF_DOCUMENTS[0]}
          onInspect={() => handleOpenModal(0)}
        />

        {/* Card 2: Financial Support & Scholarship Letter */}
        <ProofCard
          document={PROOF_DOCUMENTS[1]}
          onInspect={() => handleOpenModal(1)}
        />
      </div>

      {/* Bonus / Extended Proof: Official Letter of Acceptance */}
      <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <FileCheck className="size-4 text-emerald-400" />
          <span className="text-xs text-zinc-300">
            <span className="font-mono text-zinc-500">Also on file: </span>
            Official Letter of Acceptance signed by Co-Founder Navid Nathoo
          </span>
        </div>
        <button
          type="button"
          onClick={() => handleOpenModal(2)}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/50 px-2.5 py-1 font-mono text-xs text-zinc-200 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          <Maximize2 className="size-3" />
          <span>Inspect Acceptance Letter</span>
        </button>
      </div>

      {/* Full-Screen Lightbox / Modal Preview */}
      <AnimatePresence>
        {activeDoc && activeModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${activeDoc.title}`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/80"
            >
              {/* Modal Terminal Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Terminal dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/70" />
                    <span className="size-2.5 rounded-full bg-yellow-500/70" />
                    <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    ~/images/tks/{activeDoc.fileLabel}
                  </span>
                  <span
                    className={`hidden rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold sm:inline-block ${
                      activeDoc.badgeTone === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {activeDoc.badge}
                  </span>
                </div>

                {/* Modal Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsZoomed((prev) => !prev)}
                    className="flex size-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
                    title={isZoomed ? "Reset Zoom" : "Zoom In"}
                    aria-label={isZoomed ? "Reset Zoom" : "Zoom In"}
                  >
                    {isZoomed ? (
                      <ZoomOut className="size-3.5" />
                    ) : (
                      <ZoomIn className="size-3.5" />
                    )}
                  </button>
                  <a
                    href={activeDoc.src}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
                    title="Open original file in new tab"
                    aria-label="Open original file in new tab"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex size-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                    title="Close (Esc)"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image Viewport */}
              <div
                className={`relative flex flex-1 items-center justify-center overflow-auto bg-zinc-900/60 p-4 transition-all sm:p-6 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-default"
                }`}
                onClick={() => isZoomed && setIsZoomed(false)}
              >
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-700/80 bg-zinc-900/90 p-2 text-zinc-300 shadow-xl backdrop-blur-sm transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                  aria-label="Previous document"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="size-5" />
                </button>

                {/* Active Image */}
                <div
                  className={`overflow-hidden rounded-lg border border-zinc-700/70 bg-white shadow-2xl transition-all duration-200 ${
                    isZoomed
                      ? "max-w-none scale-125"
                      : "max-h-[60vh] max-w-full"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeDoc.src}
                    alt={activeDoc.alt}
                    className="block max-h-[60vh] w-auto max-w-full object-contain"
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-700/80 bg-zinc-900/90 p-2 text-zinc-300 shadow-xl backdrop-blur-sm transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                  aria-label="Next document"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Modal Footer / Document Switcher & Info */}
              <div className="flex flex-col gap-3 border-t border-zinc-800 bg-zinc-950 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">
                    {activeDoc.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {activeDoc.description}
                  </p>
                </div>

                {/* Document switcher pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto font-mono text-xs">
                  {PROOF_DOCUMENTS.map((doc, idx) => {
                    const isActive = idx === activeModalIndex;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => {
                          setActiveModalIndex(idx);
                          setIsZoomed(false);
                        }}
                        className={`rounded-md px-2.5 py-1 transition-colors ${
                          isActive
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                            : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProofCard({
  document,
  onInspect,
}: {
  document: ProofDocument;
  onInspect: () => void;
}) {
  const isEmerald = document.badgeTone === "emerald";

  return (
    <article className="group relative flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-black/40">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-2.5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-zinc-700" />
            <span className="size-2 rounded-full bg-zinc-700" />
            <span className="size-2 rounded-full bg-zinc-700" />
          </span>
          <span className="text-zinc-400">{document.fileLabel}</span>
        </div>
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${
            isEmerald
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
          }`}
        >
          {document.badge}
        </span>
      </div>

      {/* Image Preview Area with Hover Zoom Overlay */}
      <div
        onClick={onInspect}
        className="relative cursor-pointer overflow-hidden border-b border-zinc-800/80 bg-zinc-950/80 p-3 sm:p-4"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onInspect();
          }
        }}
        aria-label={`Inspect ${document.title}`}
      >
        <div className="relative mx-auto flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-white transition-transform duration-300 group-hover:scale-[1.01] group-hover:border-zinc-700 sm:h-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={document.src}
            alt={document.alt}
            className="size-full object-contain object-top"
            loading="lazy"
          />

          {/* Hover Scrim / Zoom Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/90 px-3.5 py-1.5 font-mono text-xs font-medium text-zinc-100 shadow-xl backdrop-blur-md">
              <ZoomIn className="size-3.5 text-blue-400" />
              Click to Inspect Document
            </span>
          </div>
        </div>
      </div>

      {/* Card Body & Proof Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-zinc-100">
              {document.title}
            </h3>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
            {document.description}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {document.verifiedDetails.map((detail) => (
              <span
                key={detail}
                className="inline-flex items-center rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-500">
            verification: verified_on_chain_and_email
          </span>
          <button
            type="button"
            onClick={onInspect}
            className="inline-flex items-center gap-1 font-mono text-xs text-blue-400 transition-colors hover:text-blue-300"
          >
            <span>Expand</span>
            <Maximize2 className="size-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
