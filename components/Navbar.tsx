"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { MediaWidget } from "./MediaWidget";

const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/interests", label: "Interests" },
    { path: "/utils", label: "Utils" },
    { path: "/notes", label: "Digital Garden" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl rounded-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
            <div className="px-5 h-14 flex items-center justify-between">
                <Link href="/" className="font-bold text-lg tracking-tighter">
                    Vatsal<span className="text-blue-500">.</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <MediaWidget />
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
