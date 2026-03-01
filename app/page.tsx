"use client";

import { motion } from "framer-motion";
import LLMWrapper from "@/components/LLMWrapper";
import { CareerTabs } from "@/components/CareerTabs";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipWords } from "@/components/ui/FlipWords";
import { testimonialsData } from "@/content/testimonials";
import { featuredProjects } from "@/content/projects";
import Link from "next/link";
import { ArrowRight, Sparkles, MoveRight, Download } from "lucide-react";
import { TechStack } from "@/components/TechStack";
import { TechBadge } from "@/components/TechBadge";

const llmMarkdown = `
# Vatsal Vora - Senior Software Engineer

## About Me
Senior Software Engineer with 5 years of experience in full-stack development and distributed systems. Expert in building scalable data-driven applications and integrating production-grade ML models into complex workflows. Proven track record of optimizing system performance and leading cross-functional teams.

## Skills
- Languages: Python (Expert), Go, TypeScript, JavaScript, SQL, Bash, C++
- Backend/Cloud: FastAPI, Django, Node.js, AWS (EC2, Lambda), Kubernetes, Docker, CI/CD
- Frontend: React.js, Redux, Vue.js, D3.js, UI/UX Design
- Data & ML: Scikit-learn, Pandas, Deep Learning, MongoDB, Splunk ITSI

## Experience
- Senior Developer at HCLTech (April 2025 - Present)
- Senior Software Engineer at Crest Data (April 2023 - April 2025)
- Software Engineer at Crest Data (May 2021 - March 2023)

## Education
- B.Tech in Computer Engineering, Chandubhai S. Patel Institute of Technology (May 2021)

## Projects
- Portfolio Website (Next.js, Tailwind)
- E-Commerce Dashboard (React, Node, PostgreSQL)
- AI Content Generator (OpenAI API, Next.js)
`;

export default function Home() {
  return (
    <LLMWrapper llmContent={llmMarkdown}>
      <div className="container mx-auto px-4 max-w-4xl pt-24 pb-16 space-y-32">
        {/* 1. Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center relative w-full overflow-visible">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full pt-20 md:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Available for new opportunities</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Vatsal Vora</span>
              <br />
              <span className="text-3xl md:text-5xl mt-2 block font-normal text-zinc-500 dark:text-zinc-600">
                Building <FlipWords words={["scalable applications", "distributed systems", "machine learning models", "beautiful interfaces"]} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-10 mt-6">
            </p>
          </motion.div>
        </section>

        {/* 2. Skills Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 lg:mb-14">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Core Stack</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time with:
              </p>
            </div>
            <TechStack />
          </motion.div>
        </section>

        {/* 3. Career Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 font-mono tracking-widest uppercase text-sm">So Far</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-1 flex items-center gap-4">
                  Career
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium hidden md:block">Need a copy?</span>
                <a
                  href="/resume.pdf"
                  download="Vatsal_Vora_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-sm"
                >
                  <Download size={16} /> Resume
                </a>
              </div>
            </div>

            <CareerTabs />
          </motion.div>
        </section>

        {/* 4. Testimonials Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col mb-4">
              <span className="text-zinc-500 dark:text-zinc-400 font-mono tracking-widest uppercase text-sm">What people say about me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-1">
                Testimonials
              </h2>
            </div>

            <div className="w-full relative overflow-hidden mt-8 rounded-2xl">
              <InfiniteMovingCards items={testimonialsData} speed="slow" />
            </div>
          </motion.div>
        </section>

        {/* 5. Projects Preview */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
              >
                View all projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {featuredProjects.slice(0, 2).map((project, i) => (
                <Link
                  key={i}
                  href={project.link}
                  target="_blank"
                  className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-base max-w-3xl">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-auto">
                    {project.tech.map((t, j) => (
                      <TechBadge key={j} tech={t} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/projects"
              className="md:hidden flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      </div>
    </LLMWrapper>
  );
}
