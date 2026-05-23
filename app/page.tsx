"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";

type Cat = "core" | "cloud" | "arch" | "ai";

interface Skill { name: string; cat: Cat; }
interface Project {
  no: string;
  title: string;
  blurb: string;
  metric?: string;
  stack: string[];
  link?: string;
  cover?: string;
  coverPosition?: string;
}
interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
}

const SECTIONS = [
  { id: "work",     label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack",    label: "Stack" },
  { id: "contact",  label: "Contact" },
];

const STATS = [
  { value: 3,  suffix: "+", label: "Years shipping" },
  { value: 25, suffix: "K", label: "HalalChecker installs" },
  { value: 10, suffix: "+", label: "Products in production" },
];

const CAT_LABEL: Record<Cat, string> = {
  core:  "Core",
  cloud: "Cloud & Data",
  arch:  "Architecture",
  ai:    "AI & Tooling",
};

const SKILLS: Skill[] = [
  { name: "Flutter",          cat: "core" },
  { name: "React",            cat: "core" },
  { name: "React Native",     cat: "core" },
  { name: "Expo",             cat: "core" },
  { name: "TypeScript",       cat: "core" },
  { name: "Next.js",          cat: "core" },
  { name: "Node.js",          cat: "cloud" },
  { name: "Supabase",         cat: "cloud" },
  { name: "PostgreSQL",       cat: "cloud" },
  { name: "Firebase",         cat: "cloud" },
  { name: "DigitalOcean",     cat: "cloud" },
  { name: "GraphQL",          cat: "cloud" },
  { name: "tRPC",             cat: "arch" },
  { name: "Drizzle ORM",      cat: "arch" },
  { name: "BLoC",             cat: "arch" },
  { name: "TanStack Query",   cat: "arch" },
  { name: "Riverpod",         cat: "arch" },
  { name: "Zustand",          cat: "arch" },
  { name: "Gemini API",       cat: "ai" },
  { name: "Google Vision",    cat: "ai" },
  { name: "Groq Whisper",     cat: "ai" },
  { name: "Claude API",       cat: "ai" },
  { name: "Claude Code",      cat: "ai" },
  { name: "Cursor",           cat: "ai" },
];

const JOBS: Job[] = [
  {
    company: "Auronex",
    role: "Software Engineer · Remote",
    period: "2022 — Now",
    summary:
      "Full-stack web and mobile work for enterprise clients and high-growth startups. Currently building Sphere AI, a greenfield AI social content suite for 123RF. Prior work: Blieve AI for 123RF, YTL Cement Hub, Trackco, Cellmax, Hokkien Dictionary.",
    highlights: [
      "Greenfield frontend for an AI marketing platform serving 20K+ creators",
      "Two B2B mobile builds for one of Malaysia's largest industrial clients",
      "Solo design-to-ship on smaller B2C products in production",
    ],
  },
  {
    company: "RF Infinite",
    role: "Software Engineer Intern · On-site",
    period: "2022",
    summary:
      "Contributed to Pcari.my, an in-house Flutter super app in Cyberjaya with e-commerce and a user-to-user marketplace. Reached 10,000+ downloads during the internship.",
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
    "Solo-built mobile app that helps Muslims verify halal food via AI ingredient analysis and barcode scanning. Multi-modal pipeline with Gemini 3 Flash plus Vision OCR, dynamic regional pricing via RevenueCat, 6.7% free-to-paid. Marketed solo on Meta and TikTok.",
  metric: "25,000+ installs · $700+ MRR · 6.7% free-to-paid",
  stack: ["Flutter", "Node.js", "Supabase", "Gemini 3 Flash", "Google Vision", "RevenueCat", "Riverpod"],
  link: "https://apps.apple.com/us/app/halalchecker-ai-halal-scanner/id6698880367",
  cover: "/projects/halalchecker.jpg",
  coverPosition: "center 20%",
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "Voxoro",
    blurb:
      "Voice-first expense tracker. Speak naturally — \"fifty bucks coffee at Starbucks\" — and a two-stage AI pipeline parses the audio into a structured transaction. ~$0.0005 per transaction across 50+ languages.",
    metric: "Live on App Store · solo built",
    stack: ["Expo", "Next.js 16", "tRPC", "Drizzle", "Postgres", "Groq Whisper", "Gemini 3 Flash"],
    link: "https://apps.apple.com/us/app/voxoro-voice-budget-tracker/id6761206147",
    cover: "/projects/voxoro.jpg",
    coverPosition: "center 20%",
  },
  {
    no: "02",
    title: "Sphere AI",
    blurb:
      "Greenfield AI-powered social media content platform for 123RF. Brand onboarding, campaign creation, creative library, post scheduling, reporting — with async UX for AI-assisted workflows.",
    stack: ["Next.js", "React", "TypeScript", "React Query", "Zustand"],
    link: "https://sphere.123rf.ai",
    cover: "/projects/sphere.jpg",
    coverPosition: "center top",
  },
  {
    no: "03",
    title: "Blieve AI",
    blurb:
      "GenAI platform for 123RF: AI image generation, editing, headshots, companions, image-to-video. Pixel-perfect Figma implementation with full SEO.",
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
      "B2B mobile tool for Malaysia's largest construction material provider, used across the construction supply chain. GraphQL-driven, React Native and TypeScript.",
    stack: ["React Native", "TypeScript", "GraphQL"],
    link: "http://bit.ly/3U0n5nA",
    cover: "/projects/ytl.jpg",
    coverPosition: "center top",
  },
  {
    no: "05",
    title: "Trackco",
    blurb:
      "B2B inventory and dealer-management app: stock flow, distributor networks, QR scanning, and rewards for distributors across Southeast Asia.",
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
      "Responsive web app preserving an endangered language. Searchable dictionary with auth and a CRUD dashboard.",
    stack: ["React", "TypeScript", "Ant Design"],
  },
];

const SCHOOLS = [
  {
    title: "Bachelor of Computer Science (Honours)",
    place: "Universiti Teknologi MARA",
    when:  "2020 — 2022 · Tapah, Perak",
  },
  {
    title: "Diploma in Computer Science",
    place: "Universiti Teknologi MARA",
    when:  "2017 — 2020 · Segamat, Johor · CGPA 3.57 / 4.00",
  },
];

const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const useCountUp = (target: number, active: boolean, duration = 1400) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return n;
};

