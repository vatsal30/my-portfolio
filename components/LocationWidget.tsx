"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Globe } from "@/components/ui/globe";

export function LocationWidget() {
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
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 relative z-10">
                <MapPin className="text-purple-500" size={18} />
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Currently Based In</h3>
            </div>
            
            <div className="absolute inset-x-0 -bottom-20 z-0 h-64 w-full flex items-center justify-center opacity-80 pointer-events-none">
                <Globe />
            </div>
            
            <div className="mt-auto relative z-10 space-y-2">
                <p className="font-medium text-lg text-zinc-900 dark:text-white">Pune, India 📍</p>
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    {time || "00:00:00"} IST
                </div>
            </div>
        </div>
    );
}
