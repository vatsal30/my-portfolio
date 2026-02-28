"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { NoteMeta } from "@/lib/github";
import { Search } from "lucide-react";

export default function NotesList({ notes }: { notes: NoteMeta[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcut for Search (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(notes.map(note => note.category));
        return Array.from(cats).sort();
    }, [notes]);

    // Filter notes based on search and category
    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (note.excerpt && note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory ? note.category === activeCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [notes, searchQuery, activeCategory]);

    return (
        <div className="space-y-8">
            {/* Search and Filter Controls */}
            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={18} className="text-zinc-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === null
                                    ? "bg-green-500 text-white shadow-sm"
                                    : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                                }`}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === category
                                        ? "bg-green-500 text-white shadow-sm"
                                        : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Notes List */}
            {filteredNotes.length > 0 ? (
                <div className="space-y-6 relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-0 pl-6 md:pl-0 md:border-none">
                    {filteredNotes.map((note) => (
                        <Link
                            key={note.slug}
                            href={`/notes/${note.slug}`}
                            className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                                <h2 className="text-xl font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                    {note.title}
                                </h2>
                                <time className="text-sm text-zinc-500 font-mono shrink-0">
                                    {note.date}
                                </time>
                            </div>

                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                                {note.category}
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                {note.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
                    <Search size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">No notes found</p>
                    <p className="text-sm mt-1">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
    );
}
