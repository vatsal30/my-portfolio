"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Testimonial } from "@/content/testimonials";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: Testimonial[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current) {
            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    // Duplicate array natively in React rather than using JS cloneNode so onClick states survive
    const duplicatedItems = [...items, ...items];

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                className={cn(
                    "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap items-start",
                    start && "animate-infinite-scroll-cards",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {duplicatedItems.map((item, idx) => (
                    <TestimonialCard key={item.id + idx} item={item} />
                ))}
            </ul>
        </div>
    );
};

const TestimonialCard = ({ item }: { item: Testimonial }) => {
    const [expanded, setExpanded] = useState(false);

    // If the quote is particularly long, we enable the toggle.
    const isLong = item.quote.length > 200;

    return (
        <li className="w-[350px] h-fit max-w-full relative rounded-2xl border border-zinc-200 dark:border-zinc-800 flex-shrink-0 px-8 py-6 md:w-[450px] bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-colors shadow-sm">
            <div className="flex flex-col justify-between gap-6">
                <div className="relative z-20 text-sm md:text-base leading-[1.6] text-zinc-700 dark:text-zinc-300 font-normal">
                    <span className={cn("whitespace-pre-wrap transition-all duration-300", !expanded && isLong && "line-clamp-4")}>
                        {item.quote}
                    </span>
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 text-sm mt-2 font-medium transition-colors"
                        >
                            {expanded ? "Read less" : "Read more"}
                        </button>
                    )}
                </div>
                <div className="relative z-20 mt-auto flex flex-row items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <span className="flex flex-col gap-1">
                        <span className="text-sm font-semibold leading-[1.6] text-zinc-900 dark:text-zinc-100">
                            {item.name}
                        </span>
                        <span className="text-xs font-medium leading-[1.6] text-zinc-500 dark:text-zinc-400">
                            {item.role} @ {item.company}
                        </span>
                    </span>
                    <Link
                        href={item.linkedinUrl}
                        target="_blank"
                        className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                        title={`Visit ${item.name}'s LinkedIn profile`}
                    >
                        <Linkedin size={18} />
                    </Link>
                </div>
            </div>
        </li>
    );
};
