"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

const MODE_DURATIONS: Record<TimerMode, number> = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(MODE_DURATIONS.pomodoro);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<TimerMode>("pomodoro");

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(MODE_DURATIONS[newMode]);
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODE_DURATIONS[mode]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const calculateProgress = () => {
        const total = MODE_DURATIONS[mode];
        return ((total - timeLeft) / total) * 100;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // In a real app, play a notification sound here
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    return (
        <div className="relative p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden">
            {/* Animated Background Progress Bar */}
            <motion.div
                className={cn(
                    "absolute bottom-0 left-0 h-1.5 opacity-20",
                    mode === "pomodoro" ? "bg-red-500" : "bg-purple-500"
                )}
                initial={{ width: "0%" }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.5, ease: "linear" }}
            />

            <div className="flex items-center justify-between gap-2 mb-8">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
                    <Timer className={cn("transition-colors duration-500", mode === "pomodoro" ? "text-red-500" : "text-purple-500")} />
                    <h2>Pomodoro Session</h2>
                </div>
            </div>

            <div className="flex justify-center gap-2 mb-8 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative">
                {(["pomodoro", "shortBreak", "longBreak"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => switchMode(m)}
                        className={cn(
                            "relative flex-1 py-2 px-3 text-sm font-semibold rounded-xl transition-all z-10",
                            mode === m ? "text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                    >
                        {mode === m && (
                            <motion.div
                                layoutId="pomodoro-tab"
                                className={cn(
                                    "absolute inset-0 rounded-xl -z-10",
                                    m === "pomodoro" ? "bg-red-500" : "bg-purple-500"
                                )}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {m === "pomodoro" ? "Focus" : m === "shortBreak" ? "Short Break" : "Long Break"}
                    </button>
                ))}
            </div>

            <div className="flex justify-center items-center h-32 mb-12 relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={timeLeft}
                        initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8
                        }}
                        className={cn(
                            "text-8xl md:text-9xl font-mono text-center font-bold tracking-tighter absolute tabular-nums transition-colors duration-500",
                            mode === "pomodoro" ? "text-zinc-900 dark:text-zinc-50" : "text-purple-600 dark:text-purple-400"
                        )}
                    >
                        {formatTime(timeLeft)}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 relative z-10 w-full mb-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTimer}
                    className={cn(
                        "w-20 h-20 flex items-center justify-center rounded-2xl text-white shadow-xl transition-colors duration-500",
                        mode === "pomodoro" ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"
                    )}
                    aria-label={isActive ? "Pause" : "Start"}
                >
                    <AnimatePresence mode="wait">
                        {isActive ? (
                            <motion.div
                                key="pause"
                                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                            >
                                <Pause size={32} className="fill-current" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                            >
                                <Play size={32} className="fill-current ml-2" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetTimer}
                    className="w-20 h-20 flex items-center justify-center rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 shadow-sm"
                    aria-label="Reset"
                >
                    <RotateCcw size={28} />
                </motion.button>
            </div>
        </div>
    );
}
