export type ProjectSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  type: string;
  summary: string;
  stack: string[];
  live?: string;
  repo?: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  sections: ProjectSection[];
};

export const PROJECTS: Project[] = [
  {
    slug: "study-room",
    title: "Study Room",
    year: "2026",
    role: "Full-stack developer",
    type: "Collaborative web app",
    summary:
      "A collaborative study platform where peers can focus together in real time — shared rooms, timers, and progress tracking.",
    stack: ["TypeScript", "Next.js", "tRPC", "Prisma", "React", "Tailwind CSS"],
    live: "https://study-room-sooty.vercel.app/",
    repo: "https://github.com/x1yl/Study-Room",
    image: "/projects/study-room.webp",
    imageAlt: "Study Room landing page with the headline Study Better, Together",
    featured: true,
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Studying alone is easy to postpone. Most focus timers are single-player, and group chats are full of distractions. I wanted a room where friends could commit to the same block of focus time.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Real-time study rooms with shared focus sessions",
          "Authentication and persistent user accounts",
          "Pomodoro timers, calendar sync, and progress tracking",
          "A typed end-to-end API with tRPC and a Prisma data model",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Keeping every client in sync when a session starts, pauses, and ends. I used a typed tRPC API and a single Prisma-backed session model so every client reads the same state.",
        ],
      },
      {
        heading: "What I'd change",
        paragraphs: [
          "Add a lightweight guest mode so friends can join from a link before creating an account, and add presence indicators to show who is currently focusing.",
        ],
      },
    ],
  },
  {
    slug: "college-tracker",
    title: "College Application Tracker",
    year: "2025–26",
    role: "Designer & developer",
    type: "Local-first web app",
    summary:
      "A local-first tracker for college applications — deadlines, essays, checklists, and school-specific admissions data parsed from Overgrad pages.",
    stack: ["JavaScript", "localStorage", "Data parsing", "Python"],
    live: "https://college.kevinzheng.fyi",
    repo: "https://github.com/x1yl/college",
    image: "/projects/college-tracker.webp",
    imageAlt:
      "College Application Tracker dashboard showing five colleges, deadlines, and application progress",
    featured: true,
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "College applications spread deadlines, essay drafts, checklists, and admissions stats across a dozen tabs. Most trackers either lock your data in a backend or hide the school-specific numbers that actually help you decide where to apply.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Everything stored locally in the browser, with backup and restore",
          "Overgrad HTML parsing for cohort stats, deadlines, and cost data",
          "Per-school essay workspace, checklist, and notes",
          "Whole-state share links compressed into the URL — no backend",
          "Dark mode and a compact dashboard view",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Compressing the entire tracker into a shareable URL without a server. I gzip the JSON state and base64url-encode it, then route it through my own shortener to keep the final link manageable.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Used for my own applications. It also became the reason I built KZ Links: the share URLs were too long to send.",
        ],
      },
    ],
  },
  {
    slug: "bths-action",
    title: "BTHS Action",
    year: "2024–Present",
    role: "Vice President & web developer",
    type: "Club website",
    summary:
      "The website for a 100+ member volunteer club — events, sign-ups, announcements, and resources in one place.",
    stack: ["TypeScript", "Next.js", "tRPC", "Prisma", "React", "Tailwind CSS"],
    live: "https://bthsaction.org/",
    image: "/projects/bths-action.webp",
    imageAlt:
      "BTHS Action homepage with a photo of club members in a school hallway",
    featured: true,
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A 100+ member club was coordinating volunteer events through chat messages and spreadsheets. Members needed one place to see what was happening and sign up.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Maintained the full-stack club site: events, announcements, gallery, exec team, and resources",
          "Event sign-ups that made it easy for members to find and join volunteer work",
          "As Vice President, ran monthly meetings for 100+ members",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Making the site useful for non-technical members and execs. The navigation, event cards, and update workflow all had to be simple enough that the club could keep the site current without a developer.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "Over 300 volunteer hours contributed through the site, with 100+ members using it to find events.",
        ],
      },
    ],
  },
  {
    slug: "sat-practice",
    title: "SAT Practice",
    year: "2025–26",
    role: "Developer",
    type: "Client-side study tool",
    summary:
      "A full SAT and PSAT question bank with filters, an answer-sheet bubble map, floating Desmos and Excalidraw, and score tracking.",
    stack: ["JavaScript", "Client-side", "Data parsing", "Python"],
    live: "https://sat.kevinzheng.fyi",
    repo: "https://github.com/x1yl/sat",
    image: "/projects/sat-practice.webp",
    imageAlt:
      "SAT Practice section picker showing SAT and PSAT math and English question banks",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Practice tests are behind a paywall or spread across PDFs. I wanted every available question, with explanations, in one place — and no account required.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Full College Board question bank across SAT and PSAT math and English",
          "Domain and difficulty filters with an answer-sheet bubble map",
          "Floating Desmos and Excalidraw tools while practicing",
          "Per-section score tracking, plus import and export of progress",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Keeping thousands of questions fast in the browser. The app is entirely client-side, so I split the data by section and render only the active question set.",
        ],
      },
      {
        heading: "What I'd change",
        paragraphs: [
          "Add a timed full-length test mode and a spaced-repetition queue for missed questions.",
        ],
      },
    ],
  },
  {
    slug: "kz-links",
    title: "KZ Links",
    year: "2025–26",
    role: "Developer",
    type: "Serverless API",
    summary:
      "A serverless link shortener with a 30-day TTL, built for the college tracker's share URLs.",
    stack: ["Vercel", "Upstash", "Serverless", "JavaScript"],
    live: "https://links.kevinzheng.fyi/",
    repo: "https://github.com/x1yl/shorten",
    image: "/projects/kz-links.webp",
    imageAlt: "KZ Links homepage with a URL input and a shorten button",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The college tracker's share links were too long to send. I needed a shortener I could own, with an expiry so old links do not live forever.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "A zero-dependency Upstash REST client",
          "30-day TTL on every short link",
          "Open CORS so any of my sites can mint links",
          "A minimal front end for creating and copying links",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Keeping it dependency-free and edge-friendly. The whole API is a thin wrapper around Upstash's REST API, so there is very little to maintain.",
        ],
      },
      {
        heading: "What I'd change",
        paragraphs: [
          "Add per-link analytics and a custom alias option.",
        ],
      },
    ],
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    year: "2026",
    role: "Designer & developer",
    type: "Personal site",
    summary:
      "This site — a neo-brutalist “Academic Print” portfolio with an animated signature, light and dark themes, case studies, and a floating music player.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    live: "https://kevinzheng.fyi",
    repo: "https://github.com/x1yl/portfolio",
    image: "/projects/portfolio.webp",
    imageAlt:
      "Portfolio homepage with an animated Kevin Zheng signature, availability note, and selected work",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A portfolio should feel like the person who made it, not a template. I wanted something that read like a printed page but still worked like a modern site.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "A typography-led design system with Fraunces, Inter, and JetBrains Mono",
          "A hand-drawn SVG signature that animates on load",
          "Light and dark themes with no flash on first paint",
          "Project case studies, an HTML resume, and a contact form behind Cloudflare Turnstile",
        ],
      },
      {
        heading: "The hard part",
        paragraphs: [
          "Balancing personality with readability. The signature animation and paper texture are deliberately low-contrast so they never compete with the writing.",
        ],
      },
      {
        heading: "What I'd change",
        paragraphs: [
          "Keep the motion quieter and let the projects do more of the talking. This version is the start of that.",
        ],
      },
    ],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
