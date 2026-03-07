"use client";

import { motion } from "framer-motion";
import LLMToggle from "./LLMToggle";
import { Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter, FaInstagram, FaDiscord } from "react-icons/fa6";
import { FloatingDock } from "./ui/FloatingDock";
import { SpotifyWidget } from "./SpotifyWidget";

export default function FloatingBar() {
    const links = [
        // Social & External Links
        {
            title: "GitHub",
            icon: <Github className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "https://github.com/vatsal30",
        },
        {
            title: "LinkedIn",
            icon: <Linkedin className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "https://linkedin.com/in/vatsal30",
        },
        {
            title: "X (Twitter)",
            icon: <FaXTwitter className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "https://x.com/vatsal30",
        },
        {
            title: "Instagram",
            icon: <FaInstagram className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "https://www.instagram.com/vatsal._.30/",
        },
        {
            title: "Discord",
            icon: <FaDiscord className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "https://discord.com/users/vatsal._.30",
        },
        {
            title: "Email",
            icon: <Mail className="h-full w-full text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 group-hover:dark:text-zinc-100 transition-colors" />,
            href: "mailto:vatsalds30@gmail.com",
        },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center p-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg"
        >
            <div className="pl-2 pr-2 border-r border-zinc-200 dark:border-zinc-700 h-10 flex items-center">
                <LLMToggle />
            </div>

            <div className="hidden sm:flex items-center">
                <SpotifyWidget />
            </div>

            {/* Desktop dock (magnification effect) */}
            <div className="hidden md:flex items-center">
                <FloatingDock
                    items={links}
                    desktopClassName="bg-transparent dark:bg-transparent border-none h-12 pb-1 gap-2"
                    mobileClassName=""
                />
            </div>

            {/* Mobile dock (hamburger, visible only below md) */}
            <div className="flex md:hidden items-center pl-1">
                <FloatingDock
                    items={links}
                    desktopClassName="hidden"
                    mobileClassName="mb-1"
                />
            </div>
        </motion.div>
    );
}
