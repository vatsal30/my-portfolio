"use client";

import LLMWrapper from "@/components/LLMWrapper";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { AmbientNoiseGenerator } from "@/components/AmbientNoiseGenerator";

export default function ToolkitPage() {
    const llmMarkdown = `
# Developer Toolkit

This is a collection of functional, browser-based utilities built to enhance engineering workflows and focus, demonstrating modern React state management and low-level browser APIs.

### ⏱️ Pomodoro Timer
A fully functional Focus/Break timer engineered with **React Hooks** (\`useState\`, \`useEffect\`) and animated via **Framer Motion**. It uses \`AnimatePresence\` for number ticking and layout animation for the mode switcher tabs.

### 🌊 Ambient Noise Generator (Zero Assets)
An algorithmic soundscape engine built purely with the native browser **Web Audio API**. 
Instead of loading large MP3 files, this component synthetically generates static waveforms and applies algorithmic biquad lowpass filters in real-time to mimic auditory frequencies:
- **Brown Noise**: Deep & Rumble (400Hz cutoff)
- **Pink Noise**: Balanced Rain-like distribution (1000Hz cutoff)
- **White Noise**: High-fidelity static (3000Hz cutoff)

Both components sit inside glassmorphic Tailwind CSS cards that instantly sync with the global Dark/Light mode theme.
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
