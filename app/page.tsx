"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

interface IndexEntry {
  name: string;
  cat: "core" | "cloud" | "arch" | "ai";
}

interface Project {
  no: string;
  title: string;
  blurb: string;
  metric?: string;
  stack: string[];
  link?: string;
  linkText?: string;
  cover?: string;
  coverPosition?: string;
}

interface LedgerEntry {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
  catalogueRef?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "dossier", numeral: "I", label: "Dossier" },
  { id: "index", numeral: "II", label: "Index" },
  { id: "record", numeral: "III", label: "Record" },
  { id: "ships", numeral: "IV", label: "Ships" },
  { id: "imprint", numeral: "V", label: "Imprint" },
];

const STATS = [
  { value: 3, suffix: "+", label: "Years in the trade" },
  { value: 25, suffix: "K", label: "Installs of HalalChecker AI" },
  { value: 10, suffix: "+", label: "Products shipped & maintained" },
];

const INDEX: IndexEntry[] = [
  { name: "Flutter", cat: "core" },
  { name: "React", cat: "core" },
  { name: "React Native", cat: "core" },
  { name: "Expo", cat: "core" },
  { name: "TypeScript", cat: "core" },
  { name: "Next.js", cat: "core" },
  { name: "Responsive Design", cat: "core" },
  { name: "Node.js", cat: "cloud" },
  { name: "Supabase", cat: "cloud" },
  { name: "PostgreSQL", cat: "cloud" },
  { name: "Firebase", cat: "cloud" },
  { name: "DigitalOcean", cat: "cloud" },
  { name: "GraphQL", cat: "cloud" },
  { name: "tRPC", cat: "arch" },
  { name: "Drizzle ORM", cat: "arch" },
  { name: "BLoC", cat: "arch" },
  { name: "TanStack Query", cat: "arch" },
  { name: "Riverpod", cat: "arch" },
  { name: "Zustand", cat: "arch" },
  { name: "Object-oriented Programming", cat: "arch" },
  { name: "Google Gemini API", cat: "ai" },
  { name: "Google Vision API", cat: "ai" },
  { name: "Groq Whisper", cat: "ai" },
  { name: "Claude API", cat: "ai" },
  { name: "Claude Code", cat: "ai" },
  { name: "Cursor", cat: "ai" },
  { name: "Git", cat: "ai" },
];

const CAT_LABEL: Record<IndexEntry["cat"], string> = {
  core: "Core stack",
  cloud: "Cloud & data",
  arch: "Architecture",
  ai: "AI & tooling",
};

const LEDGER: LedgerEntry[] = [
  {
    company: "Auronex Sdn Bhd",
    role: "Software Engineer · Flutter, React, React Native · Remote",
    period: "Aug 2022 – Present",
    summary:
      "Delivering full-stack web and mobile work for enterprise clients and high-growth startups. Currently building Sphere AI, a greenfield AI social media content suite for 123RF. Prior client work spans Blieve AI for 123RF, YTL Cement Hub, Trackco, Cellmax, and the Hokkien Dictionary.",
    highlights: [
      "Greenfield frontend for an AI marketing platform serving 20K+ creators",
      "Two B2B mobile builds for one of Malaysia's largest industrial clients",
      "Solo design-to-ship work on smaller B2C products in production",
    ],
    catalogueRef: "See § IV for live builds.",
  },
  {
    company: "RF Infinite Sdn Bhd",
    role: "Software Engineer Intern · Flutter · On-site",
    period: "Mar 2022 – Aug 2022",
    summary:
      "Contributed to Pcari.my, an in-house Flutter super app at Cyberjaya with e-commerce and a user-to-user marketplace. Reached 10,000+ downloads during the internship period.",
    highlights: [
      "Shipped Flutter modules into a production super app",
      "Worked across e-commerce and marketplace flows",
    ],
  },
];

