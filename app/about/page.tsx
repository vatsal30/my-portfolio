import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import LLMWrapper from "@/components/LLMWrapper";

export const metadata = {
    title: "About | Vatsal Vora",
    description: "About Vatsal Vora - Senior Software Engineer",
};

export default function AboutPage() {
    return (
        <LLMWrapper llmContent={"# About Me\n\nHey! I'm Vatsal Vora, a Senior Software Engineer based out of India. I like to build high-performance systems and elegant user interfaces."}>
            <div className="container mx-auto px-4 max-w-5xl pt-32 pb-16 space-y-8 min-h-[80vh]">                
                <h1 className="text-4xl md:text-5xl font-bold mb-10 text-zinc-900 dark:text-zinc-100 font-mono tracking-tight opacity-80">
                    About Me
                </h1>

                <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mt-8">
                    {/* Image Column */}
                    <div className="w-full aspect-square md:aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
                        <Image 
                            src="https://github.com/vatsal30.png"
                            alt="Vatsal Vora"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            unoptimized
                        />
                    </div>

                    {/* Text Column */}
                    <div className="space-y-6 text-zinc-600 dark:text-[#9ca3af] leading-relaxed font-mono text-sm md:text-[15px]">
                        <p>
                            Hey! I'm <strong className="text-zinc-900 dark:text-zinc-300 font-semibold">Vatsal Vora</strong> (<a href="https://x.com/vatsal30" target="_blank" className="text-purple-500 flex-none opacity-90 dark:text-purple-400 hover:underline">@vatsal30</a>) — a Senior Software Engineer based out of India. I like to build <span className="underline decoration-purple-500 decoration-wavy underline-offset-4 text-zinc-900 dark:text-zinc-300 font-medium tracking-tight">high-performance systems</span> and elegant user interfaces.
                        </p>
                        <p>
                            My work focuses heavily on backend development, scalable system architecture, and generative AI integrations. Over the past 5 years, I've engineered cloud infrastructure on AWS, deployed enterprise machine learning models, and developed highly trafficked web applications with next-generation frameworks.
                        </p>
                        <p>
                            Outside of software, I enjoy exploring the world of algorithmic challenges, tuning complex models, and staying ahead of the curve with new web technologies. 
                            Feel free to <a href="mailto:vatsalds30@gmail.com" className="text-purple-500 flex-none opacity-90 dark:text-purple-400 hover:underline">shoot me an email</a> if you'd like to chat.
                        </p>
                        
                        <div className="pt-6 flex items-center gap-4 text-[13px] font-semibold text-zinc-500 font-sans uppercase tracking-widest">
                            <a href="https://github.com/vatsal30" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"><Github size={14}/> GitHub</a>
                            <span className="text-zinc-300 dark:text-zinc-800">★</span>
                            <a href="https://linkedin.com/in/vatsal30" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"><Linkedin size={14}/> LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </LLMWrapper>
    );
}
