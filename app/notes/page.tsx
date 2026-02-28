import { getNotesList } from "@/lib/github";
import LLMWrapper from "@/components/LLMWrapper";
import NotesList from "@/components/NotesList";
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

                {/* Interactive Client Notes List */}
                <NotesList notes={notes} />
            </div>
        </LLMWrapper>
    );
}
