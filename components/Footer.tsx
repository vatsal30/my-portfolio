"use client";

import { HandHeart } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full pt-8 pb-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-start gap-2">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                    Made with <HandHeart size={16} className="text-red-500 animate-pulse" /> by Vatsal & Gemini
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    © {new Date().getFullYear()} vectorbuilds.dev. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
