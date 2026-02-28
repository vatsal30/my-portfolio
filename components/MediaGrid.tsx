"use client";

import { useState } from "react";
import { Download, ChevronDown, ChevronUp } from "lucide-react";

export interface MediaItem {
    id: string | number;
    title: string;
    subtitle?: string;    // e.g., "Ep 12", "The Weeknd", "2024"
    imageUrl?: string;
    url?: string;
    rating?: string | number | null;
}

interface MediaGridProps {
    items: MediaItem[];
    exportName: string;
    initialCount?: number;
}

export default function MediaGrid({ items, exportName, initialCount = 10 }: MediaGridProps) {
    const [isExpanded, setIsExpanded] = useState(false);

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
        return <p className="text-zinc-500">No items found or unable to load.</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title={`Export ${exportName}`}
                >
                    <Download size={16} />
                    Export JSON
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.url || "#"}
                        target={item.url ? "_blank" : undefined}
                        rel={item.url ? "noreferrer" : undefined}
                        className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end transition-shadow hover:shadow-lg"
                    >
                        {item.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                                No Image
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                        <div className="relative z-20 p-3 w-full">
                            <p className="font-bold text-white text-sm line-clamp-2 leading-tight mb-1">
                                {item.title}
                            </p>
                            <div className="flex items-center justify-between text-xs text-zinc-300 font-medium">
                                <span className="truncate pr-2">{item.subtitle}</span>
                                {item.rating && (
                                    <span className="text-orange-400 font-mono shrink-0">{item.rating}</span>
                                )}
                            </div>
                        </div>
                    </a>
                ))}
            </div>

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
