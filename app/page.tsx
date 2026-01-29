"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowUp,
  faArrowRight,
  faExternalLinkAlt,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ─── Reusable Components ─────────────────────────────────────────────────────

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  summary: string;
  projects: { name: string; description: string; link?: string }[];
  delay: number;
}

function ExperienceCard({
  company,
  role,
  period,
  summary,
  projects,
  delay,
}: ExperienceCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="relative pl-10 pb-12 last:pb-0">
        {/* Timeline */}
        <div className="absolute left-0 top-1.5 timeline-dot" />
        <div className="absolute left-[6.5px] top-5 bottom-0 timeline-line" />

        <div className="card-premium rounded-2xl p-6">
          <div className="mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {company}
            </h3>
            <p className="text-indigo-400 text-sm font-medium">{role}</p>
            <p className="text-gray-500 text-sm">{period}</p>
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">
            {summary}
          </p>

          {projects.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="card-glow rounded-xl bg-white/[0.03] border-l-2 border-l-indigo-500/40 border border-white/[0.06] p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white">
                      {project.name}
                    </h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="w-3 h-3"
                        />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  metrics?: string;
  techStack: string[];
  link?: string;
  linkText?: string;
  featured?: boolean;
  delay: number;
}

function ProjectCard({
  title,
  description,
  metrics,
  techStack,
  link,
  linkText,
  featured = false,
  delay,
}: ProjectCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div
        className={`rounded-2xl h-full flex flex-col overflow-hidden ${
          featured ? "featured-card md:flex-row md:items-stretch" : "card-premium"
        }`}
      >
        {featured && (
          <div className="hidden md:flex md:w-2/5 items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/10 p-8">
            <div className="text-center">
              <span className="text-6xl">🔍</span>
              <p className="text-indigo-300 text-sm mt-3 font-medium">
                AI-Powered
              </p>
            </div>
          </div>
        )}
        <div className={`p-6 flex flex-col flex-1 ${!featured ? "border-t-2 border-t-indigo-500/30" : ""}`}>
          {featured && (
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              Featured Project
            </span>
          )}
          <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
            {title}
          </h3>
          {metrics && (
            <p className="text-sm metric-highlight mb-2">{metrics}</p>
          )}
          <p className="text-gray-400 text-sm leading-relaxed flex-1">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {linkText || "View Project"}
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

interface SkillTag {
  name: string;
  category: "core" | "backend" | "architecture" | "ai";
}

const SKILLS: SkillTag[] = [
  { name: "Flutter", category: "core" },
  { name: "React", category: "core" },
  { name: "React Native", category: "core" },
  { name: "TypeScript", category: "core" },
  { name: "Next.js", category: "core" },
  { name: "Responsive Design", category: "core" },
  { name: "Node.js", category: "backend" },
  { name: "Supabase", category: "backend" },
  { name: "Firebase", category: "backend" },
  { name: "DigitalOcean", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "BLoC", category: "architecture" },
  { name: "React Query", category: "architecture" },
  { name: "Zustand", category: "architecture" },
  { name: "Riverpod", category: "architecture" },
  { name: "OOP", category: "architecture" },
  { name: "Claude API", category: "ai" },
  { name: "Google Vision API", category: "ai" },
  { name: "Cursor", category: "ai" },
  { name: "Claude Code", category: "ai" },
  { name: "Git", category: "ai" },
];

const SKILL_CATEGORY_COLORS: Record<SkillTag["category"], string> = {
  core: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  backend: "bg-purple-500/15 text-purple-300 border-purple-500/25",
  architecture: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  ai: "bg-pink-500/15 text-pink-300 border-pink-500/25",
};

const EXPERIENCES: Omit<ExperienceCardProps, "delay">[] = [
  {
    company: "Auronex Sdn Bhd",
    role: "Software Engineer (Flutter, React, React Native) — Remote",
    period: "Aug 2022 - Present",
    summary:
      "Delivering full-stack web and mobile solutions for enterprise clients and high-growth startups.",
    projects: [
      {
        name: "Blieve AI",
        description:
          "B2C AI image and video generation platform for 123RF. 20,000+ users, $7,000+ MRR. Next.js, TypeScript, Shadcn, Konva, Zustand.",
        link: "https://blieve.ai",
      },
      {
        name: "YTL Cement Hub",
        description:
          "B2B React Native CLI app with TypeScript for Malaysia's largest construction material provider. GraphQL API.",
        link: "http://bit.ly/3U0n5nA",
      },
      {
        name: "Trackco",
        description:
          "B2B stock management Flutter app for complex logistic processes. 1,000+ downloads.",
        link: "https://smartkood.com/trackco",
      },
      {
        name: "Cellmax",
        description:
          "Developed and maintained two Flutter apps for a skincare clinic.",
      },
      {
        name: "Hokkien Dictionary",
        description:
          "B2C responsive React web app with TypeScript and Ant Design to preserve an endangered language.",
      },
    ],
  },
  {
    company: "RF Infinite Sdn Bhd",
    role: "Software Engineer Intern (Flutter) — On-site",
    period: "Mar 2022 - Aug 2022",
    summary:
      "Contributed to the Pcari.my Flutter in-house super app at Cyberjaya, Selangor.",
    projects: [
      {
        name: "Pcari.my",
        description:
          "Flutter super app with e-commerce and user-to-user marketplace. 10,000+ downloads.",
      },
    ],
  },
];

const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Contact"];

const HERO_STATS = [
  { value: "3+", label: "Years Exp." },
  { value: "20K+", label: "App Installs" },
  { value: "8+", label: "Projects Shipped" },
];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const updatePillPosition = useCallback((navId: string) => {
    const linkElement = navItemRefs.current.get(navId);
    const container = navContainerRef.current;
    if (linkElement && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();
      setPillStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = NAV_ITEMS.map((item) => item.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveNav(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeNav) {
      updatePillPosition(activeNav);
    }
  }, [activeNav, updatePillPosition]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* ── Navbar ── */}
      <nav className="navbar-glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-lg font-bold text-white">
            IH<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Nav with Pill */}
          <div
            ref={navContainerRef}
            className="hidden md:flex items-center gap-1 relative rounded-full bg-white/[0.03] border border-white/[0.06] px-1 py-1"
          >
            {activeNav && (
              <span
                className="nav-pill-indicator"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                }}
              />
            )}
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                ref={(el) => {
                  if (el) navItemRefs.current.set(item.toLowerCase(), el);
                }}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className={`relative z-10 px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                  activeNav === item.toLowerCase()
                    ? "text-indigo-300"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="hidden md:inline-flex gradient-border-btn px-4 py-2 text-sm rounded-lg text-indigo-300 transition-all duration-200"
          >
            Get In Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="hidden md:hidden mt-4 pb-4 border-t border-white/5 pt-4"
        >
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  scrollToSection(e, item.toLowerCase());
                  document
                    .getElementById("mobile-menu")
                    ?.classList.add("hidden");
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero (Bento Grid) ── */}
      <section className="hero-gradient min-h-screen flex items-center pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 w-full" ref={heroRef}>
          <motion.div
            style={{ y: heroY }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile: stacked; Desktop: bento 4-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
              {/* Photo cell — mobile first, desktop 2x2 */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:col-span-2 md:row-span-2 order-1 md:order-2 card-premium rounded-2xl overflow-hidden flex items-center justify-center"
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Iskandar Hilmi"
                  width={450}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>

              {/* Headline cell — 2x2 on desktop */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:col-span-2 md:row-span-2 order-2 md:order-1 card-premium rounded-2xl p-8 md:p-10 flex flex-col justify-center"
              >
                <div className="mb-4">
                  <TypeAnimation
                    sequence={[
                      "Hello,",
                      1500,
                      "Selamat datang,",
                      1500,
                      "こんにちは,",
                      1500,
                    ]}
                    wrapper="span"
                    speed={30}
                    className="text-lg text-indigo-400 font-medium"
                    repeat={Infinity}
                  />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 tracking-tightest">
                  Building Scalable Apps
                  <br />
                  <span className="gradient-text">
                    That Solve Real Problems.
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
                  Software Engineer and Indie Maker specializing in Flutter,
                  React, and AI-driven solutions. I turn complex technical
                  requirements into polished, profitable products.
                </p>
              </motion.div>

              {/* Stats cells — 1x1 each */}
              {HERO_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="order-3 card-premium rounded-2xl p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </span>
                  <span className="text-gray-400 text-sm mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}

              {/* CTA cell — spans 1 col on mobile, fills remaining on desktop */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-4 card-premium rounded-2xl p-6 flex items-center justify-center gap-4"
              >
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                  className="gradient-border-btn px-6 py-3 rounded-xl text-indigo-300 font-medium text-sm"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium text-sm transition-all duration-200"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-divider mb-16" />
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              About
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl tracking-tight">
              I&apos;m a Malaysia-based developer who treats code as a tool to
              build business value, not just a set of instructions. With three
              years of experience shipping products for major clients like{" "}
              <span className="text-white font-medium">123RF</span> and scaling
              my own indie apps to thousands of users, I bridge the gap between
              robust engineering and intuitive user experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Skills (Tag Cloud) ── */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Skills
            </p>
            <h2 className="text-3xl font-bold text-white mb-12 tracking-tightest">
              Tools I Work With
            </h2>
          </AnimatedSection>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SKILLS.map((skill) => (
              <motion.span
                key={skill.name}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`px-4 py-2 text-sm rounded-full border ${SKILL_CATEGORY_COLORS[skill.category]} transition-transform hover:scale-105`}
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-8">
            {(
              [
                { key: "core" as const, label: "Core Stack" },
                { key: "backend" as const, label: "Backend & Cloud" },
                { key: "architecture" as const, label: "Architecture" },
                { key: "ai" as const, label: "AI & Tools" },
              ] as const
            ).map((cat) => (
              <span
                key={cat.key}
                className="flex items-center gap-2 text-xs text-gray-500"
              >
                <span
                  className={`w-2 h-2 rounded-full ${SKILL_CATEGORY_COLORS[cat.key].split(" ")[0]}`}
                />
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Experience
            </p>
            <h2 className="text-3xl font-bold text-white mb-12 tracking-tightest">
              Where I&apos;ve Worked
            </h2>
          </AnimatedSection>
          <div className="max-w-3xl">
            {EXPERIENCES.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                {...experience}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Projects
            </p>
            <h2 className="text-3xl font-bold text-white mb-12 tracking-tightest">
              What I&apos;ve Built
            </h2>
          </AnimatedSection>

          {/* Featured: HalalChecker AI — full-width 2-column card */}
          <div className="mb-8">
            <ProjectCard
              title="HalalChecker AI"
              description="A solo-developed mobile app helping Muslims identify halal food instantly using AI image recognition. I handled everything from full-stack development to marketing campaigns on Meta and TikTok."
              metrics="20,000+ installs | $470+ MRR | Solo Built"
              techStack={[
                "Flutter",
                "Node.js",
                "Claude API",
                "Google Vision API",
                "RevenueCat",
                "Supabase",
                "Firebase",
                "Riverpod",
              ]}
              link="https://apps.apple.com/us/app/halalchecker-ai-halal-scanner/id6698880367"
              linkText="View on App Store"
              featured
              delay={0}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard
              title="Blieve AI"
              description="GenAI platform for 123RF enabling AI image generation, editing, and video creation. Built with Next.js and TypeScript."
              metrics="20,000+ users | $7,000+ MRR"
              techStack={["Next.js", "TypeScript", "Shadcn", "Konva", "Zustand"]}
              link="https://blieve.ai"
              delay={100}
            />
            <ProjectCard
              title="YTL Cement Hub"
              description="B2B mobile app for Malaysia's largest construction material provider, serving diverse end users across the construction business."
              techStack={["React Native", "TypeScript", "GraphQL"]}
              link="http://bit.ly/3U0n5nA"
              delay={200}
            />
            <ProjectCard
              title="Trackco"
              description="B2B stock management app handling complex logistic processes with QR scanning capabilities."
              metrics="1,000+ downloads"
              techStack={["Flutter"]}
              link="https://smartkood.com/trackco"
              delay={300}
            />
            <ProjectCard
              title="Cellmax"
              description="Developed and maintained two Flutter apps for a skincare clinic with payment gateway and push notifications."
              techStack={["Flutter"]}
              delay={400}
            />
            <ProjectCard
              title="Hokkien Dictionary"
              description="Responsive web app preserving an endangered language through a searchable dictionary with auth and CRUD dashboard."
              techStack={["React", "TypeScript", "Ant Design"]}
              delay={500}
            />
            <ProjectCard
              title="Pcari.my"
              description="Flutter super app with e-commerce and user-to-user marketplace built during internship at RF Infinite."
              metrics="10,000+ downloads"
              techStack={["Flutter"]}
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Education
            </p>
            <h2 className="text-3xl font-bold text-white mb-12 tracking-tightest">
              Background
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <AnimatedSection delay={0}>
              <div className="card-premium rounded-2xl p-6">
                <h3 className="text-white font-semibold tracking-tight">
                  Bachelor of Computer Science (Honours)
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Universiti Teknologi MARA
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Feb 2020 - Aug 2022 | Tapah, Perak
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="card-premium rounded-2xl p-6">
                <h3 className="text-white font-semibold tracking-tight">
                  Diploma in Computer Science
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Universiti Teknologi MARA
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  May 2017 - Jan 2020 | Segamat, Johor | CGPA: 3.57/4.00
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 contact-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-divider mb-16" />
          <AnimatedSection>
            <p className="section-label text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tightest">
              Let&apos;s Build Something Great.
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg text-lg leading-relaxed">
              Whether you need a high-performance mobile app or a scalable web
              platform, I&apos;m ready to help. Drop me a line.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <a
                  href="mailto:iskandarzhilmi@gmail.com"
                  className="gradient-border-btn pl-6 pr-4 py-3 rounded-l-xl text-indigo-300 font-medium text-sm inline-flex items-center gap-3"
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="w-4 h-4 text-indigo-400"
                  />
                  iskandarzhilmi@gmail.com
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("iskandarzhilmi@gmail.com");
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className="gradient-border-btn px-4 py-3 rounded-r-xl text-indigo-300 text-sm border-l border-l-white/10 inline-flex items-center"
                  aria-label="Copy email"
                >
                  <FontAwesomeIcon
                    icon={emailCopied ? faCheck : faCopy}
                    className={`w-4 h-4 transition-colors ${emailCopied ? "text-green-400" : "text-indigo-400"}`}
                  />
                </button>
              </div>
              <a
                href="https://linkedin.com/in/iskandarhilmi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-indigo-300"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/iskandarzhilmi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-indigo-300"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Iskandar Hilmi. Built with
            purpose.
          </p>
        </div>
      </footer>

      {/* ── Scroll to Top ── */}
      <button
        className={`fixed bottom-8 right-8 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center transition-all duration-300 hover:bg-indigo-500/30 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" />
      </button>
    </div>
  );
}
