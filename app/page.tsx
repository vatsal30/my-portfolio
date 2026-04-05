import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

import LLMWrapper from "@/components/LLMWrapper";
import { HeroInteractive } from "@/components/HeroInteractive";
import { FadeIn, HeroFadeIn } from "@/components/ui/FadeIn";
import { LiveTimeIST } from "@/components/LiveTimeIST";

const CareerTabs = dynamic(() => import('@/components/CareerTabs').then(mod => mod.CareerTabs));
const InfiniteMovingCards = dynamic(() => import('@/components/ui/InfiniteMovingCards').then(mod => mod.InfiniteMovingCards));
const TechStack = dynamic(() => import('@/components/TechStack').then(mod => mod.TechStack));
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'));
const LocationWidget = dynamic(() => import('@/components/LocationWidget').then(mod => mod.LocationWidget));
const GitHubCommitsWidget = dynamic(() => import('@/components/GitHubCommitsWidget').then(mod => mod.GitHubCommitsWidget));
const AbacusClickerWidget = dynamic(() => import('@/components/AbacusClickerWidget').then(mod => mod.AbacusClickerWidget));
const LofiWidget = dynamic(() => import('@/components/LofiWidget').then(mod => mod.LofiWidget));

import { testimonialsData } from "@/content/testimonials";

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
  return (
    <LLMWrapper llmContent={llmMarkdown}>
      <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-32 relative z-10">
        {/* 1. Hero Section V2 (Minimalist) */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center relative w-full overflow-visible py-20 pb-10">
          <HeroFadeIn className="relative z-10 w-full flex flex-col items-center text-center mt-12 md:mt-0">
            {/* Minimal Portrait with Aura State */}
            <HeroInteractive />

            {/* Phonetic Name & Noun */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
              Vatsal Vora
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-mono text-zinc-600 dark:text-zinc-400 mb-8 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-900/50">
                <span>/væt.səl/</span>
                <span className="opacity-50">•</span>
                <span>noun</span>
                <span className="opacity-50">•</span>
                <LiveTimeIST />
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
            <div className="flex items-center justify-center gap-6 mt-10 md:hidden text-zinc-600 dark:text-zinc-400">
                <a href="https://github.com/vatsal30" target="_blank" aria-label="GitHub Profile" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Github size={20} /></a>
                <a href="https://linkedin.com/in/vatsal30" target="_blank" aria-label="LinkedIn Profile" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Linkedin size={20} /></a>
                <a href="https://x.com/vatsal30" target="_blank" aria-label="Twitter/X Profile" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><FaXTwitter size={20} /></a>
                <a href="https://www.instagram.com/vatsal._.30/" target="_blank" aria-label="Instagram Profile" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><FaInstagram size={20} /></a>
                <a href="mailto:vatsalds30@gmail.com" aria-label="Send an Email" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><Mail size={20} /></a>
            </div>

          </HeroFadeIn>
        </section>

        {/* 2. Skills Section */}
        <section>
          <FadeIn>
            <div className="mb-10 lg:mb-14">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Core Stack</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time with:
              </p>
            </div>
            <TechStack />
          </FadeIn>
        </section>

        {/* 3. Career Section */}
        <section>
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-zinc-600 dark:text-zinc-400 font-mono tracking-widest uppercase text-sm">So Far</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-1 flex items-center gap-4">
                  Career
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium hidden md:block">Need a copy?</span>
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
          </FadeIn>
        </section>

        {/* 4. Testimonials Section */}
        <section>
          <FadeIn>
            <div className="flex flex-col mb-4">
              <span className="text-zinc-600 dark:text-zinc-400 font-mono tracking-widest uppercase text-sm">What people say about me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-1">
                Testimonials
              </h2>
            </div>

            <div className="w-full relative overflow-hidden mt-8 rounded-2xl">
              <InfiniteMovingCards items={testimonialsData} speed="slow" />
            </div>
          </FadeIn>
        </section>

        {/* 5. Projects Preview */}
        <section>
          <FadeIn>
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
          </FadeIn>
        </section>

        {/* 6. Widgets Row (Single Line) */}
        <section>
          <FadeIn>
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
          </FadeIn>
        </section>

      </div>
    </LLMWrapper>
  );
}
