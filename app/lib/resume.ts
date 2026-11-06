export type ResumeEntry = {
  title: string;
  subtitle?: string;
  location?: string;
  date: string;
  bullets: string[];
  href?: string;
};

export const EDUCATION: ResumeEntry[] = [
  {
    title: "Brooklyn Technical High School",
    subtitle: "Mechatronics & Robotics Major · GPA: 3.7",
    location: "Brooklyn, NY",
    date: "Expected June 2027",
    bullets: [
      "Relevant coursework: AP Computer Science A, AP Computer Science Principles, Digital Electronics (PLTW), Drafting & Design Production (PLTW), Robotics Engineering",
    ],
  },
  {
    title: "CUNY City College of Technology (College Now)",
    subtitle: "CST 1101: Problem Solving with Computer Programming",
    location: "New York, NY",
    date: "May 2026",
    bullets: [],
  },
];

export const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Center for Family Life",
    subtitle: "Office Assistant Intern",
    location: "Brooklyn, NY",
    date: "July – August 2025",
    bullets: [
      "Managed and processed documentation for 700+ program participants with 100% accuracy.",
      "Collaborated with a team of three peers to support the administrative team and meet all deadlines.",
      "Helped maintain seamless office operations through filing, organization, and other administrative work.",
    ],
  },
  {
    title: "Workplace Challenge with Duolingo",
    subtitle: "Participant",
    location: "Brooklyn, NY",
    date: "November – December 2025",
    bullets: [
      "Explored the design and prototype process for building an app.",
      "Designed and presented an educational app to a Duolingo panel.",
    ],
  },
];

export const LEADERSHIP: ResumeEntry[] = [
  {
    title: "BTHS Action",
    subtitle: "Vice President",
    location: "Brooklyn, NY",
    date: "May 2024 – Present",
    bullets: [
      "Worked with the President to host monthly club meetings for 100+ members.",
      "Maintain the club website, where members sign up for volunteer events — over 300 volunteer hours contributed.",
    ],
    href: "/projects/bths-action",
  },
];

export const RESUME_PROJECTS: ResumeEntry[] = [
  {
    title: "Study Room",
    subtitle:
      "TypeScript, Next.js, tRPC, Prisma, React",
    date: "2026",
    bullets: [
      "Built a collaborative study platform with authentication and real-time shared study sessions.",
    ],
    href: "/projects/study-room",
  },
  {
    title: "College Application Tracker",
    subtitle: "JavaScript, localStorage, Python",
    date: "2025–26",
    bullets: [
      "Built a local-first tracker with Overgrad HTML parsing, essay workspaces, checklists, and compressed share links.",
    ],
    href: "/projects/college-tracker",
  },
  {
    title: "SAT Practice",
    subtitle: "JavaScript, client-side data, Python",
    date: "2025–26",
    bullets: [
      "Built a full SAT and PSAT question bank with filters, floating tools, and score tracking — entirely in the browser.",
    ],
    href: "/projects/sat-practice",
  },
  {
    title: "KZ Links",
    subtitle: "Vercel, Upstash, serverless",
    date: "2025–26",
    bullets: [
      "Built a zero-dependency link shortener with a 30-day TTL for sharing application-tracker state.",
    ],
    href: "/projects/kz-links",
  },
  {
    title: "Portfolio",
    subtitle: "TypeScript, Next.js, Tailwind CSS, React",
    date: "2026",
    bullets: [
      "Designed and built this site, including its type system, theme toggle, signature animation, and case studies.",
    ],
    href: "/projects/portfolio",
  },
];

export const SKILL_GROUPS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  Frameworks: ["Next.js", "React", "Tailwind CSS", "Node.js", "tRPC", "Prisma"],
  Tools: ["Vercel", "Upstash", "Git & GitHub", "Figma", "Cloudflare"],
  Coursework: [
    "AP Computer Science A",
    "AP Computer Science Principles",
    "Digital Electronics (PLTW)",
    "Drafting & Design (PLTW)",
    "Robotics Engineering",
    "CST 1101",
  ],
  Interests: ["Mechanical engineering", "Robotics", "Design systems"],
};
