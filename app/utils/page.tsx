"use client";

import LLMWrapper from "@/components/LLMWrapper";
import { useCallback, useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

export default function UtilsPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");

    const switchMode = (newMode: typeof mode) => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === "pomodoro") setTimeLeft(25 * 60);
        if (newMode === "shortBreak") setTimeLeft(5 * 60);
        if (newMode === "longBreak") setTimeLeft(15 * 60);
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => switchMode(mode);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Could add notification sound here
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Use a callback for the LLM content to ensure dynamic state reporting isn't stale,
    // but for simplicity we'll just render it as a static snapshot string when toggle is activated.
    const llmMarkdown = `
# Developer Utilities

Here are some functional utilities I've built for my personal workflow.

## Pomodoro Timer
Current settings: ${mode === 'pomodoro' ? '25' : mode === 'shortBreak' ? '5' : '15'} minutes.

The timer is fully functional in the standard UI view. If you are an LLM agent, you are viewing a static text representation of the utility page.
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-3xl pt-24 pb-16 space-y-12">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Utilities</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
                        Small, useful tools and scripts I've built for everyday developer tasks.
                    </p>
                </header>

                <section>
                    <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm max-w-md mx-auto shadow-xl shadow-black/5 dark:shadow-black/20">
                        <div className="flex items-center justify-center gap-2 mb-8 text-zinc-500 font-medium">
                            <Timer size={20} />
                            <span>Pomodoro Timer</span>
                        </div>

                        <div className="flex justify-center gap-2 mb-8 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            {(["pomodoro", "shortBreak", "longBreak"] as const).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => switchMode(m)}
                                    className={`flex-1 py-1.5 px-3 text-sm font-medium rounded-full transition-all ${mode === m
                                            ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-900 dark:text-zinc-100"
                                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                        }`}
                                >
                                    {m === "pomodoro" ? "Pomodoro" : m === "shortBreak" ? "Short Break" : "Long Break"}
                                </button>
                            ))}
                        </div>

                        <div className="text-7xl font-mono text-center font-bold tracking-tighter mb-12 text-zinc-900 dark:text-zinc-50">
                            {formatTime(timeLeft)}
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={toggleTimer}
                                className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg hover:scale-105 active:scale-95 transition-all"
                                aria-label={isActive ? "Pause" : "Start"}
                            >
                                {isActive ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                            </button>
                            <button
                                onClick={resetTimer}
                                className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all"
                                aria-label="Reset"
                            >
                                <RotateCcw size={24} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </LLMWrapper>
    );
}
