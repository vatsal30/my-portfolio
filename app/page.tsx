"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { CareerTabs } from "@/components/CareerTabs";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { testimonialsData } from "@/content/testimonials";
import { featuredProjects } from "@/content/projects";
import { ArrowRight, Download, Music, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FaXTwitter, FaInstagram, FaDiscord } from "react-icons/fa6";
import { TechStack } from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import { LocationWidget } from "@/components/LocationWidget";
import { GitHubCommitsWidget } from "@/components/GitHubCommitsWidget";
import { LofiWidget } from "@/components/LofiWidget";
import { AbacusClickerWidget } from "@/components/AbacusClickerWidget";
import LLMWrapper from "@/components/LLMWrapper";

const llmMarkdown = `
# Vatsal Vora - Full-Stack Engineer | Product Architect

I'm a full-stack developer with 5 years of experience building scalable products that work under pressure. 
My engineering background is rooted in distributed systems and performance optimization.

## Professional Profile
- **Superpower**: Debugging. The one you call for "impossible" bugs.
- **Philosophy**: Product-first mindset. Building for users, not just specs.
- **Experience**: 5 years of building & scaling enterprise-grade applications.

## Technical Skills
- **Back-end**: Python (Expert), Go, Node.js, FastAPI, Django, SQL, K8s, Docker, AWS.
- **Front-end**: TypeScript, React.js, Redux, Vue.js, D3.js, Tailwind CSS.
- **AI/ML**: Scikit-learn, Pandas, OpenAI API, Generative AI integrations.

## Interests
- Gaming, Anime, Raspberry Pi tinkering, Hardware projects.
`;

export default function Home() {
  const [auraActive, setAuraActive] = useState(false);
  const [stars, setStars] = useState<{x: number, y: number, size: number, duration: number, delay: number}[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    })));
  }, []);

  return (
    <LLMWrapper llmContent={llmMarkdown}>
      {/* Dark Mode Page Border Highlight */}
      {auraActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] hidden dark:block border-0 md:border-[1px] border-transparent"
          style={{ animation: 'page-border-glow 6s ease-in-out infinite' }}
        />
      )}
      
      {/* Dark Mode Stars Background */}
      {auraActive && (
        <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                top: star.y + '%',
                left: star.x + '%',
                animation: `star-twinkle ${star.duration}s infinite ${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-32 relative z-10">
        {/* 1. Hero Section V2 (Minimalist) */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center relative w-full overflow-visible py-20 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full flex flex-col items-center text-center mt-12 md:mt-0"
          >
            {/* Minimal Portrait */}
            <style>{`
              @keyframes zen-wave {
                0% { transform: scale(1); opacity: 0.8; border-color: rgba(168, 85, 247, 0.6); }
                100% { transform: scale(2.8); opacity: 0; border-color: rgba(168, 85, 247, 0); }
              }
              @keyframes ss-portrait-glow {
                0%, 100% { box-shadow: 0 0 20px 4px rgba(168,85,247,0.4), 0 0 40px 10px rgba(168,85,247,0.25); }
                50% { box-shadow: 0 0 35px 8px rgba(168,85,247,0.7), 0 0 70px 20px rgba(168,85,247,0.4); }
              }
              @keyframes page-border-glow {
                0%, 100% { box-shadow: inset 0 0 20px rgba(168,85,247,0.2), inset 0 0 40px rgba(168,85,247,0.05); border-color: rgba(168,85,247,0.1); }
                50% { box-shadow: inset 0 0 40px rgba(168,85,247,0.5), inset 0 0 80px rgba(168,85,247,0.2); border-color: rgba(168,85,247,0.4); }
              }
              @keyframes star-twinkle {
                0%, 100% { opacity: 0.1; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8); }
              }
            `}</style>

            <div
              className="relative mb-8 cursor-pointer select-none"
              onClick={() => setAuraActive(!auraActive)}
              style={{ width: '160px', height: '160px' }}
            >
              {/* ── Aura layers (only when active) ────────────────── */}
              {auraActive && (<>
                {/* Zen waves (concentric expanding rings) */}
                <div style={{
                  position: 'absolute', inset: '0', borderRadius: '50%',
                  border: '2px solid rgba(168,85,247,0.8)',
                  animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute', inset: '0', borderRadius: '50%',
                  border: '2px solid rgba(168,85,247,0.8)',
                  animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite 1s',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute', inset: '0', borderRadius: '50%',
                  border: '2px solid rgba(168,85,247,0.8)',
                  animation: 'zen-wave 3s cubic-bezier(0.0, 0, 0.2, 1) infinite 2s',
                  zIndex: 1,
                }} />
                {/* Inner Glow to match waves */}
                <div style={{
                  position: 'absolute', inset: '-10px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 60%)',
                  filter: 'blur(10px)',
                  zIndex: 1,
                  animation: 'ss-portrait-glow 2s ease-in-out infinite'
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
                  borderColor: 'rgba(168,85,247,0.7)',
                  animation: 'ss-portrait-glow 2s ease-in-out infinite',
                  zIndex: 10,
                } : {
                  borderColor: 'rgba(161,161,170,0.3)',
                }}
              >
                <Image
                  src="/images/avatar.png"
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
                <span>/væt.səl/</span>
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
                I build products that don&apos;t just look good, but <span className="underline decoration-purple-500 decoration-wavy underline-offset-4 text-zinc-900 dark:text-zinc-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">actually work</span> when it matters. Full-stack by trade, architect by mindset.
              </p>
              <p>
                I&apos;m the one you call for the <span className="underline decoration-purple-500 decoration-wavy underline-offset-4 text-zinc-900 dark:text-zinc-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">&quot;impossible&quot; bugs</span>. I genuinely enjoy the detective work of untangling complex messes into clean code.
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

            <FeaturedProjects />

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
