import { BookOpen } from "lucide-react";
import { getBlogList } from "@/lib/blog";
import LLMWrapper from "@/components/LLMWrapper";
import NotesList from "@/components/NotesList";

export const metadata = {
    title: "Articles | Vatsal Vora",
    description: "Long-form articles and engineering deep dives.",
};

export default async function ArticlesPage() {
    const articles = await getBlogList();

    const llmMarkdown = `
# Articles & Deep Dives

This is my published writing space. Unlike the Digital Garden which contains raw reference notes, these are polished articles focusing on engineering, architecture, and debugging.

*Index of current articles:*
${articles.map(article => `- [${article.title}](/articles/${article.slug}) (Published: ${article.date}): ${article.excerpt}`).join('\n')}
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-3xl pt-24 pb-16 space-y-12">
                <header className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <BookOpen size={28} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Articles</h1>
                    </div>
                </header>

                {/* Using the same NotesList component for now, but we can customize it later for articles */}
                <NotesList notes={articles} basePath="/articles" />
            </div>
        </LLMWrapper>
    );
}
