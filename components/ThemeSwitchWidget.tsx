"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeSwitchWidget() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden group min-h-[160px]">
        <div className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-full w-full rounded-lg"></div>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div 
        className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden group min-h-[160px] cursor-pointer hover:border-purple-500/50 transition-colors" 
        onClick={() => setTheme(isDark ? "light" : "dark")}
    >
        <div className="flex items-center justify-between mb-2 relative z-10 w-full">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-xs font-mono">Appearance</h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-3 text-zinc-600 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                >
                    {isDark ? <Moon size={32} /> : <Sun size={32} />}
                    <span className="font-mono text-sm font-semibold tracking-wider">
                        {isDark ? "Dark Mode" : "Light Mode"}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
        
        {/* Subtle glowing halo on hover */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 dark:group-hover:bg-purple-500/10 transition-colors duration-500 pointer-events-none rounded-3xl" />
    </div>
  );
}
