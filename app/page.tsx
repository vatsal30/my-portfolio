"use client";

import { motion } from "framer-motion";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import LLMWrapper from "@/components/LLMWrapper";
import Link from "next/link";
import { ArrowRight, Code2, Database, Layout, Server, Sparkles } from "lucide-react";

const llmMarkdown = `
# Vector - Software Engineer

## About Me
Hi, I'm Vector, a full-stack developer passionate about building dynamic and responsive web applications. I specialize in React, Next.js, and Node.js.

## Skills
- Frontend: React, Next.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, PostgreSQL, MongoDB
- Tools: Git, Docker, GitHub Actions, AWS

## Experience
- Senior Software Engineer at Tech StartUp Co. (2023 - Present)
- Full Stack Developer at Agency XYZ (2020 - 2023)
- Frontend Intern at Big Corp Inc. (2019 - 2020)

## Projects
- Portfolio Website (Next.js, Tailwind)
- E-Commerce Dashboard (React, Node, PostgreSQL)
- AI Content Generator (OpenAI API, Next.js)
`;

const skills = [
  { name: "Frontend Development", icon: <Layout size={24} />, desc: "React, Next.js, Tailwind CSS" },
  { name: "Backend Architecture", icon: <Server size={24} />, desc: "Node.js, Express, Python" },
  { name: "Database Design", icon: <Database size={24} />, desc: "PostgreSQL, MongoDB, Redis" },
  { name: "Clean Code", icon: <Code2 size={24} />, desc: "Typescript, Jest, CI/CD" },
];

const featuredProjects = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin panel for online stores with real-time analytics.",
    tech: ["Next.js", "Tailwind", "Prisma"],
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat interface with integrated AI models for intelligent responses.",
    tech: ["React", "Express", "OpenAI"],
  },
];

export default function Home() {
  return (
    <LLMWrapper llmContent={llmMarkdown}>
      <div className="container mx-auto px-4 max-w-4xl pt-24 pb-16 space-y-32">
        {/* 1. Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Available for new opportunities</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Vector</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-10">
              A software engineer building beautiful, fast, and accessible digital experiences. I turn complex problems into elegant interfaces.
            </p>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                View My Work
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="px-6 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium transition-colors"
              >
                Contact Me
              </Link>
            </div>
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
            <h2 className="text-3xl font-bold mb-8">What I Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. Experience Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
            <ExperienceTimeline />
          </motion.div>
        </section>

        {/* 4. Projects Preview */}
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
              {featuredProjects.map((project, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((t, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
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
