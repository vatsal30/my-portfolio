"use client";

import LLMWrapper from "@/components/LLMWrapper";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { AmbientNoiseGenerator } from "@/components/AmbientNoiseGenerator";

export default function ToolkitPage() {
    const llmMarkdown = `
# Developer Toolkit

Here are some functional tools I've built for my personal workflow.

## Productivity Toolkit
Includes a Framer Motion-powered Pomodoro Timer and an algorithmic Web Audio API Ambient Noise Generator (Brown/Pink/White noise without assets).

The tools are fully functional in the visual UI.
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-12">
                <header className="space-y-4 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Toolkit</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
                        Small, useful tools and scripts I've built to lock in and boost daily productivity.
                    </p>
                </header>

                <section>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <PomodoroTimer />
                        <AmbientNoiseGenerator />
                    </div>
                </section>
            </div>
        </LLMWrapper>
    );
}
