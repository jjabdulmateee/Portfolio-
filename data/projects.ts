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
  | "Completed Prototype"
  | "Architecture Spec"
  | "Draft / In Progress"
  | "Completed / Live"
  | "Completed / Shipped"
  | "Interactive Staging Preview";

/** Maps each status to a visual tone used by the StatusPill component. */
export const STATUS_TONE: Record<ProjectStatus, "live" | "link" | "neutral"> = {
  Completed: "live",
  "Tested Local Build": "live",
  "Completed Prototype": "live",
  "Functional Prototype": "link",
  "Replit Buildathon Entry": "link",
  "Architecture Spec": "neutral",
  "Draft / In Progress": "neutral",
  "Completed / Live": "live",
  "Completed / Shipped": "live",
  "Interactive Staging Preview": "link",
};

/** Cross-link from one project drawer to another (e.g. admin console → mobile app). */
export interface RelatedProject {
  /** `id` of the target project */
  id: string;
  /** Sentence shown in the callout; the target name becomes the link text */
  note: string;
  linkLabel: string;
}

export interface StoryQA {
  question: string;
  answer: string;
}

export interface ProjectTechnical {
  /** What is built and working today */
  built: string[];
  /** What's remaining before launch */
  remaining?: string[];
  /** What is needed to succeed (free-form) */
  nextStepsAndNeeds?: string;
}

export interface ProofLinks {
  github: string;
  videoDemo?: string;
  researchPdf?: string;
  liveApp: string;
  /** Overrides the default "Test App" button label (e.g. "Live Demo") */
  liveAppLabel?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  title?: string;
  /** Optional punchy tagline (e.g. "Swap. Ride. Repeat.") */
  tagline?: string;
  /** Optional one-line product positioning shown under the name */
  subtitle?: string;
  /** Placeholder image URL; falls back to initials if it fails to load */
  logo: string;
  /** "light" renders the logo on a white tile (for dark artwork) */
  logoTone?: "dark" | "light";
  /** "What the app is about" — one or two sentences */
  shortSummary: string;
  description?: string;
  /** Optional product category shown under the name (e.g. "Web Application") */
  category?: string;
  featured?: boolean;
  /** Optional callout in the drawer linking to a sibling project */
  relatedProject?: RelatedProject;
  storyQA: StoryQA[];
  qa?: StoryQA[];
  technical: ProjectTechnical;
  built?: string[];
  features?: string[];
  proofLinks: ProofLinks;
  /** Shown under Proof of Work, e.g. pre-filled demo login */
  evaluatorNote?: string;

