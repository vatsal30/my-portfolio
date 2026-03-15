"use client";

import React, { useState, useRef, useCallback } from "react";
import { Copy, Check } from "lucide-react";

// Extract raw text from a DOM element (used for copy-to-clipboard)
function useCopyCode() {
    const [isCopied, setIsCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCopy = useCallback(async () => {
        if (!containerRef.current) return;
        // Find the <code> element inside the container to get clean text
        const codeEl = containerRef.current.querySelector("code");
        const text = codeEl?.textContent || containerRef.current.textContent || "";
        if (text) {
            await navigator.clipboard.writeText(text.trim());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    }, []);

    return { isCopied, containerRef, handleCopy };
}

function CopyButton({ isCopied, onClick }: { isCopied: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1"
            aria-label="Copy code"
        >
            {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
    );
}

/**
 * CodeBlock — overrides <pre> tags.
 * Used for code blocks WITHOUT a title (no figure wrapper from rehype-pretty-code).
 */
export function CodeBlock({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
    const { isCopied, containerRef, handleCopy } = useCopyCode();

    // Rehype pretty code adds data-language to the pre tag
    const language = props["data-language" as keyof typeof props] as string;

    return (
        <div ref={containerRef} className="relative group/code border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden my-6 not-prose">
            {/* Action Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {language && (
                        <span className="text-xs font-mono text-zinc-500 uppercase select-none">
                            {language}
                        </span>
                    )}
                    <CopyButton isCopied={isCopied} onClick={handleCopy} />
                </div>
            </div>

            {/* The actual code */}
            <pre {...props} className="px-4 py-4 overflow-x-auto text-sm font-mono bg-[#0d1117]" style={{ margin: 0 }}>
                {children}
            </pre>
        </div>
    );
}

/**
 * CodeFigure — overrides <figure> tags from rehype-pretty-code.
 * Used for code blocks WITH a title (e.g. ```python title="main.py").
 *
 * rehype-pretty-code generates: <figure> <figcaption>title</figcaption> <pre>...</pre> </figure>
 * But MDXRemote transforms <pre> into <CodeBlock> before passing children here.
 * So we DON'T try to detect child types — we just render all children and add our header.
 */
export function CodeFigure({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    const { isCopied, containerRef, handleCopy } = useCopyCode();

    // Extract title text from children (figcaption is rendered as a React element)
    let titleText: string | null = null;
    const filteredChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            // Check for figcaption (the title element from rehype-pretty-code)
            const childProps = child.props as any;
            if (
                child.type === "figcaption" ||
                childProps?.["data-rehype-pretty-code-title"] !== undefined
            ) {
                // Extract the text content from figcaption
                titleText = childProps?.children || "untitled";
                return; // Don't add figcaption to filtered children
            }
        }
        filteredChildren.push(child);
    });

    // If no title found, this isn't a rehype-pretty-code figure — render normally
    if (!titleText) {
        return <figure {...props}>{children}</figure>;
    }

    return (
        <div ref={containerRef} className="relative group/code border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden my-6 not-prose">
            {/* Header with title + copy button */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {titleText}
                    </span>
                </div>

                <CopyButton isCopied={isCopied} onClick={handleCopy} />
            </div>

            {/* Code content — render the remaining children (the pre/code block) directly */}
            <div className="[&>div]:border-0 [&>div]:rounded-none [&>div]:my-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!my-0">
                {filteredChildren}
            </div>
        </div>
    );
}
