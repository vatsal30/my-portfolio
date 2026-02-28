"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Radio } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NowPlayingData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export function MediaWidget() {
    const [data, setData] = useState<NowPlayingData>({ isPlaying: false });
    const [lofiPlaying, setLofiPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Reliable public Lofi Chillhop stream
    const LOFI_STREAM_URL = "https://stream.zeno.fm/f3wvbbqmdg8uv";

    useEffect(() => {
        // Initialize HTMLAudioElement but do not autoplay
        audioRef.current = new Audio(LOFI_STREAM_URL);
        audioRef.current.loop = true;

        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify/now-playing");
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (e) { }
        };

        // Initial fetch
        fetchNowPlaying();

        // Poll Spotify every 15s to catch song changes
        const interval = setInterval(fetchNowPlaying, 15000);

        return () => {
            clearInterval(interval);
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
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center gap-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="wait">
                {data.isPlaying ? (
                    <motion.div
                        key="spotify"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Link
                            href={data.songUrl || "#"}
                            target="_blank"
                            className="flex items-center gap-3 p-1.5 pr-3 bg-white/80 dark:bg-zinc-900/80 rounded-full border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 group"
                        >
                            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                {data.albumImageUrl ? (
                                    <Image src={data.albumImageUrl} alt="Album Art" fill className="object-cover animate-[spin_10s_linear_infinite]" />
                                ) : (
                                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                        <SiSpotify className="text-[#1DB954]" size={16} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <SiSpotify className="text-white drop-shadow-md" size={14} />
                                </div>
                            </div>

                            <div className="flex flex-col max-w-[120px] sm:max-w-[180px] overflow-hidden">
                                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                    {data.title}
                                </span>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                                    {data.artist}
                                </span>
                            </div>

                            <div className="flex items-end gap-[2px] h-3 ml-1">
                                <span className="w-1 bg-[#1DB954] h-[30%] animate-[bounce_1s_infinite]" />
                                <span className="w-1 bg-[#1DB954] h-[80%] animate-[bounce_1s_infinite_0.2s]" />
                                <span className="w-1 bg-[#1DB954] h-[50%] animate-[bounce_1s_infinite_0.4s]" />
                            </div>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        key="lofi"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={toggleLofi}
                        className="flex items-center gap-3 p-1.5 pr-3 bg-white/80 dark:bg-zinc-900/80 rounded-full border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 cursor-pointer max-w-[160px]"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                            {lofiPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="ml-0.5 fill-current" />}
                        </div>

                        <div className="flex flex-col flex-grow overflow-hidden">
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                {lofiPlaying ? "Lofi Radio" : "Play Lofi"}
                            </span>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
                                {lofiPlaying ? <Radio size={10} className="animate-pulse text-purple-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                                {lofiPlaying ? "Live Stream" : "Chill & Focus"}
                            </span>
                        </div>

                        {lofiPlaying && (
                            <div className="flex items-end gap-[2px] h-3 ml-1 opacity-80">
                                <span className="w-1 bg-purple-500 h-[30%] animate-[bounce_1s_infinite]" />
                                <span className="w-1 bg-purple-500 h-[80%] animate-[bounce_1s_infinite_0.2s]" />
                                <span className="w-1 bg-purple-500 h-[50%] animate-[bounce_1s_infinite_0.4s]" />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