const FEATURED: Project = {
  no: "00",
  title: "HalalChecker AI",
  blurb:
    "A solo-built mobile app helping Muslims verify halal food via AI ingredient analysis and barcode scanning. Multi-modal pipeline (Gemini 3 Flash with Grounding, plus Vision OCR), dynamic regional pricing through RevenueCat, and a 6.7% free-to-paid conversion rate. Marketed solo on Meta and TikTok.",
  metric: "25,000+ installs · $700+ MRR · 6.7% free-to-paid · solo built",
  stack: [
    "Flutter",
    "Node.js",
    "Supabase",
    "Gemini 3 Flash",
    "Google Vision",
    "RevenueCat",
    "Riverpod",
    "FCM",
  ],
  link: "https://apps.apple.com/us/app/halalchecker-ai-halal-scanner/id6698880367",
  linkText: "View on App Store",
  cover: "/projects/halalchecker.jpg",
  coverPosition: "20% top",
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "Voxoro",
    blurb:
      "A voice-first expense tracker. Speak naturally, like \"fifty bucks coffee at Starbucks\", and a two-stage AI pipeline parses the audio into a structured transaction with amount, currency, category, and date. ~$0.0005 per transaction across 50+ languages.",
    metric: "Live on App Store · solo built",
    stack: [
      "Expo",
      "React Native",
      "Next.js 16",
      "tRPC v11",
      "Drizzle",
      "PostgreSQL",
      "Groq Whisper",
      "Gemini 3 Flash",
      "RevenueCat",
    ],
    link: "https://apps.apple.com/us/app/voxoro-voice-budget-tracker/id6761206147",
    linkText: "View on App Store",
    cover: "/projects/voxoro.jpg",
    coverPosition: "20% top",
  },
  {
    no: "02",
    title: "Sphere AI",
    blurb:
      "Greenfield AI-powered social media content platform for 123RF. Building core flows for brand onboarding, campaign creation, creative library, post scheduling, and reporting dashboards, with async UX for AI-assisted workflows.",
    stack: ["Next.js", "React", "TypeScript", "React Query", "Zustand"],
    link: "https://sphere.123rf.ai",
    cover: "/projects/sphere.jpg",
    coverPosition: "center top",
  },
  {
    no: "03",
    title: "Blieve AI",
    blurb:
      "GenAI platform for 123RF: AI image generation and editing, AI headshots, AI companions, image-to-video animation. Frontend with Next.js, TypeScript, Shadcn, Konva, Zustand. Pixel-perfect Figma implementation, full SEO.",
    metric: "20,000+ users · $7,000+ MRR",
    stack: ["Next.js", "TypeScript", "Shadcn", "Konva", "Zustand"],
    link: "https://blieve.ai",
    cover: "/projects/blieve.jpg",
    coverPosition: "center top",
  },
  {
    no: "04",
    title: "YTL Cement Hub",
    blurb:
      "B2B mobile tool for Malaysia's largest construction material provider, used across the construction supply chain. GraphQL-driven, React Native + TypeScript.",
    stack: ["React Native", "TypeScript", "GraphQL"],
    link: "http://bit.ly/3U0n5nA",
    cover: "/projects/ytl.jpg",
    coverPosition: "center top",
  },
  {
    no: "05",
    title: "Trackco",
    blurb:
      "B2B inventory and dealer-management app handling stock flow, distributor networks, QR scanning, and a rewards system for distributors across Southeast Asia.",
    metric: "1,000+ downloads",
    stack: ["Flutter"],
    link: "https://smartkood.com/trackco",
    cover: "/projects/trackco.jpg",
    coverPosition: "center top",
  },
  {
    no: "06",
    title: "Hokkien Dictionary",
    blurb:
      "Responsive web app preserving an endangered language. Searchable dictionary with auth and a CRUD dashboard, built in React with TypeScript and Ant Design.",
    stack: ["React", "TypeScript", "Ant Design"],
  },
];

const SCHOOLS = [
  {
    title: "Bachelor of Computer Science (Honours)",
    place: "Universiti Teknologi MARA",
    when: "Feb 2020 – Aug 2022 · Tapah, Perak",
  },
  {
    title: "Diploma in Computer Science",
    place: "Universiti Teknologi MARA",
    when: "May 2017 – Jan 2020 · Segamat, Johor · CGPA 3.57 / 4.00",
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return n;
}

// ─── Atoms ───────────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCountUp(value, active);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-5xl md:text-6xl tab-num text-ink leading-none tracking-tightest">
        {n}
        <span className="text-vermilion">{suffix}</span>
      </span>
      <span className="eyebrow mt-3">{label}</span>
    </div>
  );
}

function FilingTag({ children }: { children: ReactNode }) {
  return <span className="filing-tag">{children}</span>;
}

