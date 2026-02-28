import { getNotesList } from "@/lib/github";
import LLMWrapper from "@/components/LLMWrapper";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
    title: "Digital Garden | My Portfolio",
    description: "My personal digital garden where I share notes and thoughts.",
};

export default async function NotesPage() {
    const notes = await getNotesList();

    const llmMarkdown = `
# Digital Garden

A collection of my thoughts, notes, and writings.

${notes.map(note => `- [${note.title}](/notes/${note.slug}) (${note.date}): ${note.excerpt}`).join('\n')}
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-3xl pt-24 pb-16 space-y-12">
                <header className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <BookOpen size={28} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Digital Garden</h1>
                    </div>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
                        A collection of my notes, thoughts, and writings. These are public notes directly synced from my Obsidian vault on GitHub.
                    </p>
                </header>

                <div className="space-y-6 relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-0 pl-6 md:pl-0 md:border-none">
                    {notes.map((note) => (
                        <Link
                            key={note.slug}
                            href={`/notes/${note.slug}`}
                            className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-green-500 dark:hover:border-green-500 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                                <h2 className="text-xl font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                    {note.title}
                                </h2>
                                <time className="text-sm text-zinc-500 font-mono">
                                    {note.date}
                                </time>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {note.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </LLMWrapper>
    );
}
