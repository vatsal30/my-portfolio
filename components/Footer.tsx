"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm pt-8 pb-12">
            <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} Vector. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <Link href="/notes" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        Digital Garden
                    </Link>
                    <Link href="/interests" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        Interests
                    </Link>
                    <Link href="/utils" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        Utils
                    </Link>
                </div>
            </div>
        </footer>
    );
}
