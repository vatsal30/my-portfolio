"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Radio } from "lucide-react";
import { motion } from "framer-motion";

export function LofiWidget() {
    const [lofiPlaying, setLofiPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const LOFI_STREAM_URL = "https://stream.zeno.fm/f3wvbbqmdg8uv";

    useEffect(() => {
        audioRef.current = new Audio(LOFI_STREAM_URL);
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleLofi = () => {
        if (!audioRef.current) return;

        if (lofiPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        setLofiPlaying(!lofiPlaying);
    };

    return (
        <div className="flex items-center">
            <motion.div
                key="lofi"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={toggleLofi}
                className="flex items-center gap-2 p-1 pr-3 bg-white/80 dark:bg-zinc-900/80 rounded-full border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 cursor-pointer"
            >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                    {lofiPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="ml-0.5 fill-current" />}
                </div>

                <div className="flex flex-col flex-grow overflow-hidden max-w-[120px]">
                    <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                        {lofiPlaying ? "Lofi Radio" : "Play Lofi"}
                    </span>
                    <span className="text-[9px] text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1 leading-tight">
                        {lofiPlaying ? <Radio size={8} className="animate-pulse text-purple-500" /> : <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                        {lofiPlaying ? "Live Stream" : "Chill & Focus"}
                    </span>
                </div>

                {lofiPlaying && (
                    <div className="flex items-end gap-[2px] h-2.5 ml-1 opacity-80">
                        <span className="w-0.5 bg-purple-500 h-[30%] animate-[bounce_1s_infinite]" />
                        <span className="w-0.5 bg-purple-500 h-[80%] animate-[bounce_1s_infinite_0.2s]" />
                        <span className="w-0.5 bg-purple-500 h-[50%] animate-[bounce_1s_infinite_0.4s]" />
                    </div>
                )}
            </motion.div>
        </div>
    );
}