  /* Display metadata used by pills, the Now widget, and /system */
  status: ProjectStatus;
  stack: string[];
  techStack?: string[];
  year: string;
  metrics?: ProjectMetric[];
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
    logo: "/logos/best-cut.png",
    logoTone: "light",
    proofLinks: {
      github: "https://github.com/jjabdulmateee/best-cut-app",
      videoDemo: DUMMY_LINKS.videoDemo,
      liveApp: "https://github.com/jjabdulmateee/best-cut-app/releases/tag/v1.0.0-mvp",
    },
    shortSummary:
      "An Uber style grooming app built to save millions of human hours wasted in barbershop queues and deliver on-demand haircuts directly to elderly and disabled individuals across Pakistan.",
    storyQA: [
      {
        question: "How did you find this problem?",
        answer:
          "My cousin and I were sitting in a local barbershop in our village, watching hours tick away just waiting for a turn. We started talking about how much productive time gets wasted—not just for us, but for thousands of students, workers, and everyday people across Pakistan.\n\nSince he was studying law and I had a natural drive toward tech, we decided we had to build a solution. When we initially reached out to software developers, they asked for a huge amount of money that we simply didn't have. We didn't even own a laptop or have a reliable internet connection at home back then, so the idea had to sit on hold.\n\nBut a few months later, I managed to get a secondhand laptop and internet access. We went back to the barbershop and saw the exact same issue completely untouched. Everyone was still wasting hours in disorganized queues while barbers experienced an unequal, unpredictable distribution of customers. That was the moment we stopped waiting for outside help and decided to build Best Cut ourselves.",
      },
      {
        question: "Why do you care about this problem?",
        answer:
          "At its core, I care because I want to make life easier for people and give them back their wasted time. But what pushed me emotionally was thinking about vulnerable people who are completely forgotten by traditional service setups.\n\nMy 65-year-old diabetic uncle, who suffers from severe foot injuries, physically cannot walk or stand in a barbershop. He is just one example among thousands of elderly, disabled, or bedridden people who struggle to get basic grooming done.\n\nWhen we introduced the idea of home service, safety and credibility became our immediate priority. We realized we couldn't just launch a simple app—we had to build a trustworthy verification structure where every single barber must submit official identity verification and work credentials before they are allowed to serve customers at home.",
      },
      {
        question: "How did you come up with the solution, and what have you built so far?",
        answer:
          "We realized that solving this issue required a two-pronged strategy: pre-booked appointments for physical shops to eliminate queue waiting, and an on-demand home service dispatch model for maximum accessibility. Leveraging modern AI-assisted tools to accelerate our development speed, we engineered a functional MVP on Flutter and Firebase.\n\nThe app acts as an automated marketplace like Uber, dynamically identifying nearby active barbers using real-time spatial coordinate calculations (Haversine distance matrix). We built a full booking state machine that moves seamlessly through states (Pending → Confirmed → In-Progress → Completed).\n\nTo solve the problem of barbers rejecting or missing requests, we wrote background Cloud Functions that run an automated batch-matching algorithm: if a barber does not respond within 15 minutes or rejects a job, the platform automatically routes the request to the next closest active barber up to 3 times while avoiding repeat declines. We also engineered an in-app wallet system with an atomic, time-weighted cancellation refund policy.",
      },
      {
        question: "What resources did you have when you started?",
        answer:
          "Our starting capital was effectively zero. Living in a rural village area in Pakistan, we had no funding, no office, and no agency behind us. All we had was a single secondhand laptop, a basic home internet connection, and an absolute obsession with solving a problem that affects thousands of everyday people.\n\nWe didn't let our lack of traditional resources or hardware stop us—we simply traded our time, energy, and relentless effort to learn the tech and turn our vision into code.",
      },
      {
        question: "What research and validation have you done so far?",
        answer:
          "We didn't build this in isolation inside a room; we went directly to the streets to talk to real users and business owners. We conducted comprehensive field surveys across high-density urban areas like Peshawar Saddar, the University of Peshawar campus among university students, and local rural villages.\n\nOver 98% of the students, general customers, and barbers we interviewed enthusiastically validated the product, expressing an urgent desire to use an early-appointment and home-grooming system. The remaining 2% who showed hesitation were non-smartphone users who lacked basic digital literacy, confirming that our core tech-enabled demographic is ready and eager for launch.",
      },
      {
        question: "Who is your co-founder, and what is their background?",
        answer:
          "My co-founder is my cousin, who is currently a final-year law student at the University of Peshawar. While I focus strictly on software architecture, frontend/backend engineering, and mobile development, he leads the regulatory, security, and verification frameworks.\n\nBecause home safety is paramount, he designed our strict barber onboarding structure—requiring full national ID (CNIC) verification, work history certificates, and background checks before any barber is permitted to accept home dispatch requests.",
      },
      {
        question: "What is remaining before launch, and what do you need to succeed?",
        answer:
          "Functionally, Best Cut is about 80% complete. The core booking engine, wallet state logic, auto-rerouting Cloud Functions, and state machines are fully built and tested locally.\n\nBefore an official public release, we have three technical integrations remaining: replacing our current mathematical grid mapping with live Google Maps SDK integration, connecting our internal wallet engine to Pakistani payment gateways (JazzCash, EasyPaisa, or 1LINK bank transfers), and signing production release builds for live SMS OTP delivery and push notifications.\n\nTo make this fully operational across Pakistan, our primary blocker is financial backing. Capital is required to cover Google Maps API key consumption and to register formal corporate merchant accounts with local payment processors.",
      },
    ],
    technical: {
      built: [
        "Cross-platform Flutter mobile UI for customers, barbers, and admins",
        "Firebase Auth & Firestore backend with role-based access control",
        "Haversine spatial matching for home haircut dispatch & auto-routing",
        "Real-time daily queue tracking and slot reservation system",
      ],
      remaining: [
        "Local Pakistani payment gateway integration (JazzCash, EasyPaisa, 1LINK)",
        "Google Maps SDK live GPS tracking for mobile barber dispatch",
        "Production SMS OTP gateway registration for phone authentication",
      ],
      nextStepsAndNeeds:
        "API key infrastructure funding for Google Maps distance matrix billing and merchant verification fees to onboard initial local barber clusters across Pakistan.",
    },
    status: "Tested Local Build",
    stack: ["Flutter (Dart 3.9+)", "Dart", "Firebase", "Android APK"],
    year: "2025",
  },
  {
    id: "best-cut-admin",
    name: "Best Cut Admin Console",
    logo: "/logos/best-cut-admin.png",
    logoTone: "light",
    shortSummary:
      "Internal web administration console for Best Cut. Enables instant barber credential verification, automated access locking via Firestore dual-writes, and system audit logging.",
    category: "Web Application / Founder Dashboard",
    relatedProject: {
      id: "best-cut",
      note: "Mobile client app available at",
      linkLabel: "Best Cut Mobile App",
    },
    storyQA: [
      {
        question: "Why build a separate Admin Console?",
        answer:
          "To maintain operational integrity for the Best Cut marketplace. Admins require real-time oversight to vet barber licenses, approve onboarding applications, and instantly disable fraudulent accounts.",
      },
      {
        question: "How does real-time synchronization work with the mobile app?",
        answer:
          "Built on Next.js 14 and Firebase Admin/Firestore. Approving or rejecting a barber executes a dual-write transaction across `barber_applications` and `users` collections, instantly updating the Flutter mobile client state in real time.",
      },
    ],
    technical: {
      built: [
        "Next.js 14 App Router dashboard with responsive Tailwind CSS layout",
        "Pre-filled evaluator login (`demo@bestcut.com` / `Hibye193`) with custom override option",
        "Real-time barber approval pipeline with atomic Firestore dual-writes across applications and users collections",
        "Embedded Firebase config fallbacks for standalone Vercel deployments",
        "Public GitHub repository and production deployment on Vercel",
      ],
      remaining: [
        "Automated email notifications on application approval/rejection",
        "Advanced analytics charts for daily revenue and platform booking volume",
      ],
      nextStepsAndNeeds:
        "Scaling server infrastructure and expanding localized barber onboarding to match growing user waitlist demand.",
    },
    proofLinks: {
      github: "https://github.com/jjabdulmateee/Best-cut-admin",
      videoDemo: "#",
      liveApp: "https://best-cut-admin.vercel.app/",
      liveAppLabel: "Live Demo",
    },
    evaluatorNote:
      "Pre-filled evaluator credentials (`demo@bestcut.com`) are configured on the login screen for instant access.",
    status: "Completed / Live",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    year: "2025",
  },
  {
    id: "campus-apply",
    name: "Campus Apply",
    subtitle: "Common App for Pakistani University Admissions",
    logo: "/logos/campus-apply.svg",
    category: "Web Application / EdTech Platform",
    shortSummary:
      "Centralized Common App-style portal for Pakistani higher education admissions, featuring strict student-admin role separation, immutable application snapshots, and unified document verification.",
    storyQA: [
      {
        question: "Why build a centralized admissions portal for Pakistan?",
        answer:
          "Applying to multiple Pakistani universities traditionally requires filling out separate redundant forms, re-uploading documents, and managing uncoordinated deadlines. Campus Apply standardizes the workflow into a single profile submission model inspired by the Common App.",
      },
      {
        question: "How is data security and application immutability enforced?",
        answer:
          "Student draft records live separately from official submissions. The moment a student submits, an immutable JSON snapshot of their profile, essays, and documents is frozen in the database to prevent post-submission tampering.",
      },
    ],
    technical: {
      built: [
        "React + Vite frontend with Tailwind CSS and secure HttpOnly cookie session authentication",
        "Express 5 API server with PostgreSQL and Drizzle ORM database schema",
        "Immutable JSON application snapshotting upon submission",
        "Secure upload registry with strict object ownership validation",
        "University admin review queue with document verification workflows and simulated fee receipts",
      ],
      remaining: [
        "Integration with local payment gateways (JazzCash/EasyPaisa) for live application fees",
        "Automated SMS/email deadline reminders for pending student submissions",
      ],
      nextStepsAndNeeds:
        "Pilot partnership testing with regional university admissions directorates",
    },
    features: [
      "Unified Student Onboarding: Single profile creation replacing repetitive university-specific data entry.",
      "Dynamic Application Pipelines: Tailored entry tracks for fresh intermediate applicants and transfer students.",
      "Decoupled Backend Architecture: Express 5 API layer backed by Drizzle ORM and PostgreSQL schema migrations.",
      "Institutional Multi-Tenancy (V2 Roadmap): Dedicated university management portals for application review and status synchronization.",
      "Unified Fee Gateway (V2 Roadmap): Streamlined application fee processing across multiple target institutions.",
    ],
    proofLinks: {
      github: "https://github.com/jjabdulmateee/profile",
      videoDemo: "#",
      liveApp: "https://campus-apply--abdulmateenkhan.replit.app",
      liveAppLabel: "Interactive Staging Preview",
    },
    evaluatorNote:
      "NOTE FOR REVIEWERS: The staging link hosts the active Express 5 + PostgreSQL prototype. Core student account creation, applicant onboarding, and university directory routing are functional. The production roadmap is currently executing in two phases: (1) Technical hardening—migrating to HttpOnly session authentication, tightening schema validations, and optimizing asset bundles; (2) Multi-tenant University Portal & Gateway—building dedicated institutional dashboards for real-time document verification, application review workflows, and integrated application fee processing.",
    metrics: [
      { label: "Prototype Speed", value: "8-Hr Buildathon" },
      { label: "Core Stack", value: "Express 5 + Drizzle" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Target Ecosystem", value: "KP Universities" },
    ],
    status: "Interactive Staging Preview",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express 5",
      "PostgreSQL",
      "Drizzle ORM",
      "Tailwind CSS",
    ],
    year: "2026",
  },
  {
    id: "police-voice-case-documentation",
    name: "PoliceApp",
    title: "KP Police Voice-to-Text Case Scribe & Field Documentation System",
    tagline: "Digitizing law enforcement field investigations through voice-driven, offline-first engineering.",
    subtitle: "Offline-first mobile legal documentation system eliminating 80% of paperwork bottlenecks for field investigation officers.",
    category: "GovTech & Mobile Engineering",
    status: "Functional Prototype",
    featured: true,
    logo: "/logos/police-app.svg",
    shortSummary:
      "An offline-first, military-grade encrypted Flutter application built to replace slow, handwritten police paperwork across police stations in Khyber Pakhtunkhwa (KP). The system enables Investigating Officers to dictate FIRs, Roznamcha daily diaries, and Zimni supplementary reports in real-time Urdu and English, attaches multimedia evidence, and prints official stamped legal dossiers directly onto mobile Bluetooth thermal printers at crime scenes.",
    description:
      "An offline-first, military-grade encrypted Flutter application built to replace slow, handwritten police paperwork across police stations in Khyber Pakhtunkhwa (KP). The system enables Investigating Officers to dictate FIRs, Roznamcha daily diaries, and Zimni supplementary reports in real-time Urdu and English, attaches multimedia evidence, and prints official stamped legal dossiers directly onto mobile Bluetooth thermal printers at crime scenes.",
    stack: [
      "Flutter (Dart 3.9+)",
      "Urdu & English Speech Recognition (speech_to_text)",
      "Hive NoSQL",
      "AES-256 Symmetric Encryption",
      "Android Keystore API",
      "Bluetooth RFCOMM & USB CDC-ACM",
      "ESC/POS Thermal Print Protocol",
      "Noto Nastaliq Urdu Rendering",
      "PDF Vector Compilation",
    ],
    techStack: [
      "Flutter (Dart 3.9+)",
      "Urdu & English Speech Recognition (speech_to_text)",
      "Hive NoSQL",
      "AES-256 Symmetric Encryption",
      "Android Keystore API",
      "Bluetooth RFCOMM & USB CDC-ACM",
      "ESC/POS Thermal Print Protocol",
      "Noto Nastaliq Urdu Rendering",
      "PDF Vector Compilation",
    ],
    proofLinks: {
      github: "https://github.com/jjabdulmateee/police-case-app",
      videoDemo: "#",
      liveApp: "#",
      liveAppLabel: "Field Research Phase",
    },
    evaluatorNote:
      "NOTE FOR REVIEWERS: The core Flutter codebase, AES-256 encryption layer, and ESC/POS Bluetooth printing engine are publicly accessible and reviewable on GitHub. A live APK release is currently restricted as the system undergoes active field validation. Following preliminary feedback from investigating officers, a formal design and workflow consultation is scheduled for November 7, 2026, with a senior KP Police Officer. Subsequent steps focus on UI optimization for rugged field conditions and team formation for local precinct testing.",
    metrics: [
      { label: "Paperwork Time Saved", value: "80%" },
      { label: "Network Requirement", value: "0% (100% Offline)" },
      { label: "Data Security", value: "AES-256 Hardware Encrypted" },
      { label: "Primary Language", value: "Urdu (RTL Nastaliq) & English" },
    ],
    qa: [
      {
        question: "What exact problem does this application solve?",
        answer:
          "In Khyber Pakhtunkhwa (KP) and across Pakistan, Investigation Officers (IOs) spend up to 70–80% of their operational duty hours manually writing and re-drafting paper case files (FIRs, Roznamcha daily diaries, Zimni supplementary reports) up to 4–5 times per case. This administrative paralysis bogs down active cases for 3–4 months, risks critical evidence going cold, and poses severe security threats where losing a single physical folder can end an officer's career.",
      },
      {
        question: "Who is affected by this bottleneck and what is the target demographic?",
        answer:
          "The immediate target users are over 2,000+ Investigation Officers and Moharrirs across police stations in Khyber Pakhtunkhwa, and ultimately law enforcement officers across Pakistan who require an offline-first digital scribe to perform their daily duties without being chained to manual desks.",
      },
      {
        question: "What is the personal origin story behind this project?",
        answer:
          "The project was conceived by observing my father—an Assistant Sub-Inspector and active Investigation Officer in KP Police—spend endless off-duty hours manually re-writing Urdu case files. Witnessing how administrative overhead actively pulls dedicated officers away from boots-on-the-ground field investigation drove me to build a native software solution tailored specifically to their harsh field workflows.",
      },
      {
        question: "What is built in V1 (MVP) and what is its technical architecture?",
        answer:
          "V1 is a complete, offline-first Flutter application featuring continuous acoustic speech recognition in both Urdu (ur_PK) and English (en_US). It includes digital replicas of official police stationery (FIR, Form 25-53(1) Zimni), an interactive Scanned Form Studio for overlaying voice-fillable text fields onto paper form photos, a hardware digital evidence locker for crime scene media, local AES-256 encryption backed by OS Keystore keys, and direct hardware printing to portable Bluetooth/USB thermal printers via the ESC/POS binary protocol.",
      },
      {
        question: "What is coming in V2 and what are the next rollout milestones?",
        answer:
          "V2 expands the system into an enterprise supervisory platform featuring real-time case tracking for commanding officers, inline order comments, case thoroughness ratings, officer performance analytics, and encrypted P2P case handover exports (.kpkpkg archives). We are currently polishing the UI/UX based on direct feedback from officers like my father to prepare for formal field deployment testing across local precincts.",
      },
    ],
    storyQA: [
      {
        question: "What exact problem does this application solve?",
        answer:
          "In Khyber Pakhtunkhwa (KP) and across Pakistan, Investigation Officers (IOs) spend up to 70–80% of their operational duty hours manually writing and re-drafting paper case files (FIRs, Roznamcha daily diaries, Zimni supplementary reports) up to 4–5 times per case. This administrative paralysis bogs down active cases for 3–4 months, risks critical evidence going cold, and poses severe security threats where losing a single physical folder can end an officer's career.",
      },
      {
        question: "Who is affected by this bottleneck and what is the target demographic?",
        answer:
          "The immediate target users are over 2,000+ Investigation Officers and Moharrirs across police stations in Khyber Pakhtunkhwa, and ultimately law enforcement officers across Pakistan who require an offline-first digital scribe to perform their daily duties without being chained to manual desks.",
      },
      {
        question: "What is the personal origin story behind this project?",
        answer:
          "The project was conceived by observing my father—an Assistant Sub-Inspector and active Investigation Officer in KP Police—spend endless off-duty hours manually re-writing Urdu case files. Witnessing how administrative overhead actively pulls dedicated officers away from boots-on-the-ground field investigation drove me to build a native software solution tailored specifically to their harsh field workflows.",
      },
      {
        question: "What is built in V1 (MVP) and what is its technical architecture?",
        answer:
          "V1 is a complete, offline-first Flutter application featuring continuous acoustic speech recognition in both Urdu (ur_PK) and English (en_US). It includes digital replicas of official police stationery (FIR, Form 25-53(1) Zimni), an interactive Scanned Form Studio for overlaying voice-fillable text fields onto paper form photos, a hardware digital evidence locker for crime scene media, local AES-256 encryption backed by OS Keystore keys, and direct hardware printing to portable Bluetooth/USB thermal printers via the ESC/POS binary protocol.",
      },
      {
        question: "What is coming in V2 and what are the next rollout milestones?",
        answer:
          "V2 expands the system into an enterprise supervisory platform featuring real-time case tracking for commanding officers, inline order comments, case thoroughness ratings, officer performance analytics, and encrypted P2P case handover exports (.kpkpkg archives). We are currently polishing the UI/UX based on direct feedback from officers like my father to prepare for formal field deployment testing across local precincts.",
      },
    ],
    built: [
      "Native Urdu speech recognition mapping spoken dictation directly into digital police stationery (FIR & Form 25-53(1) Zimni).",
      "Field-ready direct ESC/POS Bluetooth RFCOMM and USB OTG thermal printing for spot evidence statements and immediate paper receipts.",
      "Interactive Scanned Form Studio: map custom voice-fillable text coordinates over photographs of physical paper stationery.",
      "Hardware-backed secure key storage (Android Keystore) with a 100% offline AES-256 encrypted local Hive database.",
    ],
    technical: {
      built: [
        "Native Urdu speech recognition mapping spoken dictation directly into digital police stationery (FIR & Form 25-53(1) Zimni).",
        "Field-ready direct ESC/POS Bluetooth RFCOMM and USB OTG thermal printing for spot evidence statements and immediate paper receipts.",
        "Interactive Scanned Form Studio: map custom voice-fillable text coordinates over photographs of physical paper stationery.",
        "Hardware-backed secure key storage (Android Keystore) with a 100% offline AES-256 encrypted local Hive database.",
      ],
      remaining: [
        "V2 enterprise supervisory platform featuring real-time case tracking for commanding officers",
        "Inline order comments and case thoroughness ratings with officer performance analytics",
        "Encrypted P2P case handover exports (.kpkpkg archives) across police precinct stations",
      ],
      nextStepsAndNeeds:
        "Polishing UI/UX based on direct field feedback from KP Police Investigation Officers to prepare for formal precinct pilot deployment and testing.",
    },
    year: "2025",
  },
  {
    id: "ev-battery-swap",
    name: "EV Battery Swapping Network",
    tagline: "Swap. Ride. Repeat.",
    subtitle:
      "Instant <2-min battery swapping ecosystem for electric bikes in Peshawar.",
    logo: "/logos/ev-swap.svg",
    category: "Software Architecture & Clean Energy",
    shortSummary:
      "Designed and built an urban battery swapping network and app prototype to eliminate 6-8 hour home charging delays and high petrol costs (Rs. 379/litre) for over 2,000+ delivery riders and daily commuters in Peshawar.",
    storyQA: [
      {
        question: "What problem are you solving, and who has it?",
        answer:
          "Electric bike riders in Peshawar face two brutal realities: wall-charging a battery takes 6–8 hours, and there is virtually zero public charging infrastructure in the city. Delivery riders and daily commuters — over 2,000 in our target zone alone — are forced to either wait overnight or burn petrol at Rs. 379/litre. EVswap eliminates this bottleneck entirely by decoupling the battery from the bike: riders pull into any of our five networked stations, swap their depleted pack for a fully charged one in under 5 minutes, and continue riding.",
      },
      {
        question: "How does the swapping system actually work?",
        answer:
          "The rider opens the EVswap mobile app to locate the nearest station with available charged inventory on a live map. Upon arrival, they scan a QR code to authenticate, hand in their depleted battery, and receive a verified charged pack from the station attendant. The backend validates battery serial numbers, updates the inventory ledger in PostgreSQL, and logs the swap against the rider's subscription tier. The entire exchange — authentication, inventory update, and handoff — completes in under 5 minutes.",
      },
      {
        question: "What is the business model?",
        answer:
          "We operate on a subscription-based model with tiered plans designed for different rider profiles. The Basic plan (Rs. 2,000/month) covers 20 swaps — ideal for students and occasional riders. The Standard plan (Rs. 4,000/month) provides 35 swaps with priority support and rewards points, targeting daily commuters and delivery riders who depend on uninterrupted mobility. Each swap costs roughly 60% less per kilometer than petrol, making the value proposition immediately tangible.",
      },
      {
        question: "What have you learned from the market so far?",
        answer:
          "Peshawar has a rapidly growing fleet of electric two-wheelers, but adoption is bottlenecked by range anxiety and impractical charging times — not by vehicle cost. Our field research identified over 100,000 potential riders across Khyber Pakhtunkhwa. The live prototype confirmed that a 5-station network with smart inventory rotation can serve a meaningful rider base. The biggest surprise was demand from delivery fleet operators, who see battery swapping as an operational necessity rather than a convenience.",
      },
      {
        question: "Why are you the right person to build this?",
        answer:
          "I live in Peshawar and see the EV charging gap daily — this is not an abstract market thesis for me. I designed the full system architecture (React Native client, Express API, PostgreSQL data model) and built the working prototype end-to-end on Replit, shipping a live production deployment that demonstrates real station discovery, swap flow, and subscription management. My previous builds (Best Cut, Campus Apply) prove I can take a product from blank screen to working software under extreme resource constraints.",
      },
    ],
    technical: {
      built: [
        "Built an urban GIS station locator and map interface for EV drivers across Peshawar hubs (Hayatabad, Saddar, University Town).",
        "Engineered a QR-based swap verification and battery inventory state machine tracking state-of-health and charge levels.",
        "Developed a PostgreSQL and Express backend handling user authentication, subscription pricing models, and real-time station availability.",
      ],
      remaining: [
        "IoT telemetry integration for real-time battery health monitoring (voltage, temperature, cycle count)",
        "Mobile React Native client for iOS and Android rider apps",
        "Payment gateway integration (JazzCash / EasyPaisa) for automated subscription billing",
      ],
      nextStepsAndNeeds:
        "Pilot deployment funding for 5 physical swap stations across Peshawar's high-density delivery corridors, and hardware procurement for standardized battery packs and IoT charging cradles.",
    },
    proofLinks: {
      github: "https://github.com/jjabdulmateee/evswap",
      researchPdf: "/docs/EVSwap-Research.pdf",
      liveApp: "https://web-builder-suite--ansarullahkhan2.replit.app/",
      liveAppLabel: "Live Demo",
    },
    status: "Completed Prototype",
    stack: ["React Native", "Node.js", "Express 5", "PostgreSQL", "Replit"],
    year: "2025",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find(
    (p) =>
      p.id === id ||
      (id === "policeapp" && (p.id === "police-voice-case-documentation" || p.name.toLowerCase() === "policeapp")) ||
      (id === "police-voice-case-documentation" && (p.id === "policeapp" || p.id === "police-voice-case-documentation")) ||
      (id === "voice-to-text" && (p.id === "police-voice-case-documentation" || p.id === "policeapp"))
  );
}

/* ───────────────────────── Site-level config ───────────────────────── */

export const site = {
  name: "Abdul Mateen Khan",
  handle: "@jjabdulmateee",
  title: "Builder Workstation",
  copyrightYear: 2026,
  tagline:
    "I find real-world friction and use AI to build the software that fixes it.",
  tagline2:
    "Currently applying to the Horowitz Andreessen Academy with this proof-of-work.",
  links: {
    github: "https://github.com/jjabdulmateee",
    email: "mailto:Abdulmateenkhan800@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdul-mateee-780346327/",
  },
  now: {
    status: "Active",
    context: "Applying to HAA",
    focus: "Shipping Campus Apply V2 & HAA Proof-of-Work Portfolio",
    activeBuilds: ["police-voice-case-documentation", "ev-battery-swap", "campus-apply"],
    coreStack: ["TypeScript", "React", "Flutter (Dart 3.9+)", "Firebase", "Python"],
    location: "UTC+5",
  },
} as const;
