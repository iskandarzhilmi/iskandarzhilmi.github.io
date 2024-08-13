"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
}

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationClass: string;
}
interface ContactButtonProps {
  href: string;
  icon: IconDefinition;
  text: string;
  external?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  href,
  icon,
  text,
  external = false,
}) => (
  <a
    href={href}
    className='btn btn-primary'
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    <FontAwesomeIcon icon={icon} className='mr-2' />
    {text}
  </a>
);

function AnimatedElement({
  children,
  className,
  style,
  animationClass,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
      style={{
        ...style,
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <>
      <Head>
        <title>Iskandar Hilmi - Software Engineer</title>
      </Head>

      <div
        className={`min-h-screen bg-base-200 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Navbar */}
        <div className='navbar bg-base-100 shadow-lg'>
          <div className='navbar-start'>
            <div className='dropdown'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost lg:hidden'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h8m-8 6h16'
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
              >
                {navItems.map((item, index) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <a className='btn btn-ghost text-xl'>Iskandar Hilmi</a>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className='navbar-end'>
            <a href='#contact' className='btn btn-primary'>
              Get In Touch
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div className='hero min-h-screen bg-base-200 relative overflow-hidden'>
          {/* Background Image */}
          <div className='absolute inset-0 z-0'>
            <Image
              alt='Profile Picture'
              src='/images/profile-picture.png'
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              className='hero-image'
            />
            <div className='absolute inset-0 bg-black opacity-50'></div>
          </div>

          <div className='hero-content text-left text-neutral-content relative z-10 w-full'>
            <div className='container mx-auto px-4 md:px-8 lg:px-16'>
              <AnimatedElement animationClass='animate-fade-in-right'>
                <h1 className='mb-5 text-5xl font-bold'>
                  <TypeAnimation
                    sequence={[
                      "Welcome,",
                      1000,
                      "Selamat datang,",
                      1000,
                      "ようこそ,",
                      1000,
                    ]}
                    wrapper='span'
                    speed={20}
                    style={{ fontSize: "1em", display: "inline-block" }}
                    repeat={Infinity}
                  />
                  <br />
                  I&apos;m{" "}
                  <span className='text-secondary'>Iskandar Hilmi</span>
                </h1>
              </AnimatedElement>
              <AnimatedElement
                animationClass='animate-fade-in-right'
                style={{ animationDelay: "200ms" }}
              >
                <p className='mb-5 max-w-xl'>
                  Software Engineer specializing in Flutter, React, and React
                  Native with 2+ years of experience.
                </p>
              </AnimatedElement>
              <AnimatedElement
                animationClass='animate-bounce-in'
                style={{ animationDelay: "400ms" }}
              >
                <button className='btn btn-primary'>Get In Touch</button>
              </AnimatedElement>

              {/* Flutter and React logos */}
              <AnimatedElement
                animationClass='animate-fade-in-up'
                style={{ animationDelay: "800ms" }}
              >
                <div className='flex items-center mt-4 space-x-4'>
                  <Image
                    src='/images/flutter-kawaii-logo.png'
                    alt='Flutter Logo'
                    height={50}
                    width={0}
                    style={{ width: "auto", height: "50px" }}
                  />
                  <Image
                    src='/images/react-kawaii-logo.png'
                    alt='React Logo'
                    height={40}
                    width={0}
                    style={{ width: "auto", height: "40px" }}
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id='about' className='py-20 bg-base-100'>
          <div className='container mx-auto px-4'>
            <AnimatedElement animationClass='animate-fade-in-up'>
              <h2 className='text-3xl font-bold mb-8 text-center'>About Me</h2>
            </AnimatedElement>
            <AnimatedElement
              animationClass='animate-fade-in-up'
              style={{ animationDelay: "200ms" }}
            >
              <p className='max-w-3xl mx-auto'>
                Versatile software engineer with over 2 years of experience in
                hybrid mobile development with Flutter and React Native, as well
                as front-end development using React, TypeScript, and Next.js.
                Proficient in back-end development using Node.js and Next.js.
                Quick learner, adept problem-solver, and committed to delivering
                high-quality solutions.
              </p>
            </AnimatedElement>
          </div>
        </section>

        {/* Skills Section */}
        <section id='skills' className='py-20 bg-base-200'>
          <div className='container mx-auto px-4'>
            <AnimatedElement animationClass='animate-fade-in-up'>
              <h2 className='text-3xl font-bold mb-8 text-center'>Skills</h2>
            </AnimatedElement>
            <div className='flex flex-wrap justify-center gap-4'>
              {[
                "Flutter",
                "React Native",
                "React",
                "TypeScript",
                "Next.js",
                "Node.js",
                "Git",
                "Supabase",
                "OOP",
                "BLoC",
              ].map((skill, index) => (
                <AnimatedElement
                  key={skill}
                  animationClass='animate-bounce-in'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className='badge badge-lg'>{skill}</div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id='experience' className='py-20 bg-base-100'>
          <div className='container mx-auto px-4'>
            <AnimatedElement animationClass='animate-fade-in-up'>
              <h2 className='text-3xl font-bold mb-8 text-center'>
                Professional Experience
              </h2>
            </AnimatedElement>
            <div className='grid grid-cols-1 gap-8'>
              {[
                {
                  title: "Software Engineer (Flutter, React, React Native)",
                  company: "Auronex Sdn Bhd, Kuala Lumpur, Malaysia",
                  period: "Aug 2022 – Present",
                  description:
                    "Worked on various projects including inventory management, skincare clinic apps, construction material customer app, and web applications using Flutter, React Native, and React.",
                },
                {
                  title: "Part-Time Software Engineer (Flutter)",
                  company: "Danapuri Sdn Bhd, Kuala Lumpur, Malaysia",
                  period: "Jan 2023 – Present",
                  description:
                    "Collaborated on in-house Sarawak state government Flutter app projects and enhanced off-the-shelf app codebases.",
                },
                {
                  title: "Software Engineer Intern (Flutter)",
                  company: "RF Infinite Sdn Bhd, Cyberjaya, Selangor, Malaysia",
                  period: "Mar 2022 – Aug 2022",
                  description:
                    "Contributed to the Pcari.my's Flutter in-house super app, which more than 10,000 users downloaded. Focused on feature implementation and bug fixing for the e-commerce functionality and user-to-user marketplace.",
                },
              ].map((job, index) => (
                <AnimatedElement
                  key={job.title}
                  animationClass='animate-fade-in-up'
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className='card bg-base-200 shadow-xl'>
                    <div className='card-body'>
                      <h2 className='card-title'>{job.title}</h2>
                      <h3 className='text-sm opacity-70'>{job.company}</h3>
                      <p className='text-sm opacity-70'>{job.period}</p>
                      <p>{job.description}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='py-20 bg-base-200'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold mb-8 text-center animate-fade-in-up'>
              Projects
            </h2>

            <h3 className='text-2xl font-bold mb-4 animate-fade-in-up delay-200'>
              Professional Projects
            </h3>
            <Slider {...sliderSettings}>
              {[
                {
                  title: "Inventory Management App",
                  company: "Auronex Sdn Bhd",
                  description:
                    "Developed a stock management app using Flutter, including QR scanning and complex logistic processes. Gained over 500 downloads.",
                },
                {
                  title: "Skincare Clinic Apps",
                  company: "Auronex Sdn Bhd",
                  description:
                    "Developed and maintained two Flutter apps for a skincare clinic. Integrated payment gateway and implemented push notifications.",
                },
                {
                  title: "Construction Material Customer App",
                  company: "Auronex Sdn Bhd",
                  description:
                    "Developed a React Native CLI app with TypeScript for a major construction material provider in Malaysia.",
                },
                {
                  title: "Language Preservation Webapp",
                  company: "Auronex Sdn Bhd",
                  description:
                    "Created a responsive React web app with TypeScript, Ant Design, authentication, and CRUD dashboard for language preservation.",
                },
                {
                  title: "Oil & Gas Consultancy Platform",
                  company: "Auronex Sdn Bhd",
                  description:
                    "Contributed features to a React-based web platform with TypeScript and Ant Design for an oil & gas consultancy.",
                },
                {
                  title: "Government E-commerce App",
                  company: "Danapuri Sdn Bhd",
                  description:
                    "Collaborated on a Sarawak state government Flutter app project, focused on e-commerce. Achieved 100+ downloads.",
                },
                {
                  title: "E-commerce Super App",
                  company: "RF Infinite Sdn Bhd (Internship)",
                  description:
                    "Contributed to a Flutter-based super app with over 10,000 downloads. Focused on e-commerce and marketplace features.",
                },
              ].map((project, index) => (
                <div key={index} className='px-2'>
                  <div className='card bg-base-100 shadow-xl h-full'>
                    <div className='card-body'>
                      <h2 className='card-title'>{project.title}</h2>
                      <p className='text-sm opacity-70'>{project.company}</p>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <h3 className='text-2xl font-bold mb-4 mt-12 animate-fade-in-up delay-200'>
              Personal Projects
            </h3>
            <Slider {...sliderSettings}>
              {[
                {
                  title: "CourseCreatorAI",
                  period: "April 2024 - Present",
                  description:
                    "Web application to generate course content using OpenAI's GPT. Built with React.js, Node.js, Next.js, TypeScript, Firebase, Vercel, and DaisyUI.",
                  link: "https://coursecreatorai.co",
                  linkText: "Visit Site",
                },
                {
                  title: "Timerval - Workout Interval Timer",
                  period: "Jun 2020 - Nov 2020",
                  description:
                    "Fitness Flutter app with SQFLite local database and ad integration. Achieved 50+ downloads on Google Play Store.",
                  link: "https://bit.ly/timerval",
                  linkText: "View on Play Store",
                },
              ].map((project, index) => (
                <div key={index} className='px-2'>
                  <div className='card bg-base-100 shadow-xl h-full'>
                    <div className='card-body'>
                      <h2 className='card-title'>{project.title}</h2>
                      <p className='text-sm opacity-70'>{project.period}</p>
                      <p>{project.description}</p>
                      <div className='card-actions justify-end mt-auto'>
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='btn btn-primary btn-sm'
                        >
                          {project.linkText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-20 bg-base-100'>
          <div className='container mx-auto px-4'>
            <AnimatedElement animationClass='animate-fade-in-up'>
              <h2 className='font-bold mb-8 text-center'>Get In Touch</h2>
            </AnimatedElement>
            <AnimatedElement
              animationClass='animate-fade-in-up'
              style={{ animationDelay: "200ms" }}
            >
              <div className='text-center'>
                <p className='mb-6 '>
                  I&apos;m always open to new opportunities and collaborations.
                  Feel free to reach out!
                </p>
                <p className='mb-8 font-semibold'>iskandarzhilmi@gmail.com</p>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                  <ContactButton
                    href='mailto:iskandarzhilmi@gmail.com'
                    icon={faEnvelope}
                    text='Email Me'
                  />
                  <ContactButton
                    href='https://linkedin.com/in/iskandarhilmi'
                    icon={faLinkedin}
                    text='LinkedIn'
                    external
                  />
                  <ContactButton
                    href='https://github.com/iskandarzhilmi'
                    icon={faGithub}
                    text='GitHub'
                    external
                  />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Footer */}
        <AnimatedElement animationClass='animate-fade-in-up'>
          <footer className='footer footer-center p-10 bg-base-100 text-base-content rounded'>
            <div>
              <p>Copyright © 2024 - All rights reserved by Iskandar Hilmi</p>
            </div>
          </footer>
        </AnimatedElement>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out;
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
