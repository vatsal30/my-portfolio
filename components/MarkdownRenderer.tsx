"use client";

import ReactMarkdown from "react-markdown";
import { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const components: Components = {
        h1: ({ ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
        h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2" {...props} />,
        h3: ({ ...props }) => <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
        p: ({ ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-zinc-700 dark:text-zinc-300" {...props} />,
        ul: ({ ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
        ol: ({ ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
        li: ({ ...props }) => <li className="text-zinc-700 dark:text-zinc-300" {...props} />,
        blockquote: ({ ...props }) => (
            <blockquote
                className="mt-6 border-l-4 border-purple-500 pl-6 italic text-zinc-600 dark:text-zinc-400 bg-purple-50/50 dark:bg-purple-900/10 py-3 pr-4 rounded-r-lg"
                {...props}
            />
        ),
        code: ({ ...props }) => {
            // Inline code vs block code is usually determined by whether it's wrapped in a pre tag by react-markdown, 
            // but react-markdown v9+ passes the children straight to code.
            // We'll apply basic inline styles here.
            return <code className="relative rounded bg-zinc-100 dark:bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />;
        },
        pre: ({ ...props }) => (
            <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-4 relative" {...props}>
                {props.children}
            </pre>
        ),
        a: ({ ...props }) => (
            <a className="font-medium px-0.5 text-purple-600 underline underline-offset-4 hover:text-purple-500 dark:text-purple-500 hover:dark:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        table: ({ ...props }) => (
            <div className="overflow-x-auto my-8 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <table className="w-full text-sm text-left border-collapse" {...props} />
            </div>
        ),
        thead: ({ ...props }) => <thead className="bg-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100" {...props} />,
        tbody: ({ ...props }) => <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950/20" {...props} />,
        tr: ({ ...props }) => <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" {...props} />,
        th: ({ ...props }) => <th className="px-4 py-3 font-bold border-b border-zinc-200 dark:border-zinc-800 whitespace-nowrap" {...props} />,
        td: ({ ...props }) => <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300" {...props} />,
    };

    return (
        <div className="markdown-body">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
