"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LLMWrapper from "@/components/LLMWrapper";
import { CareerTabs } from "@/components/CareerTabs";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipWords } from "@/components/ui/FlipWords";
import { testimonialsData } from "@/content/testimonials";
import { featuredProjects } from "@/content/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MoveRight, Download, Music, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FaXTwitter, FaInstagram, FaDiscord } from "react-icons/fa6";
import { TechStack } from "@/components/TechStack";
import { TechBadge } from "@/components/TechBadge";
import { LocationWidget } from "@/components/LocationWidget";
import { GitHubCommitsWidget } from "@/components/GitHubCommitsWidget";
import { LofiWidget } from "@/components/LofiWidget";
import { AbacusClickerWidget } from "@/components/AbacusClickerWidget";

const llmMarkdown = `
# Vatsal Vora - Senior Software Engineer

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
  const [auraActive, setAuraActive] = useState(false);

  return (
    <LLMWrapper llmContent={llmMarkdown}>
      <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-32">
        {/* 1. Hero Section V2 (Minimalist) */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center relative w-full overflow-visible py-20 pb-10">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20 dark:hidden"
            fill="white"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full flex flex-col items-center text-center mt-12 md:mt-0"
          >
            {/* Minimal Portrait */}
            <style>{`
              @keyframes ss-flicker {
                0%, 100% { opacity: 0.8; transform: scale(1); }
                25% { opacity: 1; transform: scale(1.04); }
                50% { opacity: 0.6; transform: scale(0.97); }
                75% { opacity: 1; transform: scale(1.02); }
              }
              @keyframes ss-swell {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
                33% { transform: scale(1.08) rotate(3deg); opacity: 0.9; }
                66% { transform: scale(0.95) rotate(-2deg); opacity: 0.6; }
              }
              @keyframes ss-outer {
                0%, 100% { transform: scale(1); opacity: 0.4; }
                50% { transform: scale(1.15); opacity: 0.7; }
              }
              @keyframes ss-spark {
                0%, 100% { opacity: 0; transform: scaleY(0.5) translateY(0px); }
                40% { opacity: 0.9; transform: scaleY(1.2) translateY(-8px); }
                70% { opacity: 0.5; transform: scaleY(0.9) translateY(-4px); }
              }
              @keyframes ss-portrait-glow {
                0%, 100% { box-shadow: 0 0 20px 4px rgba(250,204,21,0.4), 0 0 50px 10px rgba(251,146,60,0.25); }
                50% { box-shadow: 0 0 35px 8px rgba(250,204,21,0.7), 0 0 80px 20px rgba(251,146,60,0.4); }
              }
            `}</style>

            <div
              className="relative mb-8 cursor-pointer select-none"
              onClick={() => setAuraActive(!auraActive)}
              style={{ width: '160px', height: '160px' }}
            >
              {/* ── Aura layers (only when active) ────────────────── */}
              {auraActive && (<>
                {/* Core bright flash */}
                <div style={{
                  position: 'absolute', inset: '-10px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(253,224,71,0.9) 0%, rgba(250,204,21,0.5) 40%, transparent 70%)',
                  filter: 'blur(8px)',
                  animation: 'ss-flicker 0.4s ease-in-out infinite',
                  zIndex: 1,
                }} />
                {/* Mid ring */}
                <div style={{
                  position: 'absolute', inset: '-28px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(245,158,11,0.3) 50%, transparent 70%)',
                  filter: 'blur(14px)',
                  animation: 'ss-swell 0.7s ease-in-out infinite',
                  zIndex: 1,
                }} />
                {/* Orange outer ring */}
                <div style={{
                  position: 'absolute', inset: '-50px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(234,88,12,0.15) 55%, transparent 75%)',
                  filter: 'blur(22px)',
                  animation: 'ss-swell 1.1s ease-in-out infinite reverse',
                  zIndex: 1,
                }} />
                {/* Wide corona */}
                <div style={{
                  position: 'absolute', inset: '-75px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(250,204,21,0.2) 0%, rgba(251,146,60,0.1) 50%, transparent 70%)',
                  filter: 'blur(36px)',
                  animation: 'ss-outer 1.6s ease-in-out infinite',
                  zIndex: 1,
                }} />
                {/* Upward flame plume */}
                <div style={{
                  position: 'absolute',
                  left: '50%', bottom: '100%',
                  transform: 'translateX(-50%)',
                  width: '80px', height: '120px',
                  background: 'linear-gradient(to top, rgba(250,204,21,0.8) 0%, rgba(251,146,60,0.4) 50%, transparent 100%)',
                  filter: 'blur(18px)',
                  animation: 'ss-spark 0.6s ease-in-out infinite',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  left: '30%', bottom: '90%',
                  transform: 'translateX(-50%)',
                  width: '40px', height: '70px',
                  background: 'linear-gradient(to top, rgba(253,224,71,0.9) 0%, transparent 100%)',
                  filter: 'blur(10px)',
                  animation: 'ss-spark 0.8s ease-in-out infinite 0.2s',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  left: '70%', bottom: '93%',
                  transform: 'translateX(-50%)',
                  width: '35px', height: '60px',
                  background: 'linear-gradient(to top, rgba(251,146,60,0.8) 0%, transparent 100%)',
                  filter: 'blur(10px)',
                  animation: 'ss-spark 0.65s ease-in-out infinite 0.35s',
                  zIndex: 1,
                }} />
              </>)}

              {/* Hover preview glow (subtle purple, no aura active) */}
              {!auraActive && (
                <div className="absolute inset-[-12px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
                    filter: 'blur(12px)',
                  }}
                />
              )}

              {/* Portrait image */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-500"
                style={auraActive ? {
                  borderColor: 'rgba(253,224,71,0.7)',
                  animation: 'ss-portrait-glow 0.8s ease-in-out infinite',
                  zIndex: 10,
                } : {
                  borderColor: 'rgba(161,161,170,0.3)',
                }}
              >
                <Image
                  src="https://github.com/vatsal30.png"
                  alt="Vatsal Vora Profile"
                  width={160}
                  height={160}
                  className={`object-cover w-full h-full transition-all duration-700 ${auraActive ? 'brightness-110 saturate-150' : 'grayscale hover:grayscale-0'}`}
                />
              </div>
            </div>


            {/* Phonetic Name & Noun */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
              Vatsal Vora
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-900/50">
                <span>/væt.səl vɔː.rə/</span>
                <span className="opacity-50">•</span>
                <span>noun</span>
                <span className="opacity-50">•</span>
                <span suppressHydrationWarning>{new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', hour12: false })} IST</span>
                <span className="opacity-50">•</span>
                <LofiWidget />
            </div>

            {/* Bio Paragraphs */}
            <div className="max-w-xl mx-auto space-y-5 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty text-center">
              <p>
                a full-stack developer and <span className="underline decoration-purple-500 decoration-wavy underline-offset-4 text-zinc-900 dark:text-zinc-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">product builder</span> with deep experience across engineering, distributed systems, and user-centric design.
              </p>
              <p>
                a <span className="underline decoration-purple-500 decoration-wavy underline-offset-4 text-zinc-900 dark:text-zinc-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">polymath</span> who bridges technical architecture with business outcomes to create impactful, scalable solutions.
              </p>
            </div>

            {/* Call to Actions - Terminal Style */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <Link
                href="https://x.com/messages/compose?recipient_id=vatsal30"
                target="_blank"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold transition-all hover:scale-105 shadow-md"
              >
                <Briefcase size={14} />
                <span>Available for Hire</span>
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600 text-sm italic font-serif">or</span>
              <Link
                href="/#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <Mail size={14} />
                <span>Email Me</span>
              </Link>
            </div>
            
            {/* Mobile-Only Social Links (Moved from Dock) */}
            <div className="flex items-center justify-center gap-6 mt-10 md:hidden text-zinc-500 dark:text-zinc-400">
                <a href="https://github.com/vatsal30" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Github size={20} /></a>
                <a href="https://linkedin.com/in/vatsal30" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Linkedin size={20} /></a>
                <a href="https://x.com/vatsal30" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><FaXTwitter size={20} /></a>
                <a href="https://www.instagram.com/vatsal._.30/" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><FaInstagram size={20} /></a>
                <a href="mailto:vatsalds30@gmail.com" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Mail size={20} /></a>
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
                className="hidden md:flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all"
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
                  className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors bg-zinc-50 dark:bg-zinc-900/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
              className="md:hidden flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-purple-600 dark:text-purple-400 font-medium"
            >
              View all projects <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>

        {/* 6. Widgets Row (Single Line) */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[220px]">
                <div className="h-full w-full relative md:col-span-1">
                    <LocationWidget />
                </div>
                <div className="h-full w-full md:col-span-2">
                    <GitHubCommitsWidget username="vatsal30" />
                </div>
                <div className="h-full w-full md:col-span-1">
                    <AbacusClickerWidget />
                </div>
            </div>
          </motion.div>
        </section>

      </div>
    </LLMWrapper>
  );
}
