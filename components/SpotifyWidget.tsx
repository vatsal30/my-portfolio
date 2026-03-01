"use client";

import { useEffect, useState } from "react";
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

export function SpotifyWidget() {
    const [data, setData] = useState<NowPlayingData>({ isPlaying: false });

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify/now-playing");
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (e) { }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 60000); // Increased to 60s to avoid Spotify 429 Rate Limits

        return () => clearInterval(interval);
    }, []);

    if (!data.isPlaying) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="spotify"
                initial={{ opacity: 0, scale: 0.9, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.9, width: 0 }}
                className="overflow-hidden border-r border-zinc-200 dark:border-zinc-700 pl-2 pr-2 mr-1"
            >
                <Link
                    href={data.songUrl || "#"}
                    target="_blank"
                    className="flex items-center gap-2 p-1 pr-3 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group h-10"
                >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        {data.albumImageUrl ? (
                            <Image src={data.albumImageUrl} alt="Album Art" fill className="object-cover animate-[spin_10s_linear_infinite]" />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                <SiSpotify className="text-[#1DB954]" size={14} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <SiSpotify className="text-white drop-shadow-md" size={12} />
                        </div>
                    </div>

                    <div className="flex flex-col max-w-[100px] overflow-hidden">
                        <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                            {data.title}
                        </span>
                        <span className="text-[9px] text-zinc-500 dark:text-zinc-400 truncate leading-tight">
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
        </AnimatePresence>
    );
}