const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
};

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { setActive(true); obs.unobserve(e.target); }
      }),
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCountUp(value, active);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-mono text-3xl md:text-4xl tabular-nums tracking-tight">
        {n}{suffix}
      </span>
      <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
};

const useActiveSection = () => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const handler = () => {
      const top = window.scrollY + 120;
      const current = SECTIONS.reduce((acc, s) => {
        const el = document.getElementById(s.id);
        return el && el.offsetTop <= top ? s.id : acc;
      }, "");
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
};

const Nav = ({ active }: { active: string }) => (
  <nav aria-label="Sections" className="flex items-center gap-5 text-sm">
    {SECTIONS.map(s => (
      <a
        key={s.id}
        href={`#${s.id}`}
        className="link-up text-muted hover:text-fg transition-colors"
        aria-current={active === s.id ? "true" : undefined}
        style={active === s.id ? { color: "var(--fg)" } : undefined}
      >
        {s.label}
      </a>
    ))}
  </nav>
);

const Header = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur transition-[background,border-color] duration-300"
      style={{
        background: scrolled ? "rgba(250,250,249,.85)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="text-sm font-medium tracking-tight">
          Iskandar Hilmi
        </a>
        <Nav active={active} />
      </div>
    </header>
  );
};

const ProjectCard = ({ p }: { p: Project }) => {
  const body = (
    <>
      {p.cover ? (
        <div className="cover">
          <Image
            src={p.cover}
            alt={`${p.title} preview`}
            width={960}
            height={600}
            style={{ objectPosition: p.coverPosition ?? "center top" }}
          />
        </div>
      ) : (
        <div className="cover flex items-center justify-center">
          <span className="text-muted text-sm">{p.title}</span>
        </div>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg md:text-xl tracking-tight">{p.title}</h3>
        <span className="font-mono text-xs text-subtle">{p.no}</span>
      </div>
      {p.metric && (
        <p className="font-mono text-xs text-muted -mt-2">{p.metric}</p>
      )}
      <p className="text-[15px] leading-relaxed text-muted">{p.blurb}</p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-subtle">
        {p.stack.map(t => <li key={t}>{t}</li>)}
      </ul>
    </>
  );
  return p.link ? (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card group"
      aria-label={p.title}
    >
      {body}
      <span className="font-mono text-xs text-muted group-hover:text-fg transition-colors">
        Visit <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </a>
  ) : (
    <article className="card">{body}</article>
  );
};

const Featured = ({ p }: { p: Project }) => (
  <Reveal>
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="grid md:grid-cols-2 gap-8 md:gap-12 group"
    >
      <div className="cover" style={{ aspectRatio: "4 / 3" }}>
        {p.cover && (
          <Image
            src={p.cover}
            alt={`${p.title} preview`}
            width={1440}
            height={1080}
            priority
            style={{ objectPosition: p.coverPosition ?? "center top" }}
          />
        )}
      </div>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
          <span className="dot" />
          Featured
        </div>
        <h3 className="text-3xl md:text-4xl tracking-tight">{p.title}</h3>
        {p.metric && (
          <p className="font-mono text-xs text-muted">{p.metric}</p>
        )}
        <p className="text-[15px] md:text-base leading-relaxed text-muted">
          {p.blurb}
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-subtle">
          {p.stack.map(t => <li key={t}>{t}</li>)}
        </ul>
        <span className="font-mono text-xs text-fg group-hover:translate-x-1 transition-transform">
          View on App Store →
        </span>
      </div>
    </a>
  </Reveal>
);

export default function Home() {
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const swapText = (next: string) => {
    const el = labelRef.current;
    if (!el) return;
    const dur = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur"),
    ) || 200;
    el.classList.add("is-exit");
    timers.current.push(
      window.setTimeout(() => {
        el.textContent = next;
        el.classList.remove("is-exit");
        el.classList.add("is-enter-start");
        void el.offsetHeight; // force reflow so the next change transitions
        el.classList.remove("is-enter-start");
      }, dur),
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("iskandarzhilmi@gmail.com");
    swapText("Copied");
    timers.current.push(window.setTimeout(() => swapText("Copy"), 1500));
  };

  return (
    <>
      <Header />

      <main id="top" className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Hero */}
        <section className="pt-16 md:pt-28 pb-20 md:pb-32">
          <div className="grid lg:grid-cols-[1fr_20rem] gap-10 lg:gap-16 items-start">
            <div>
              <h1 className="animate-rise text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
                Software engineer building mobile, web, and AI products
                <span className="text-muted"> people actually use.</span>
              </h1>

              <p
                className="animate-rise mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted"
                style={{ animationDelay: "80ms" }}
              >
                Malaysia-based developer with three years shipping for enterprise clients and
                indie apps past <span className="text-fg">25,000 installs</span>.
                I treat code as a tool to build product, not just instructions.
              </p>

              <div
                className="animate-rise mt-10 flex flex-wrap items-center gap-x-10 gap-y-6"
                style={{ animationDelay: "160ms" }}
              >
                {STATS.map(s => (
                  <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>

              <div
                className="animate-rise mt-10 flex flex-wrap items-center gap-4 text-sm"
                style={{ animationDelay: "240ms" }}
              >
                <a href="#projects" className="text-fg link">See projects →</a>
                <span className="text-subtle">/</span>
                <a href="#contact" className="text-muted link">Get in touch</a>
              </div>
            </div>

            <figure className="animate-rise hidden lg:block pop-figure" style={{ animationDelay: "120ms" }}>
              <div aria-hidden className="pop-glow" />
              <div className="pop-frame">
                <Image
                  src="/images/profile-cutout.png"
                  alt="Iskandar Hilmi"
                  width={713}
                  height={1035}
                  priority
                  className="pop-img"
                />
              </div>
              <figcaption className="mt-4 font-mono text-xs text-subtle flex items-baseline justify-between">
                <span>Kuala Lumpur</span>
                <span>GMT+8</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-20 md:py-28 border-t border-line">
          <Reveal>
            <header className="mb-12 flex items-baseline justify-between">
              <h2 className="text-2xl md:text-3xl tracking-tight">Work</h2>
              <span className="font-mono text-xs text-muted">01 / Record</span>
            </header>
          </Reveal>

          <ul className="space-y-12">
            {JOBS.map((j, i) => (
              <Reveal key={j.company} delay={i * 100}>
                <li>
                  <article className="grid md:grid-cols-[10rem_1fr] gap-4 md:gap-10">
                    <time className="font-mono text-sm text-muted">{j.period}</time>
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-lg md:text-xl tracking-tight">{j.company}</h3>
                        <p className="text-sm text-muted mt-1">{j.role}</p>
                      </div>
                      <p className="text-[15px] leading-relaxed text-muted max-w-2xl">
                        {j.summary}
                      </p>
                      {j.highlights && (
                        <ul className="mt-2 space-y-1.5 max-w-2xl">
                          {j.highlights.map(h => (
                            <li key={h} className="text-[14px] text-muted pl-4 relative leading-relaxed">
                              <span className="absolute left-0 top-2 w-2 h-px bg-subtle" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 md:py-28 border-t border-line">
          <Reveal>
            <header className="mb-12 flex items-baseline justify-between">
              <h2 className="text-2xl md:text-3xl tracking-tight">Projects</h2>
              <span className="font-mono text-xs text-muted">02 / Catalogue</span>
            </header>
          </Reveal>

          <Featured p={FEATURED} />

          <div className="mt-20 grid md:grid-cols-2 gap-x-10 gap-y-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="py-20 md:py-28 border-t border-line">
          <Reveal>
            <header className="mb-12 flex items-baseline justify-between">
              <h2 className="text-2xl md:text-3xl tracking-tight">Stack</h2>
              <span className="font-mono text-xs text-muted">03 / Index</span>
            </header>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {(Object.keys(CAT_LABEL) as Cat[]).map((cat, i) => {
              const items = SKILLS.filter(s => s.cat === cat);
              return (
                <Reveal key={cat} delay={i * 80}>
                  <div>
                    <header className="flex items-baseline justify-between mb-4 pb-2 border-b border-line">
                      <span className="text-sm font-medium">{CAT_LABEL[cat]}</span>
                      <span className="font-mono text-xs text-subtle">{items.length}</span>
                    </header>
                    <ul className="space-y-2">
                      {items.map(s => (
                        <li key={s.name} className="text-sm text-muted">{s.name}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-16 pt-8 border-t border-line">
              <h3 className="text-sm font-medium mb-4">Education</h3>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                {SCHOOLS.map(s => (
                  <li key={s.title} className="text-sm">
                    <div className="text-fg">{s.title}</div>
                    <div className="text-muted">{s.place}</div>
                    <div className="font-mono text-xs text-subtle mt-1">{s.when}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 md:py-32 border-t border-line">
          <Reveal>
            <header className="mb-12 flex items-baseline justify-between">
              <h2 className="text-2xl md:text-3xl tracking-tight">Contact</h2>
              <span className="font-mono text-xs text-muted">04 / Imprint</span>
            </header>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl">
              <p className="text-3xl md:text-5xl tracking-tight leading-tight">
                Building something?{" "}
                <span className="text-muted">Let&apos;s talk.</span>
              </p>

              <p className="mt-8 text-base md:text-lg leading-relaxed text-muted max-w-xl">
                Mobile, web, or AI — drop me a line. I read everything that comes
                through and reply within a day or two.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:iskandarzhilmi@gmail.com"
                  className="link text-xl md:text-2xl tracking-tight"
                >
                  iskandarzhilmi@gmail.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center justify-center min-h-[40px] min-w-[4.5rem] font-mono text-xs px-3 border border-line rounded-full text-muted hover:text-fg hover:border-fg active:scale-[0.96] transition-[color,border-color,transform] duration-200"
                  aria-label="Copy email address"
                >
                  <span ref={labelRef} className="t-text-swap">Copy</span>
                </button>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <a
                    href="https://linkedin.com/in/iskandarhilmi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-muted hover:text-fg"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/iskandarzhilmi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-muted hover:text-fg"
                  >
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 flex flex-wrap items-baseline justify-between gap-4 text-xs text-muted font-mono">
          <span>Iskandar Hilmi · Kuala Lumpur · GMT+8</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
