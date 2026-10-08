/**
 * Single source of truth for every build shown on the site.
 * Consumed by ProjectGrid (card view) and ProjectDrawer (detail view).
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

export interface ProjectLink {
  label: "Demo" | "Source" | "Case Study" | "APK";
  href: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  subheadline: string;
  description: string;
  status: ProjectStatus;
  year: string;
  stack: string[];
  links: ProjectLink[];
  /** Drawer-only content */
  details: {
    problem: string;
    architecture: string[];
    highlights: string[];
    metrics: ProjectMetric[];
    screenshots: ProjectScreenshot[];
  };
}

export const projects: Project[] = [
  {
    slug: "best-cut",
    title: "Best Cut",
    subheadline: "Barbershop Appointment Scheduling & Admin Portal",
    description:
      "End-to-end booking system for a real barbershop: customers reserve slots from a native Android app while the owner manages barbers, services, and the daily queue from an admin portal.",
    status: "Tested Local Build",
    year: "2025",
    stack: ["Flutter", "Dart", "Firebase", "Android APK"],
    links: [
      { label: "Source", href: "https://github.com/your-handle/best-cut" },
      { label: "APK", href: "#" },
    ],
    details: {
      problem:
        "Walk-in barbershops lose revenue to no-shows and double bookings managed over phone calls and paper ledgers. Best Cut replaces that with slot-based scheduling and a single admin view of the day.",
      architecture: [
        "Flutter client with a feature-first folder structure (auth, booking, admin) and Riverpod-style state separation.",
        "Firebase Auth for phone/email sign-in; Firestore for barbers, services, and appointments with composite indexes on (barberId, date).",
        "Cloud Firestore security rules enforce customer vs. admin roles; admins can write to any appointment, customers only to their own.",
        "Slot availability computed client-side from barber working hours minus booked ranges, then validated by a Firestore transaction to prevent double-booking.",
        "Release APK built with ProGuard/R8 shrinking and tested on physical devices.",
      ],
      highlights: [
        "Transactional booking prevents race conditions when two customers select the same slot.",
        "Admin portal supports barber onboarding, service pricing, and day-view timeline.",
        "Offline-tolerant: Firestore persistence keeps the schedule readable without connectivity.",
      ],
      metrics: [
        { label: "Screens", value: "14" },
        { label: "Firestore collections", value: "5" },
        { label: "Booking write path", value: "1 transaction" },
        { label: "Build target", value: "Android APK" },
      ],
      screenshots: [
        { src: "/screenshots/best-cut-1.png", alt: "Best Cut booking screen" },
        { src: "/screenshots/best-cut-2.png", alt: "Best Cut admin day view" },
      ],
    },
  },
  {
    slug: "campus-apply",
    title: "Campus Apply",
    subheadline: "Centralized College Admissions Engine",
    description:
      "One application, many colleges. Students build a single profile and submit to multiple institutions; admissions teams review, filter, and decide from a shared dashboard.",
    status: "Replit Buildathon Entry",
    year: "2025",
    stack: ["React", "Vite", "Firebase", "Replit"],
    links: [
      { label: "Demo", href: "https://campus-apply.replit.app" },
      { label: "Source", href: "https://github.com/your-handle/campus-apply" },
    ],
    details: {
      problem:
        "Applicants re-enter the same information across dozens of college portals, and small institutions lack any structured intake tooling. Campus Apply centralizes both sides of the process.",
      architecture: [
        "React + Vite SPA with route-level code splitting; applicant and admissions surfaces share a design system but load independently.",
        "Firebase Auth with custom claims to separate `applicant`, `reviewer`, and `admin` roles.",
        "Firestore data model: `profiles` → `applications` (subcollection per college) → `reviews`, enabling per-college queries without fan-out reads.",
        "Firebase Storage for transcripts and essays with signed, time-boxed download URLs.",
        "Deployed and iterated on Replit with always-on hosting for the buildathon demo window.",
      ],
      highlights: [
        "Single-profile, multi-submit flow with per-college supplemental questions.",
        "Reviewer dashboard with status pipeline (Submitted → In Review → Decision).",
        "Built and shipped inside the buildathon deadline.",
      ],
      metrics: [
        { label: "Roles", value: "3" },
        { label: "Application pipeline stages", value: "4" },
        { label: "Time to first deploy", value: "< 48h" },
        { label: "Context", value: "Replit Buildathon" },
      ],
      screenshots: [
        { src: "/screenshots/campus-apply-1.png", alt: "Campus Apply applicant profile" },
        { src: "/screenshots/campus-apply-2.png", alt: "Campus Apply reviewer dashboard" },
      ],
    },
  },
  {
    slug: "humanly",
    title: "Humanly",
    subheadline: "AI Media Authenticity & Bot Detection",
    description:
      "Analyzes text, images, and account behavior to estimate whether content is human-made or synthetically generated, surfacing a confidence score and the signals behind it.",
    status: "Functional Prototype",
    year: "2025",
    stack: ["Python", "AI/ML", "Web Architecture"],
    links: [
      { label: "Source", href: "https://github.com/your-handle/humanly" },
      { label: "Demo", href: "#" },
    ],
    details: {
      problem:
        "Generated media and automated accounts are now indistinguishable at a glance. Humanly gives users and moderators an explainable authenticity signal rather than a black-box verdict.",
      architecture: [
        "Python service layer exposing a REST API; each detector (text, image, behavioral) is an isolated module behind a common `Detector` interface.",
        "Text detection combines perplexity/burstiness statistics with a fine-tuned transformer classifier.",
        "Image pipeline runs frequency-domain artifact analysis alongside a CNN classifier trained on real vs. generated samples.",
        "Behavioral module scores posting cadence, reply latency, and content entropy for bot likelihood.",
        "Scores are fused with a weighted ensemble and returned with per-signal explanations for the web UI.",
      ],
      highlights: [
        "Explainable output: every score ships with the contributing signals.",
        "Pluggable detector architecture; adding a new modality is one module.",
        "Web front end for drag-and-drop analysis of media and profile URLs.",
      ],
      metrics: [
        { label: "Detection modalities", value: "3" },
        { label: "Ensemble output", value: "0–100 confidence" },
        { label: "API", value: "REST / JSON" },
        { label: "Stage", value: "Prototype" },
      ],
      screenshots: [
        { src: "/screenshots/humanly-1.png", alt: "Humanly analysis result" },
      ],
    },
  },
  {
    slug: "voice-to-text",
    title: "Voice-to-Text Dictation Engine",
    subheadline: "Automated Document Generation Tool",
    description:
      "Speak, and a formatted document appears. Real-time speech recognition with voice commands for punctuation, headings, and lists, exported to clean documents in one click.",
    status: "Completed",
    year: "2024",
    stack: ["React", "Speech Recognition API", "Tailwind CSS"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Source", href: "https://github.com/your-handle/voice-to-text" },
    ],
    details: {
      problem:
        "Dictation tools dump raw transcripts that still need heavy manual formatting. This engine turns spoken intent (\"new paragraph\", \"bullet point\") into structured document output as you speak.",
      architecture: [
        "React app using the Web Speech API (`SpeechRecognition`) with continuous mode and interim results for low-latency feedback.",
        "Command parser intercepts the transcript stream and maps spoken keywords to document operations before text is committed.",
        "Document state modeled as a block list (heading, paragraph, list item) so formatting is structural, not cosmetic.",
        "Export layer serializes blocks to plain text, Markdown, and HTML for copy or download.",
        "Tailwind CSS for a distraction-free, keyboard-accessible editor layout.",
      ],
      highlights: [
        "Interim transcript rendering keeps perceived latency under a second.",
        "Voice commands for punctuation, new paragraph, headings, bullets, and undo.",
        "Zero backend; runs entirely in the browser.",
      ],
      metrics: [
        { label: "Voice commands", value: "12+" },
        { label: "Export formats", value: "3" },
        { label: "Backend", value: "None" },
        { label: "Status", value: "Shipped" },
      ],
      screenshots: [
        { src: "/screenshots/voice-to-text-1.png", alt: "Voice-to-Text editor" },
      ],
    },
  },
  {
    slug: "ev-battery-swap",
    title: "EV Battery Swapping Network",
    subheadline: "Electric Vehicle Exchange & Location Tracker",
    description:
      "System design for a network of battery-swap stations: riders locate the nearest station with charged inventory, reserve a pack, and swap in minutes instead of charging for hours.",
    status: "Architecture Spec",
    year: "2025",
    stack: ["System Architecture", "React Native", "Firebase"],
    links: [
      { label: "Case Study", href: "#" },
      { label: "Source", href: "https://github.com/your-handle/ev-battery-swap" },
    ],
    details: {
      problem:
        "Two- and three-wheeler EV adoption in dense cities is bottlenecked by charging time and apartment living without plugs. Swapping shifts the problem from the rider to the network.",
      architecture: [
        "React Native rider app: map view with geo-queried stations, live pack availability, reservation, and swap history.",
        "Station-side controller publishes pack state (charge %, health, slot) to Firestore via a lightweight IoT gateway.",
        "Geohash-indexed `stations` collection enables radius queries without a dedicated geo service.",
        "Reservation flow uses a Firestore transaction to hold a pack for a TTL window; Cloud Functions release expired holds.",
        "Battery passport subcollection tracks cycle count and health per pack for predictive retirement.",
      ],
      highlights: [
        "Designed for sub-5-minute swap time with reservation-based inventory holds.",
        "Battery health telemetry feeds fleet-level maintenance planning.",
        "Spec covers data model, security rules, and failure modes (offline station, expired hold).",
      ],
      metrics: [
        { label: "Core entities", value: "5" },
        { label: "Target swap time", value: "< 5 min" },
        { label: "Geo indexing", value: "Geohash" },
        { label: "Stage", value: "Spec" },
      ],
      screenshots: [
        { src: "/screenshots/ev-swap-1.png", alt: "EV swap network architecture diagram" },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
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
