"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { MediaItem } from "../MediaGrid";

export function Focus3DCard({
    item,
    index,
    hovered,
    setHovered,
}: {
    item: MediaItem;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
        if (!ref.current) return;
    };

    const handleMouseLeave = () => {
        setIsMouseEntered(false);
        if (!ref.current) return;
        ref.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;

        ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    return (
        <a
            href={item.url || "#"}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noreferrer" : undefined}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-xl relative overflow-hidden aspect-[3/4] transition-all duration-300 ease-out bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
                hovered === index && "scale-[1.05] z-10 shadow-2xl"
            )}
            style={{ perspective: "1000px" }}
        >
            <div
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className={cn(
                    "flex flex-col justify-end w-full h-full relative transition-all duration-200 ease-linear",
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
                            isMouseEntered ? "scale-110" : "scale-100"
                        )}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400 text-xs">
                        No Image
                    </div>
                )}

                {/* Focus Card Gradient & Text Re-render on Z axis */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300",
                        hovered === index ? "opacity-100" : "opacity-0"
                    )}
                />

                <div
                    className={cn(
                        "relative p-4 md:p-5 w-full transition-all duration-300 ease-out flex flex-col gap-1",
                        hovered === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                    style={{ transform: isMouseEntered ? 'translateZ(50px)' : 'translateZ(0px)' }}
                >
                    <p className="font-bold text-white text-sm md:text-base line-clamp-2 leading-tight">
                        {item.title}
                    </p>
                    <div className="flex items-center justify-between font-medium">
                        <span className="text-zinc-300 text-xs md:text-sm truncate pr-2">{item.subtitle}</span>
                        {item.rating && (
                            <span className="text-orange-400 font-mono text-xs md:text-sm shrink-0 border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 rounded-md">
                                {item.rating}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}
