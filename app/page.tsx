"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowUp, faArrowRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ─── Intersection Observer Hook ──────────────────────────────────────────────

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.1, ...options }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.triggerOnce]);

  return [ref, isVisible];
}

// ─── Reusable Components ─────────────────────────────────────────────────────

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface ContactButtonProps {
  href: string;
  icon: IconDefinition;
  label: string;
  external?: boolean;
}

function ContactButton({ href, icon, label, external = false }: ContactButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/10 transition-all duration-300 text-sm text-gray-300 hover:text-white"
    >
      <FontAwesomeIcon icon={icon} className="text-indigo-400 w-4 h-4" />
      {label}
    </a>
  );
}

interface SkillGroupProps {
  title: string;
  skills: string[];
  delay: number;
}

function SkillGroup({ title, skills, delay }: SkillGroupProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="skill-group-card rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-gray-300 border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
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

function ExperienceCard({ company, role, period, summary, projects, delay }: ExperienceCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="relative pl-8 pb-12 last:pb-0">
        {/* Timeline */}
        <div className="absolute left-0 top-1.5 timeline-dot" />
        <div className="absolute left-[5px] top-4 bottom-0 timeline-line" />

        <div className="mb-1">
          <h3 className="text-xl font-bold text-white">{company}</h3>
          <p className="text-indigo-400 text-sm font-medium">{role}</p>
          <p className="text-gray-500 text-sm">{period}</p>
        </div>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">{summary}</p>

        {projects.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="card-glow rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        )}
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
        className={`rounded-2xl p-6 h-full flex flex-col ${
          featured
            ? "featured-card"
            : "bg-white/[0.03] border border-white/[0.06]"
        } card-glow`}
      >
        {featured && (
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
            Featured Project
          </span>
        )}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        {metrics && (
          <p className="text-sm metric-highlight mb-2">{metrics}</p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{description}</p>
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
    </AnimatedSection>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    title: "Core Stack",
    skills: ["Flutter", "React", "React Native", "TypeScript", "Next.js", "Responsive Design"],
  },
  {
    title: "Backend & Cloud",
    skills: ["Node.js", "Supabase", "Firebase", "DigitalOcean", "GraphQL"],
  },
  {
    title: "Architecture & State",
    skills: ["BLoC", "React Query", "Zustand", "Riverpod", "OOP"],
  },
  {
    title: "AI & Tools",
    skills: ["Claude API", "Google Vision API", "Cursor", "Claude Code", "Git"],
  },
];

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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Update active nav based on scroll position
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className={`text-sm transition-colors duration-200 ${
                  activeNav === item.toLowerCase()
                    ? "text-indigo-400"
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
            className="hidden md:inline-flex px-4 py-2 text-sm rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition-all duration-200"
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4 border-t border-white/5 pt-4">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  scrollToSection(e, item.toLowerCase());
                  document.getElementById("mobile-menu")?.classList.add("hidden");
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              <div className="mb-6 opacity-0 animate-fade-in-up">
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

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in-up delay-100">
                Building Scalable Apps
                <br />
                <span className="gradient-text">That Solve Real Problems.</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-8 opacity-0 animate-fade-in-up delay-200">
                Software Engineer and Indie Maker specializing in Flutter, React,
                and AI-driven solutions. I turn complex technical requirements into
                polished, profitable products.
              </p>

              <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up delay-300">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, "projects")}
                  className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm transition-all duration-200"
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
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex-shrink-0 opacity-0 animate-fade-in delay-400">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Iskandar Hilmi"
                  width={450}
                  height={800}
                  className="w-64 md:w-80 h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-divider mb-16" />
          <AnimatedSection>
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              About
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              I&apos;m a Malaysia-based developer who treats code as a tool to build
              business value, not just a set of instructions. With three years of
              experience shipping products for major clients like{" "}
              <span className="text-white font-medium">123RF</span> and scaling my
              own indie apps to thousands of users, I bridge the gap between robust
              engineering and intuitive user experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Skills
            </p>
            <h2 className="text-3xl font-bold text-white mb-12">
              Tools I Work With
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_GROUPS.map((group, index) => (
              <SkillGroup
                key={group.title}
                title={group.title}
                skills={group.skills}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Experience
            </p>
            <h2 className="text-3xl font-bold text-white mb-12">
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
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Projects
            </p>
            <h2 className="text-3xl font-bold text-white mb-12">
              What I&apos;ve Built
            </h2>
          </AnimatedSection>

          {/* Featured: HalalChecker AI */}
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
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Education
            </p>
            <h2 className="text-3xl font-bold text-white mb-12">Background</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <AnimatedSection delay={0}>
              <div className="skill-group-card rounded-2xl p-6">
                <h3 className="text-white font-semibold">
                  Bachelor of Computer Science (Honours)
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Universiti Teknologi MARA
                </p>
                <p className="text-gray-500 text-xs mt-1">Feb 2020 - Aug 2022 | Tapah, Perak</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="skill-group-card rounded-2xl p-6">
                <h3 className="text-white font-semibold">
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
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-divider mb-16" />
          <AnimatedSection>
            <p className="text-sm text-indigo-400 uppercase tracking-wider font-semibold mb-4">
              Contact
            </p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Let&apos;s Build Something Great.
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg">
              Whether you need a high-performance mobile app or a scalable web
              platform, I&apos;m ready to help. Drop me a line.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap gap-3">
              <ContactButton
                href="mailto:iskandarzhilmi@gmail.com"
                icon={faEnvelope}
                label="iskandarzhilmi@gmail.com"
              />
              <ContactButton
                href="https://linkedin.com/in/iskandarhilmi"
                icon={faLinkedin}
                label="LinkedIn"
                external
              />
              <ContactButton
                href="https://github.com/iskandarzhilmi"
                icon={faGithub}
                label="GitHub"
                external
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Iskandar Hilmi. Built with purpose.
          </p>
        </div>
      </footer>

      {/* ── Scroll to Top ── */}
      <button
        className={`fixed bottom-8 right-8 w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center transition-all duration-300 hover:bg-indigo-500/30 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" />
      </button>
    </div>
  );
}
