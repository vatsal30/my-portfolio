"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { NoteMeta } from "@/lib/github";
import { Search, Folder } from "lucide-react";

export default function NotesList({ notes, basePath = "/notes" }: { notes: NoteMeta[], basePath?: string }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);
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

    // Extract unique tags/categories
    const filterTags = useMemo(() => {
        const tags = new Set<string>();
        notes.forEach(note => {
            if (note.tags && note.tags.length > 0) {
                note.tags.forEach(tag => tags.add(tag));
            } else if (note.category) {
                tags.add(note.category);
            }
        });
        return Array.from(tags).sort();
    }, [notes]);

    // Filter notes based on search and tags
    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (note.excerpt && note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
            
            let matchesCategory = true;
            if (activeTag) {
                if (note.tags && note.tags.length > 0) {
                    matchesCategory = note.tags.includes(activeTag);
                } else {
                    matchesCategory = note.category === activeTag;
                }
            }
            
            return matchesSearch && matchesCategory;
        });
    }, [notes, searchQuery, activeTag]);

    return (
        <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={18} className="text-zinc-500 group-focus-within:text-[#ab75ff] transition-colors" />
                    </div>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder={`Search ${basePath === '/articles' ? 'articles' : 'notes'}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0a0a0c] dark:bg-[#0a0a0c] border border-zinc-800 focus:border-[#ab75ff]/50 rounded-lg py-3 pl-11 pr-16 focus:outline-none focus:ring-1 focus:ring-[#ab75ff]/50 transition-all text-zinc-100 placeholder:text-zinc-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-500">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>

                {filterTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTag(null)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTag === null
                                    ? "bg-[#bf8bfa] text-white"
                                    : "bg-purple-950/30 border border-purple-900/50 text-purple-200 hover:bg-purple-900/50"
                                }`}
                        >
                            All
                        </button>
                        {filterTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTag === tag
                                        ? "bg-[#bf8bfa] text-white"
                                        : "bg-purple-950/30 border border-purple-900/50 text-purple-200 hover:bg-purple-900/50"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Notes List */}
            {filteredNotes.length > 0 ? (
                <div className="space-y-4">
                    {filteredNotes.map((note) => (
                        <Link
                            key={note.slug}
                            href={`${basePath}/${note.slug}`}
                            className="group block p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/60 bg-white/50 dark:bg-[#111113] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-3">
                                    {basePath === '/notes' && <Folder size={18} className="text-zinc-400" />}
                                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {note.title}
                                    </h2>
                                </div>
                                <time className="text-sm text-zinc-500 font-mono shrink-0">
                                    {note.date}
                                </time>
                            </div>

                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                                {note.excerpt}
                            </p>

                            <div className="flex gap-2">
                                {(note.tags && note.tags.length > 0 ? note.tags : [note.category]).map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-zinc-600 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700/50 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20">
                    <Search size={32} className="mx-auto mb-4 opacity-20" />
                    <p className="text-base font-medium">No results found</p>
                    <p className="text-sm mt-1">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
    );
}
