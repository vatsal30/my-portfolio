"use client";

import { motion } from "framer-motion";
import LLMToggle from "./LLMToggle";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function FloatingBar() {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 p-2 md:p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg"
        >
            <div className="flex items-center gap-2 px-2 border-r border-zinc-200 dark:border-zinc-700">
                <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    aria-label="GitHub"
                >
                    <Github size={18} />
                </Link>
                <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={18} />
                </Link>
                <Link
                    href="mailto:contact@example.com"
                    className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    aria-label="Email"
                >
                    <Mail size={18} />
                </Link>
            </div>

            <div className="px-2">
                <LLMToggle />
            </div>
        </motion.div>
    );
}
