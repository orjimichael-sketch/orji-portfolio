/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — single source of truth
 *  Update this file to change anything shown on the website.
 *  No UI component hardcodes personal content.
 *
 *  Values marked `PLACEHOLDER` are waiting for real information.
 *  Never invent experience, metrics, or claims here.
 *  See CONTENT-CHECKLIST.md at the repo root for the full swap-in list.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Which inline icon to render (see src/lib/social-icons.tsx). */
  icon: "github" | "linkedin" | "whatsapp" | "mail" | "arrow";
}

/** Big number shown under a project description (Eloqwnt-style stat row). */
export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  /** Display index, e.g. "01" — rendered large next to the project. */
  index: string;
  name: string;
  /** Category tag rendered as "● Category, Country" in the reference. */
  kind: string;
  description: string;
  role: string;
  tech: string[];
  /** Short, concrete list of what the project actually does. */
  features: string[];
  /**
   * Three stat blocks under the description.
   * Currently descriptive (role / flows / stack) — swap in real metrics
   * when they exist. PLACEHOLDER data, see CONTENT-CHECKLIST.md.
   */
  stats: ProjectStat[];
  links: {
    live?: string;
    github?: string;
  };
  preview: {
    /**
     * Path to a real screenshot inside /public, e.g. "/projects/elysian-market.jpg".
     * PLACEHOLDER until a real screenshot is dropped into public/projects/.
     */
    image?: string;
    /** Domain shown in the browser-frame URL bar (no protocol). */
    domain?: string;
  };
}

export interface ExperienceEntry {
  id: string;
  /** Period as supplied. Leave undefined rather than inventing dates. */
  period?: string;
  title: string;
  org: string;
  context?: string;
  points: string[];
  focus: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  note?: string;
  items: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /**
   * True for sample content that must be replaced before launch.
   * The UI renders these with a small "Sample" tag so nothing fake
   * ever looks like a real endorsement.
   */
  sample: boolean;
}

/* ── Profile ─────────────────────────────────────────────────────────────── */

export const profile = {
  name: "Orji Michael",
  wordmark: "ORJI.MICHAEL",
  wordmarkShort: "ORJI.M",
  role: "Full-Stack Developer & Digital Professional",
  location: "Nigeria",
  availability: "Open to opportunities",
  email: "orjim336@gmail.com",
  /**
   * PLACEHOLDER — the production domain. Used for metadata, sitemap,
   * robots and the OG image. Replace with the real URL when the
   * domain is live.
   */
  siteUrl: "https://orji-michael.dev",
  /**
   * PLACEHOLDER — drop a real portrait into /public/ (e.g. /portrait.jpg)
   * and update this path. A neutral monogram slot renders until then.
   */
  photo: "/portrait.jpg",
  education: {
    school: "Federal University of Technology, Akure",
    shortSchool: "FUTA",
    degree: "B.Sc. Mining Engineering",
    status: "Expected 2031",
  },
  currentFocus: "Full-stack web development — building and shipping complete products",
} as const;

/* ── Navigation ──────────────────────────────────────────────────────────── */

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof nav)[number]["id"] | "home";

/* ── Social links ────────────────────────────────────────────────────────── */

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/orji-michael", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/orjimichael-sketch", icon: "github" },
  // 0815 315 3650 in international format (0 → +234) so the wa.me link opens correctly.
  { label: "WhatsApp", href: "https://wa.me/2348153153650", icon: "whatsapp" },
];

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: "Who I am",
  /** Name split across two display lines. */
  nameLines: ["Orji", "Michael"],
  titleLines: ["Full-Stack Developer", "& Digital Professional"],
  intro:
    "I build complete, functional web applications — and I bring the same care to the people side of the work: clear communication, organized digital operations, and dependable support.",
  primaryCta: { label: "See my work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  meta: [
    { term: "Location", detail: "Nigeria" },
    { term: "Education", detail: "B.Sc. Mining Engineering — FUTA" },
    { term: "Focus", detail: "Full-stack web development" },
  ],
} as const;

