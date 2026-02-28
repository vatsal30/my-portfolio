import { getNoteContent, getNotesList } from "@/lib/github";
import LLMWrapper from "@/components/LLMWrapper";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Needed for static generation of dynamic routes if doing SSG
export async function generateStaticParams() {
  const notes = await getNotesList();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Normally you'd fetch the note metadata to get the actual title
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} | My Portfolio`,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getNoteContent(slug);

  if (!content) {
    notFound();
  }

  return (
    <LLMWrapper llmContent={content}>
      <article className="container mx-auto px-4 max-w-3xl pt-24 pb-32">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-green-600 dark:hover:text-green-500 mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Notes
        </Link>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </article>
    </LLMWrapper>
  );
}
