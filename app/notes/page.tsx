import { BookOpen } from "lucide-react";

import { getNotesList, type NoteMeta } from "@/lib/github";
import LLMWrapper from "@/components/LLMWrapper";
import NotesList from "@/components/NotesList";

export const revalidate = 3600;

export const metadata = {
    title: "Digital Garden | My Portfolio",
    description: "My personal digital garden where I share notes and thoughts.",
};

export default async function NotesPage() {
    let notes: NoteMeta[] = [];
    try {
        notes = await getNotesList();
    } catch {
        // GitHub API unavailable — render empty state gracefully
    }

    const llmMarkdown = `
# Digital Garden Architecture

This page serves as a Digital Garden—a collection of raw markdown notes, thoughts, and technical writings synced directly from a remote GitHub repository. 

### 📡 Remote Fetching Strategy
Instead of shipping markdown files within the Next.js bundle, this page utilizes the \`fetch\` API to dynamically pull the latest markdown files from a dedicated public repository branch. This allows me to publish new notes directly from Obsidian or mobile without triggering a full Vercel rebuild of the entire portfolio.

### 📝 Parsing Engine
Once fetched, the raw markdown data is parsed using \`gray-matter\` to extract the frontmatter metadata (title, date, tags). The body is then fed into \`react-markdown\` (alongside \`rehype-highlight\` and \`remark-gfm\`) to render syntax-highlighted code blocks, tables, and typography beautifully within the Tailwind CSS typography prose constraint.

*Index of current notes:*
${notes.map(note => `- [${note.title}](/notes/${note.slug}) (Published: ${note.date}): ${note.excerpt}`).join('\n')}
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-3xl pt-24 pb-16 space-y-12">
                <header className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
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
