"use client";

import { useState, useEffect } from "react";
import { Clock, Heart } from "lucide-react";
import { SiGooglegemini } from "react-icons/si";

export function Footer() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const update = () => {
            setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false }));
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full mt-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 pb-24 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-sans font-medium">Made with <Heart size={14} className="text-red-500 animate-pulse fill-red-500" /> by Vatsal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-bold tracking-wide"><SiGooglegemini size={14} className="text-purple-500" /></span></span>
                    <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>All Systems Operational</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {time || "00:00:00"} IST</span>
                </div>
            </div>
        </footer>
    );
}