function SectionHead({
  numeral,
  label,
  caption,
}: {
  numeral: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 items-end mb-12">
      <div className="col-span-12 md:col-span-3">
        <span className="numeral block text-[7rem] md:text-[10rem]">
          §{numeral}
        </span>
      </div>
      <div className="col-span-12 md:col-span-9">
        <div className="rule mb-4" />
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl md:text-5xl tracking-tightest text-ink">
            {label}
          </h2>
          {caption && (
            <span className="eyebrow">{caption}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState<string>("dossier");

  useEffect(() => {
    const handler = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = s.id;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("iskandarzhilmi@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  };

  return (
    <main className="relative min-h-screen overflow-clip">
      {/* Vertical fol. counter */}
      <div className="fol-counter hidden lg:flex">
        {SECTIONS.map((s, i) => (
          <span
            key={s.id}
            className={active === s.id ? "is-active" : ""}
          >
            FOL.{String(i + 1).padStart(2, "0")} · {s.label}
          </span>
        ))}
      </div>

      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-ink">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 pt-5 pb-3 flex items-center justify-between mast-num">
          <span>DOSSIER № 01</span>
          <span className="hidden sm:inline">
            KUALA LUMPUR · MMXXVI
          </span>
          <span>VOL. I · FOL. I/V</span>
        </div>
        <div className="rule-thick" />
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-6 flex items-end justify-between gap-6 flex-wrap">
          <a href="#dossier" className="block leading-none">
            <span className="font-display block text-[2.6rem] sm:text-[4rem] md:text-[5.4rem] tracking-tightest leading-[0.85] text-ink">
              Iskandar
            </span>
            <span className="font-display-italic block text-[2.6rem] sm:text-[4rem] md:text-[5.4rem] tracking-tightest leading-[0.85] -mt-1">
              Hilmi<span className="text-vermilion">.</span>
            </span>
          </a>
          <nav className="flex flex-wrap items-center gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`filing-tag ${
                  active === s.id ? "bg-ink text-paper" : ""
                }`}
              >
                §{s.numeral} · {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="rule" />
      </header>

      {/* ─── Now Shipping strip (HalalChecker highlight) ────────────── */}
      <a
        href="https://apps.apple.com/us/app/halalchecker-ai-halal-scanner/id6698880367"
        target="_blank"
        rel="noopener noreferrer"
        className="now-shipping block group relative z-10"
        aria-label="HalalChecker AI on the App Store"
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-4 flex items-center gap-4 md:gap-6 flex-wrap relative z-10">
          <span className="flex items-center gap-3 shrink-0">
            <span className="pulse-dot" />
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-ink-soft">
              Now shipping ↘
            </span>
          </span>
          <span className="font-display-italic text-xl md:text-2xl tracking-tighter text-ink leading-none">
            HalalChecker AI
          </span>
          <span className="hidden md:flex items-center gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft">
            <span>25,000+ installs</span>
            <span className="text-ink-faint">·</span>
            <span>$700+ MRR</span>
            <span className="text-ink-faint">·</span>
            <span>6.7% free-to-paid</span>
          </span>
          <span className="md:hidden font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft">
            25K+ · $700+ MRR
          </span>
          <span className="ml-auto font-mono text-[10px] tracking-[0.22em] uppercase text-vermilion group-hover:underline">
            View on App Store ↗
          </span>
        </div>
      </a>
      <div className="rule" />

      {/* ─── § 0 — Hero / Lede ────────────────────────────────────────── */}
      <section
        id="dossier"
        className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-24"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left lede */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <div className="eyebrow mb-6">
              The lede ↘ a working introduction
            </div>
            <h1 className="font-display tracking-tightest text-ink leading-[0.9] text-[3rem] sm:text-[4.5rem] md:text-[5.8rem]">
              Engineer{" "}
              <span className="font-display-italic text-vermilion">&</span>{" "}
              indie
              <br />
              <span className="font-display-italic">maker</span> for things
              <br />
              people{" "}
              <span className="hand-underline">actually</span> use
              <span className="caret" />
            </h1>

            <p className="mt-10 max-w-[52ch] text-lg md:text-xl leading-[1.55] text-ink-soft">
              I&apos;m a Malaysia-based developer who treats code as a tool to
              build business value, not just a set of instructions. Three years
              of shipping for clients like{" "}
              <span className="ink-link">123RF</span>, plus my own indie apps
              scaled past twenty-five thousand installs. I bridge robust
              engineering with intuitive product.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {STATS.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3 items-center">
              <a href="#ships" className="filing-tag bg-ink text-paper">
                See the catalogue ↘
              </a>
              <a href="#imprint" className="filing-tag">
                Get in touch
              </a>
              <span className="eyebrow ml-1">Open for select work</span>
            </div>
          </div>

          {/* Right portrait */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              <div className="photo-frame">
                <Image
                  src="/images/profile.jpg"
                  alt="Iskandar Hilmi"
                  width={900}
                  height={1100}
                  priority
                  className="w-full h-auto block"
                />
              </div>
              {/* Stamp overlay */}
              <div className="absolute -top-4 -right-4 md:top-6 md:-right-6 z-10 stamp animate-[stampIn_0.8s_cubic-bezier(0.2,1,0.3,1)_0.4s_forwards] opacity-0">
                <span className="text-center leading-tight">
                  EST. MMXXII
                  <br />
                  KUALA LUMPUR
                </span>
              </div>
              {/* Caption */}
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <span className="eyebrow">Plate I · author at desk</span>
                <span className="eyebrow">Photographic record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── § I — Dossier (about, in body) ───────────────────────────── */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <SectionHead numeral="I" label="On the engineer" caption="Filed under: dossier" />
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <p className="dropcap font-body text-[1.18rem] md:text-[1.32rem] leading-[1.65] text-ink-soft">
                Three years into the trade. I trained as a computer scientist
                in Malaysia, started shipping Flutter apps for clients in
                Cyberjaya, and have spent the years since moving across the
                stack: Flutter, React, React Native, Next.js, Node, Supabase,
                tRPC. Some projects have been quietly large. A B2B app for
                the country&apos;s biggest cement supplier. A generative-AI
                platform for 123RF serving twenty thousand creators, and a
                new AI social media suite I&apos;m currently building for
                them. Others are mine alone. HalalChecker, an AI halal
                scanner I built solo, marketed on TikTok, and grew past
                twenty-five thousand installs and seven hundred dollars MRR.
                And lately Voxoro, a voice-first expense tracker that turns
                &quot;fifty bucks coffee at Starbucks&quot; into a clean
                transaction.
              </p>
              <p className="font-body text-[1.05rem] md:text-[1.18rem] leading-[1.65] text-ink-soft mt-6">
                The throughline is the same. Make things people pick up, use,
                and trust. Engineering that earns its keep.
              </p>
            </div>

            <aside className="col-span-12 md:col-span-4 lg:col-span-4 lg:col-start-9">
              <div className="margin-note">
                FILED UNDER · ENGINEERING · INDIE
                <br />
                CRAFT · MOBILE · WEB · AI
              </div>
              <div className="margin-note mt-4">
                LOCATION · KUALA LUMPUR
                <br />
                MALAYSIA · GMT+8
              </div>
              <div className="margin-note mt-4">
                CURRENTLY ·{" "}
                <span className="text-vermilion">OPEN FOR WORK</span>
                <br />
                CONTRACT · FULL-TIME · ADVISORY
              </div>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* ─── § II — Index (skills as printed index) ───────────────────── */}
      <section
        id="index"
        className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-28"
      >
        <SectionHead
          numeral="II"
          label="Working index"
          caption="An alphabet of tools, in current use"
        />

        <Reveal>
          <div className="grid grid-cols-12 gap-x-12 gap-y-12">
            {(
              ["core", "cloud", "arch", "ai"] as IndexEntry["cat"][]
            ).map((cat) => {
              const items = INDEX.filter((i) => i.cat === cat);
              return (
                <div
                  key={cat}
                  className="col-span-12 sm:col-span-6 lg:col-span-3"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="eyebrow">{CAT_LABEL[cat]}</span>
                    <span className="font-mono text-[10px] text-ink-faint tracking-widest">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="rule mb-3" />
                  <ul className="flex flex-col gap-2">
                    {items.map((it, i) => (
                      <li key={it.name} className="leader">
                        <span className="font-body text-[14px] text-ink">
                          {it.name}
                        </span>
                        <span className="leader-fill" />
                        <span className="font-mono text-[10px] text-ink-faint tabular-nums tracking-widest">
                          {String(i + 1).padStart(3, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ─── § III — Record (experience ledger) ───────────────────────── */}
      <section
        id="record"
        className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-28"
      >
        <SectionHead
          numeral="III"
          label="Record of service"
          caption="A chronological ledger"
        />

        <div className="flex flex-col gap-16">
          {LEDGER.map((entry) => (
            <Reveal key={entry.company}>
              <article className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3 lg:col-span-3">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ink-soft">
                    Period
                  </div>
                  <div className="rule mt-2 mb-3" />
                  <div className="font-display text-2xl md:text-3xl text-ink leading-tight tracking-tighter">
                    {entry.period}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-9 lg:col-span-9">
                  <h3 className="font-display text-3xl md:text-4xl tracking-tightest text-ink">
                    {entry.company}
                  </h3>
                  <p className="font-display-italic text-vermilion text-lg md:text-xl mt-1">
                    {entry.role}
                  </p>
                  <p className="font-body text-[1.05rem] leading-[1.6] text-ink-soft mt-4 max-w-[62ch]">
                    {entry.summary}
                  </p>

                  {entry.highlights && (
                    <ul className="mt-6 space-y-2 max-w-[62ch]">
                      {entry.highlights.map((h, i) => (
                        <li
                          key={h}
                          className="flex gap-3 font-body text-[15px] leading-[1.55] text-ink-soft"
                        >
                          <span className="font-mono text-[10px] tracking-widest text-vermilion pt-[6px] tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.catalogueRef && (
                    <p className="font-mono text-[11px] tracking-wider uppercase text-ink-mute mt-6">
                      <a
                        href="#ships"
                        className="ink-link text-ink hover:text-vermilion"
                      >
                        {entry.catalogueRef}
                      </a>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── § IV — Ships (projects) ──────────────────────────────────── */}
      <section
        id="ships"
        className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-28"
      >
        <SectionHead
          numeral="IV"
          label="Catalogue of ships"
          caption="Things that left the harbour"
        />

        {/* Featured */}
        <Reveal>
          <article className="grid grid-cols-12 gap-6 md:gap-10 pt-2">
            <div className="col-span-12 md:col-span-7">
              {FEATURED.cover && (
                <a
                  href={FEATURED.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block plate plate-featured"
                  aria-label={FEATURED.title}
                >
                  <Image
                    src={FEATURED.cover}
                    alt={`${FEATURED.title} preview`}
                    width={1440}
                    height={1080}
                    style={{
                      objectPosition: FEATURED.coverPosition || "center top",
                    }}
                  />
                </a>
              )}
              <div className="plate-caption">
                <span>Plate № 00 · {FEATURED.title}</span>
                <span>App Store · iOS</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-start gap-4">
                <span className="numeral text-[6rem] md:text-[9rem]">
                  {FEATURED.no}
                </span>
                <div className="pt-3 flex flex-col gap-2">
                  <span className="eyebrow text-vermilion">
                    Specimen of the year
                  </span>
                  <span className="stamp">Solo built</span>
                </div>
              </div>
              <h3 className="font-display text-4xl md:text-5xl tracking-tightest text-ink leading-[0.95] mt-4">
                <span className="font-display-italic">{FEATURED.title}</span>
              </h3>
              {FEATURED.metric && (
                <p className="font-mono text-[12px] tracking-wider uppercase text-vermilion mt-3">
                  {FEATURED.metric}
                </p>
              )}
              <p className="font-body text-[1.05rem] leading-[1.65] text-ink-soft mt-4 max-w-[60ch]">
                {FEATURED.blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FEATURED.stack.map((t) => (
                  <FilingTag key={t}>{t}</FilingTag>
                ))}
              </div>
              {FEATURED.link && (
                <a
                  href={FEATURED.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link inline-flex items-center gap-2 mt-6 font-display-italic text-xl"
                >
                  {FEATURED.linkText} ↗
                </a>
              )}
            </div>
          </article>
        </Reveal>

        <div className="rule my-16" />

        {/* Catalogue grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {PROJECTS.map((p) => (
            <Reveal key={p.title}>
              <article className="flex flex-col h-full">
                {p.cover ? (
                  p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block plate"
                      aria-label={p.title}
                    >
                      <Image
                        src={p.cover}
                        alt={`${p.title} preview`}
                        width={960}
                        height={600}
                        style={{
                          objectPosition: p.coverPosition || "center top",
                        }}
                      />
                    </a>
                  ) : (
                    <div className="plate">
                      <Image
                        src={p.cover}
                        alt={`${p.title} preview`}
                        width={960}
                        height={600}
                        style={{
                          objectPosition: p.coverPosition || "center top",
                        }}
                      />
                    </div>
                  )
                ) : (
                  <div className="plate plate-empty">
                    <span className="font-display-italic text-vermilion text-2xl md:text-3xl tracking-tighter px-4 text-center">
                      {p.title}
                    </span>
                  </div>
                )}
                <div className="plate-caption">
                  <span>Plate № {p.no}</span>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-vermilion transition-colors"
                    >
                      VISIT ↗
                    </a>
                  )}
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="numeral text-[4.2rem] md:text-[5rem]">
                    {p.no}
                  </span>
                </div>
                <div className="rule-vermilion my-2" />
                <h3 className="font-display text-2xl md:text-3xl tracking-tightest text-ink">
                  {p.title}
                </h3>
                {p.metric && (
                  <p className="font-mono text-[11px] tracking-wider uppercase text-ink-soft mt-1">
                    {p.metric}
                  </p>
                )}
                <p className="font-body text-[15px] leading-[1.6] text-ink-soft mt-3 flex-1">
                  {p.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-wider uppercase text-ink-soft border-b border-ink-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Education ────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <Reveal>
          <div className="flex items-baseline justify-between mb-8">
            <span className="eyebrow">Schooling</span>
            <span className="eyebrow">Background record</span>
          </div>
          <div className="rule mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {SCHOOLS.map((s) => (
              <div key={s.title} className="paper-card p-6">
                <h3 className="font-display text-xl md:text-2xl tracking-tighter text-ink leading-tight">
                  {s.title}
                </h3>
                <p className="font-display-italic text-vermilion text-base mt-1">
                  {s.place}
                </p>
                <p className="font-mono text-[11px] tracking-wider uppercase text-ink-mute mt-3">
                  {s.when}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── § V — Imprint (contact) ──────────────────────────────────── */}
      <section
        id="imprint"
        className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-24 md:py-32"
      >
        <SectionHead
          numeral="V"
          label="Imprint & post"
          caption="To send word"
        />

        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 lg:col-span-8">
              <h3 className="font-display tracking-tightest text-ink leading-[0.95] text-[2.6rem] sm:text-[4rem] md:text-[5.2rem]">
                Let&apos;s build
                <br />
                <span className="font-display-italic text-vermilion">
                  something good.
                </span>
              </h3>
              <p className="font-body text-[1.1rem] leading-[1.65] text-ink-soft mt-6 max-w-[58ch]">
                Whether it&apos;s a high-performance mobile app or a scalable
                web platform, drop me a line. I read everything that comes
                through, and reply to most of it.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:iskandarzhilmi@gmail.com"
                    className="font-display-italic text-2xl md:text-3xl ink-link"
                  >
                    iskandarzhilmi@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="filing-tag"
                    aria-label="Copy email address"
                  >
                    {emailCopied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href="https://linkedin.com/in/iskandarhilmi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="filing-tag"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://github.com/iskandarzhilmi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="filing-tag"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>

            <aside className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
              <div className="margin-note">
                ENVELOPE NO. 01
                <br />
                ATTN: ISKANDAR HILMI
                <br />
                KUALA LUMPUR · GMT+8
              </div>
              <div className="margin-note mt-4">
                REPLY WITHIN · 1–2 DAYS
                <br />
                LANGUAGES · EN · MS · 日本語
              </div>
              <div className="mt-6">
                <span className="stamp">Open for work</span>
              </div>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* ─── Colophon ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-ink mt-10">
        <div className="rule-thick" />
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-8 grid grid-cols-12 gap-6 items-baseline">
          <div className="col-span-12 md:col-span-4">
            <span className="font-display-italic text-2xl">
              Iskandar Hilmi<span className="text-vermilion">.</span>
            </span>
          </div>
          <div className="col-span-12 md:col-span-5 mast-num !text-[10.5px] !tracking-[0.22em]">
            Set in Fraunces, Newsreader & JetBrains Mono.
            <br />
            Composed in Kuala Lumpur, MMXXVI.
          </div>
          <div className="col-span-12 md:col-span-3 text-right mast-num">
            © {new Date().getFullYear()} · ALL WORK BY HAND
          </div>
        </div>
      </footer>
    </main>
  );
}
