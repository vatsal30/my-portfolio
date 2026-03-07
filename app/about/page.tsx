import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import LLMWrapper from "@/components/LLMWrapper";

export const metadata = {
    title: "About | Vatsal Vora",
    description: "About Vatsal Vora - Senior Software Engineer",
};

export default function AboutPage() {
    return (
        <LLMWrapper llmContent={"# About Me\n\nFull-Stack Engineer | Product Architect with 5 years of experience. I build products that work under pressure. My background is rooted in engineering and distributed systems. Superpower: Debugging."}>
            <div className="container mx-auto px-4 max-w-5xl pt-32 pb-16 space-y-12 min-h-[80vh]">                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
                        About Me
                    </h1>
                    <div className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-mono text-zinc-500">
                        Full-Stack Engineer | Product Architect
                    </div>
                </div>

                <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
                    {/* Image Column */}
                    <div className="space-y-6">
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
                            <Image 
                                src="https://github.com/vatsal30.png"
                                alt="Vatsal Vora"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                unoptimized
                            />
                        </div>
                        
                        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4">
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest font-sans">Superpower</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono">
                                <span className="text-purple-600 dark:text-purple-400 font-bold">Debugging.</span> I&apos;m the one you call when the &quot;impossible&quot; bug shows up. I genuinely enjoy the detective work.
                            </p>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="space-y-10 text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono text-sm md:text-base">
                        <div className="space-y-4">
                            <p>
                                I&apos;m a full-stack developer with <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">5 years of experience</strong> building products that don&apos;t just look good, but actually work under pressure. I&apos;ve learned the hard way that a &quot;scalable solution&quot; is only as good as the user experience it supports. I&apos;m a polymath at heart and a relentless debugger. I enjoy the &quot;detective work&quot; of untangling complex system failures and turning them into stable, performant code. I bridge the gap between deep technical architecture and actual impact.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest font-sans flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> My Philosophy
                                </h3>
                                <p className="text-xs leading-relaxed opacity-80 pl-3.5 border-l border-zinc-200 dark:border-zinc-800">
                                    Product-first. I build for the human on the other side of the screen, not just the spec.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest font-sans flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> The Core
                                </h3>
                                <p className="text-xs leading-relaxed opacity-80 pl-3.5 border-l border-zinc-200 dark:border-zinc-800">
                                    Software architecture, full-stack development, and a lot of coffee.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-10">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight"> When I&apos;m not coding...</h2>
                            <ul className="space-y-3 pl-2 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500">🕹️</span>
                                    <span>Catching up on my <strong className="text-zinc-900 dark:text-zinc-200">Gaming</strong> backlog.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500">🌌</span>
                                    <span>Watching <strong className="text-zinc-900 dark:text-zinc-200">Anime</strong> (open for recommendations!).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-purple-500">🛠️</span>
                                    <span>Tinkering with <strong className="text-zinc-900 dark:text-zinc-200">Raspberry Pi</strong> or Arduino when the mood strikes.</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="pt-8 flex items-center gap-6 text-[11px] font-bold text-zinc-500 font-sans uppercase tracking-[0.2em]">
                            <a href="https://github.com/vatsal30" className="hover:text-purple-500 transition-colors flex items-center gap-2"><Github size={14}/> GitHub</a>
                            <a href="https://linkedin.com/in/vatsal30" className="hover:text-purple-500 transition-colors flex items-center gap-2"><Linkedin size={14}/> LinkedIn</a>
                            <a href="mailto:vatsalds30@gmail.com" className="hover:text-purple-500 transition-colors flex items-center gap-2"><Mail size={14}/> Email</a>
                        </div>
                    </div>
                </div>
            </div>
        </LLMWrapper>
    );
}
