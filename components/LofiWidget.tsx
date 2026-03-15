"use client";

import { useEffect, useState, useRef } from "react";
import { Music, Pause } from "lucide-react";

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
        <button
            onClick={toggleLofi}
            className="flex items-center gap-1.5 transition-colors hover:text-purple-600 dark:hover:text-purple-400 group"
            aria-label="Toggle Lofi Music"
        >
            <span className="font-sans uppercase tracking-widest text-[10px] sm:text-xs">LOFI</span>
            {lofiPlaying ? (
                <Pause size={12} className="text-purple-500 animate-pulse fill-purple-500 group-hover:scale-110 transition-transform" />
            ) : (
                <Music size={12} className="text-zinc-400 dark:text-zinc-600 group-hover:text-purple-500 group-hover:scale-110 transition-colors" />
            )}
        </button>
    );
}
