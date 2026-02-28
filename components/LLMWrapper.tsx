"use client";

import { useGlobal } from "./GlobalContext";
import ReactMarkdown from "react-markdown";

interface LLMWrapperProps {
    children: React.ReactNode;
    llmContent: string;
}

export default function LLMWrapper({ children, llmContent }: LLMWrapperProps) {
    const { isLLMView } = useGlobal();

    if (isLLMView) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl font-mono text-sm">
                <pre className="whitespace-pre-wrap bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <ReactMarkdown>{llmContent}</ReactMarkdown>
                </pre>
            </div>
        );
    }

    return <>{children}</>;
}