/* ── Projects ────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "elysian-market",
    index: "01",
    name: "Elysian Market",
    kind: "E-commerce",
    description:
      "An online storefront built end to end — browsing, cart, and checkout flow backed by a real database.",
    role: "Full-Stack Development",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    features: [
      "Product catalog with category browsing",
      "Cart and checkout flow",
      "Order storage on the backend",
    ],
    stats: [
      { value: "Full-Stack", label: "Role & build" },
      { value: "3 flows", label: "Browse · cart · checkout" },
      { value: "Next.js", label: "Primary stack" },
    ],
    links: {
      live: "https://elsyian-market.netlify.app",
      // github: "https://github.com/…", // add the repo URL when ready
    },
    preview: {
      image: "/projects/elysian-market.jpeg",
      domain: "elsyian-market.netlify.app",
    },
  },
  {
    id: "logistics-platform",
    index: "02",
    // Real product name, from the product's own branding (see screenshot).
    name: "Crown Shine Logistics",
    kind: "Delivery & tracking",
    description:
      "A delivery platform for Crown Shine Logistics — shipments are booked, assigned, and tracked from pickup to destination across Nigeria.",
    role: "Full-Stack Development",
    tech: ["Next.js", "TypeScript", "Node.js", "APIs"],
    features: [
      "Order booking flow",
      "Shipment tracking view",
      "Status updates from the backend",
    ],
    stats: [
      { value: "Full-Stack", label: "Role & build" },
      { value: "Booking → door", label: "Tracked delivery flow" },
      { value: "Live status", label: "Backend-driven updates" },
    ],
    links: {
      live: "https://crownshine-logistics.vercel.app",
    },
    preview: {
      image: "/projects/logistics-platform.jpeg",
      domain: "crownshine-logistics.vercel.app",
    },
  },
  {
    id: "tech-quiz-platform",
    index: "03",
    name: "J's Quiz",
    kind: "Educational product",
    description:
      "A technical skills assessment platform: focused, timed quizzes across frontend, cybersecurity, and product management, with scoring and a tracked result history.",
    role: "Full-Stack Development",
    tech: ["React", "TypeScript", "Node.js", "Databases"],
    features: [
      "Category-based quizzes — frontend, cybersecurity, product",
      "Timed questions with instant scoring",
      "Saved results and progress history",
    ],
    stats: [
      { value: "Full-Stack", label: "Role & build" },
      { value: "Timed scoring", label: "Instant results" },
      { value: "History", label: "Progress saved per user" },
    ],
    links: {
      live: "https://jsqu.netlify.app",
    },
    preview: {
      image: "/projects/tech-quiz-platform.png",
      domain: "jsqu.netlify.app",
    },
  },
  {
    id: "metro-tulip",
    index: "04",
    name: "Metro Tulip",
    kind: "Hospitality",
    description:
      "Marketing site for Metro Tulip Apartment Hotel & Suites — a luxury hotel in Ibadan. Room showcases, amenities, guest reviews, and a reservation flow, with one-tap contact via WhatsApp, phone, and email.",
    role: "Front-End Development",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    features: [
      "Rooms & suites showcase with a reservation form",
      "Amenities, guest reviews, and location sections",
      "One-tap contact — WhatsApp, call, and email",
    ],
    stats: [
      { value: "Front-End", label: "Role & build" },
      { value: "10 room types", label: "Showcased & bookable" },
      { value: "Vanilla JS", label: "Primary stack" },
    ],
    links: {
      live: "https://metrotulip-website.netlify.app",
      // github: "https://github.com/…", // add the repo URL when ready
    },
    preview: {
      image: "/projects/metrotulip.jpeg",
      domain: "metrotulip-website.netlify.app",
    },
  },
];

/* ── About ───────────────────────────────────────────────────────────────── */

export const about = {
  heading: "About",
  title: "I build the product — and I can talk to the people using it.",
  paragraphs: [
    "My work sits between software and the people who depend on it. I develop web applications across the stack — interfaces, APIs, databases — and I've worked on the operational side too: supporting clients directly, coordinating schedules and tasks, handling business communication over email and WhatsApp, and keeping day-to-day digital operations running.",
    "That combination changed how I build. Working with clients taught me that a product isn't finished when the code works — it's finished when the person on the other side can use it without friction. I write interfaces the way I'd explain things to a client: clearly, and without wasted steps.",
    "I'm currently studying Mining Engineering at the Federal University of Technology, Akure, while building software professionally — an unusual pairing, but both are about the same thing: understanding a system deeply enough to make it work.",
  ],
  facts: [
    { term: "Name", detail: "Orji Michael" },
    { term: "Location", detail: "Nigeria" },
    { term: "Education", detail: "B.Sc. Mining Engineering — FUTA (Expected 2031)" },
    { term: "Current focus", detail: "Full-stack web development" },
  ],
} as const;

/* ── What I do (services) ────────────────────────────────────────────────── */

export const whatIDo = {
  heading: "What I do",
  title: "Development first — with the operations experience to back it up.",
  columns: [
    {
      id: "development",
      label: "Development",
      primary: true,
      items: ["Frontend", "Backend", "Full-Stack", "Web Applications", "Responsive Interfaces"],
    },
    {
      id: "digital-operations",
      label: "Digital Operations",
      primary: false,
      items: [
        "Virtual Assistance",
        "Client Communication",
        "Scheduling",
        "Administrative Support",
        "Research",
        "Task Coordination",
      ],
    },
    {
      id: "sales-business",
      label: "Sales & Business",
      primary: false,
      items: [
        "Sales Support",
        "Lead Generation",
        "Customer Interaction",
        "Business Research",
        "Client Communication",
      ],
    },
  ],
} as const;

/* ── Experience ──────────────────────────────────────────────────────────── */

