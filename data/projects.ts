/**
 * Single source of truth for every build shown on the site.
 * Consumed by ProjectGrid (card view) and ProjectDrawer (detail view).
 *
 * NOTE: All narrative content below is PLACEHOLDER copy for layout testing.
 * Replace summaries, Q&As, technical lists, and links with real data.
 */

export type ProjectStatus =
  | "Tested Local Build"
  | "Replit Buildathon Entry"
  | "Functional Prototype"
  | "Completed"
  | "Architecture Spec";

/** Maps each status to a visual tone used by the StatusPill component. */
export const STATUS_TONE: Record<ProjectStatus, "live" | "link" | "neutral"> = {
  Completed: "live",
  "Tested Local Build": "live",
  "Functional Prototype": "link",
  "Replit Buildathon Entry": "link",
  "Architecture Spec": "neutral",
};

export interface StoryQA {
  question: string;
  answer: string;
}

export interface ProjectTechnical {
  /** What is built and working today */
  built: string[];
  /** What's remaining before launch */
  remaining: string[];
  /** What is needed to succeed (free-form) */
  nextStepsAndNeeds: string;
}

export interface ProofLinks {
  github: string;
  videoDemo: string;
  liveApp: string;
}

export interface Project {
  id: string;
  name: string;
  /** Placeholder image URL; falls back to initials if it fails to load */
  logo: string;
  /** "What the app is about" — one or two sentences */
  shortSummary: string;
  storyQA: StoryQA[];
  technical: ProjectTechnical;
  proofLinks: ProofLinks;

  /* Display metadata used by pills, the Now widget, and /system */
  status: ProjectStatus;
  stack: string[];
  year: string;
}

/* ───────────────────────── Placeholder helpers ───────────────────────── */

const logoFor = (initials: string, hex = "3b82f6") =>
  `https://placehold.co/160x160/18181b/${hex}?text=${encodeURIComponent(initials)}&font=jetbrains-mono`;

const DUMMY_QA: StoryQA[] = [
  {
    question: "What problem are you solving, and who has it?",
    answer:
      "Placeholder answer. Describe the specific user, the moment they feel the pain, and why existing solutions fall short. Two to four sentences is ideal for this layout.",
  },
  {
    question: "Why are you the right person to build this?",
    answer:
      "Placeholder answer. Mention first-hand exposure to the problem, relevant skills, and any unfair advantage (distribution, domain insight, speed).",
  },
  {
    question: "What have you learned from users so far?",
    answer:
      "Placeholder answer. Summarize conversations, pilots, or usage data. Include one concrete quote or metric if you have it.",
  },
  {
    question: "What does success look like in 12 months?",
    answer:
      "Placeholder answer. State a measurable target (users, revenue, retention) and the single milestone that unlocks it.",
  },
];

const DUMMY_TECH: ProjectTechnical = {
  built: [
    "Placeholder: core user flow end-to-end",
    "Placeholder: authentication and role management",
    "Placeholder: primary data model and persistence layer",
    "Placeholder: responsive UI for main screens",
  ],
  remaining: [
    "Placeholder: payments / monetization",
    "Placeholder: production monitoring and error reporting",
    "Placeholder: onboarding polish and empty states",
  ],
  nextStepsAndNeeds:
    "Placeholder paragraph. Describe the single biggest blocker and what would remove it — e.g. design partner access, a specific technical mentor, infrastructure credits, or a co-founder with a particular skill.",
};

const DUMMY_LINKS: ProofLinks = {
  github: "https://github.com/your-handle",
  videoDemo: "https://youtube.com",
  liveApp: "#",
};

/* ───────────────────────── Projects ───────────────────────── */

export const projects: Project[] = [
  {
    id: "best-cut",
    name: "Best Cut",
    logo: logoFor("BC", "10b981"),
    shortSummary:
      "Placeholder summary. A barbershop appointment scheduling app with an admin portal for managing barbers, services, and the daily queue.",
    storyQA: DUMMY_QA,
    technical: DUMMY_TECH,
    proofLinks: DUMMY_LINKS,
    status: "Tested Local Build",
    stack: ["Flutter", "Dart", "Firebase", "Android APK"],
    year: "2025",
  },
  {
    id: "campus-apply",
    name: "Campus Apply",
    logo: logoFor("CA"),
    shortSummary:
      "Placeholder summary. A centralized college admissions engine: one student profile, submitted to many institutions, reviewed from a shared dashboard.",
    storyQA: DUMMY_QA,
    technical: DUMMY_TECH,
    proofLinks: DUMMY_LINKS,
    status: "Replit Buildathon Entry",
    stack: ["React", "Vite", "Firebase", "Replit"],
    year: "2025",
  },
  {
    id: "humanly",
    name: "Humanly",
    logo: logoFor("HU", "a78bfa"),
    shortSummary:
      "Placeholder summary. AI media authenticity and bot detection that returns an explainable confidence score for text, images, and account behavior.",
    storyQA: DUMMY_QA,
    technical: DUMMY_TECH,
    proofLinks: DUMMY_LINKS,
    status: "Functional Prototype",
    stack: ["Python", "AI/ML", "Web Architecture"],
    year: "2025",
  },
  {
    id: "voice-to-text",
    name: "Voice-to-Text Dictation Engine",
    logo: logoFor("VT", "f59e0b"),
    shortSummary:
      "Placeholder summary. Real-time speech-to-document tool with voice commands for formatting, exporting clean documents in one click.",
    storyQA: DUMMY_QA,
    technical: DUMMY_TECH,
    proofLinks: DUMMY_LINKS,
    status: "Completed",
    stack: ["React", "Speech Recognition API", "Tailwind CSS"],
    year: "2024",
  },
  {
    id: "ev-battery-swap",
    name: "EV Battery Swapping Network",
    logo: logoFor("EV", "22d3ee"),
    shortSummary:
      "Placeholder summary. System design for a battery-swap station network: locate charged inventory, reserve a pack, swap in minutes.",
    storyQA: DUMMY_QA,
    technical: DUMMY_TECH,
    proofLinks: DUMMY_LINKS,
    status: "Architecture Spec",
    stack: ["System Architecture", "React Native", "Firebase"],
    year: "2025",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/* ───────────────────────── Site-level config ───────────────────────── */

export const site = {
  name: "MD",
  handle: "@your-handle",
  title: "Builder Workstation",
  copyrightYear: 2026,
  tagline:
    "I ship end-to-end products — mobile apps, admissions platforms, and AI tooling — from architecture to tested build.",
  tagline2:
    "Currently applying to the Horowitz Andreessen Academy with this proof-of-work.",
  links: {
    github: "https://github.com/your-handle",
    email: "mailto:you@example.com",
    linkedin: "https://linkedin.com/in/your-handle",
  },
  now: {
    status: "Active",
    context: "Applying to HAA",
    focus: "Shipping Humanly v0.2 detector ensemble",
    activeBuilds: ["humanly", "campus-apply", "ev-battery-swap"],
    coreStack: ["TypeScript", "React", "Flutter", "Firebase", "Python"],
    location: "UTC+5",
  },
} as const;
