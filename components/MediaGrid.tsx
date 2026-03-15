"use client";

import { useState } from "react";
import { Download, ChevronDown, ChevronUp, Play, Clock, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Focus3DCard } from "./ui/Focus3DCard";

export interface MediaItem {
    id: string | number;
    title: string;
    subtitle?: string;    // e.g., "Ep 12", "The Weeknd", "2024"
    imageUrl?: string;
    url?: string;
    rating?: string | number | null;
    duration?: string;    // e.g., "3:45" map for Spotify
    popularity?: number;  // e.g., 85 map for Spotify
}

interface MediaGridProps {
    items: MediaItem[];
    exportName: string;
    initialCount?: number;
    title?: string;
    icon?: React.ReactNode;
    layout?: "grid" | "list";
}

export default function MediaGrid({ items, exportName, initialCount = 10, title, icon, layout = "grid" }: MediaGridProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

    const displayedItems = isExpanded ? items : items.slice(0, initialCount);
    const hasMore = items.length > initialCount;

    const handleExport = () => {
        const dataStr = JSON.stringify(items, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportName);
        linkElement.click();
    };

    if (!items || !items.length) {
        return <p className="text-zinc-600">No items found or unable to load.</p>;
    }

    return (
        <div className="space-y-4">
            {/* Aceternity UI Expandable Card Modal Component Overlay */}
            <AnimatePresence>
                {activeItem && layout === "list" && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                            onClick={() => setActiveItem(null)}
                        />
                        <motion.div
                            layoutId={`card-${activeItem.id}-${activeItem.title}`}
                            className="w-full max-w-[500px] h-auto flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative z-10"
                        >
                            <button onClick={() => setActiveItem(null)} className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 backdrop-blur-md hover:bg-black/70 transition-colors">
                                <X size={20} />
                            </button>
                            <motion.div layoutId={`image-${activeItem.id}-${activeItem.title}`} className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                                {activeItem.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={activeItem.imageUrl} className="w-full h-full object-cover" alt={activeItem.title} />
                                ) : (
                                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent" />
                            </motion.div>
                            <div className="p-6 sm:p-8 flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <motion.div layoutId={`text-${activeItem.id}-${activeItem.title}`} className="flex flex-col">
                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-balance">{activeItem.title}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 mt-1">{activeItem.subtitle}</p>
                                    </motion.div>
                                    {activeItem.duration && (
                                        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-full font-mono text-sm shrink-0 w-fit">
                                            <Clock size={14} className="text-zinc-400" />
                                            {activeItem.duration}
                                        </div>
                                    )}
                                </div>
                                {activeItem.url && (
                                    <a href={activeItem.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-center mt-2 hover:bg-purple-600 transition-colors">
                                        <Play size={16} className="fill-current" />
                                        Play on Spotify
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {title && (
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                        {icon} {title}
                    </h2>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title={`Export ${exportName}`}
                    >
                        <Download size={16} />
                        Export
                    </button>
                </div>
            )}

            {layout === "list" ? (
                // Spotify list format: Now acts as an expandable card trigger directly
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {displayedItems.map((item, idx) => (
                        <motion.button
                            layoutId={`card-${item.id}-${item.title}`}
                            key={item.id}
                            onClick={() => setActiveItem(item)}
                            className="flex flex-col p-3 rounded-xl border transition-colors cursor-pointer group bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4 w-full">
                                    <span className="text-zinc-400 font-mono text-sm w-4 text-right flex-shrink-0">{idx + 1}</span>
                                    <motion.div layoutId={`image-${item.id}-${item.title}`} className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 relative overflow-hidden rounded-md drop-shadow-sm group-hover:scale-105 transition-transform">
                                        {item.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-600">No Img</div>
                                        )}
                                    </motion.div>
                                    <motion.div layoutId={`text-${item.id}-${item.title}`} className="flex flex-col min-w-0 pr-1 text-left">
                                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate w-full">
                                            {item.title}
                                        </span>
                                        <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate w-full">{item.subtitle}</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                    {displayedItems.map((item, idx) => (
                        <Focus3DCard 
                            key={item.id} 
                            item={item} 
                            index={idx} 
                            hovered={hoveredIndex} 
                            setHovered={setHoveredIndex} 
                        />
                    ))}
                </div>
            )}

            {hasMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-3 mt-4 flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-sm font-medium"
                >
                    {isExpanded ? (
                        <>View Less <ChevronUp size={16} /></>
                    ) : (
                        <>View {items.length - initialCount} More <ChevronDown size={16} /></>
                    )}
                </button>
            )}
        </div>
    );
}