export const experience: {
  heading: string;
  title: string;
  entries: ExperienceEntry[];
} = {
  heading: "Experience",
  title: "Where the work has happened.",
  entries: [
    {
      id: "freelance-dev",
      period: "Present",
      title: "Full-Stack Developer",
      org: "Freelance & project work",
      context:
        "Designing and building complete web products — frontend, backend, and deployment.",
      points: [
        "Built full-stack applications from data model to deployed interface.",
        "Own projects end to end: structure, implementation, and delivery.",
      ],
      focus: ["Next.js", "TypeScript", "Node.js", "Databases"],
    },
    {
      id: "muo-mining",
      title: "Digital Operations & Client Support",
      org: "MUO International Mining Company",
      points: [
        "Handled client communication directly — clear, prompt, and organized.",
        "Managed scheduling and administrative coordination for the team.",
        "Ran business correspondence over WhatsApp Business and email.",
      ],
      focus: ["Client Communication", "Scheduling", "WhatsApp Business", "Email"],
    },
    {
      id: "mercatech",
      title: "Virtual Assistance & Event Coordination",
      org: "Mercatech / Tech Sisters",
      points: [
        "Onboarded new learners and helped them get set up and oriented.",
        "Coordinated virtual sessions and technology events end to end.",
        "Communicated products and services clearly to prospective attendees.",
      ],
      focus: ["Learner Onboarding", "Virtual Sessions", "Event Coordination"],
    },
  ],
};

/* ── Education ───────────────────────────────────────────────────────────── */

export const education = {
  heading: "Education",
  school: "Federal University of Technology, Akure",
  schoolShort: "FUTA",
  degree: "B.Sc. Mining Engineering",
  status: "Expected 2031",
  note: "An engineering degree alongside a self-driven software practice — different fields, same discipline: understand the system, then make it work.",
} as const;

/* ── Skills ──────────────────────────────────────────────────────────────── */

export const skills: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "APIs", "Authentication", "Databases"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "WordPress"],
  },
  {
    id: "professional",
    label: "Professional",
    items: [
      "Client Communication",
      "Virtual Assistance",
      "Customer Support",
      "Sales Support",
      "Research",
      "Scheduling",
      "Digital Operations",
    ],
  },
];

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

/**
 * Questions and answers are written only from facts already in this file
 * (availability, stack, background). No invented clients, dates, or claims.
 */
export const faq: FaqItem[] = [
  {
    q: "What kind of work are you open to?",
    a: "Frontend and full-stack development roles, software engineering internships, freelance projects, and remote opportunities. See the “Currently open to” list above for the full picture.",
  },
  {
    q: "Do you take freelance projects?",
    a: "Yes — complete web products, end to end: interface, API, database, and deployment. Send a message through the contact form describing what you want to build.",
  },
  {
    q: "What is your stack?",
    a: "Next.js, React, TypeScript, and Tailwind CSS on the frontend; Node.js, APIs, authentication, and databases on the backend; Git and GitHub for version control.",
  },
  {
    q: "You study mining engineering — why software?",
    a: "Different fields, same discipline: understand a system deeply enough to make it work. I study at FUTA while building software professionally, and each makes the other sharper.",
  },
  {
    q: "How do I start a conversation?",
    a: "Use the contact form below or email directly — messages go straight to my inbox, and I reply as soon as I can.",
  },
];

/* ── Testimonials ────────────────────────────────────────────────────────── */

/**
 * Real quotes, published as given by each person — only lightly formatted,
 * never embellished. Set `sample: true` on an entry to mark it as a
 * placeholder again; the UI renders a Sample tag for those. See
 * CONTENT-CHECKLIST.md.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "A good student with a creative mind — hardworking and ready to get things done.",
    name: "Sodiq Oladeni",
    role: "Founder, Notzero Innovation Hub",
    sample: false,
  },
  {
    quote:
      "A smart kid whose work is neat, well optimized, and creative.",
    name: "Debbie Aderinsola",
    role: "Product Manager",
    sample: false,
  },
  {
    quote:
      "Innovative and full of ideas — goal driven, good with digital solutions and web and app applications.",
    name: "Mrs. Okewoye",
    role: "Ambassador, Lush Hair",
    sample: false,
  },
];

/* ── Availability ────────────────────────────────────────────────────────── */

export const availability = {
  heading: "Currently open to",
  items: [
    "Frontend Development",
    "Full-Stack Development",
    "Software Engineering Opportunities",
    "Internships",
    "Freelance Projects",
    "Remote Opportunities",
  ],
} as const;

/* ── Contact ─────────────────────────────────────────────────────────────── */

export const contact = {
  heading: "The right developer at the right moment changes everything.",
  sub: "A role, a project, or a question — send a message and I'll get back to you.",
  form: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "What would you like to build, or what role are you hiring for?",
    },
    submit: "Send message",
    submitting: "Sending…",
  },
  success: {
    title: "Message sent.",
    body: "Thanks for reaching out — I'll reply as soon as I can.",
  },
} as const;
