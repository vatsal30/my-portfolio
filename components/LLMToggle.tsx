"use client";

import { useGlobal } from "./GlobalContext";
import { Terminal } from "lucide-react";

export default function LLMToggle() {
    const { isLLMView, setIsLLMView } = useGlobal();

    return (
        <button
            onClick={() => setIsLLMView(!isLLMView)}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle LLM View"
        >
            <Terminal size={16} />
            <span>{isLLMView ? "Exit LLM View" : "LLM View"}</span>
        </button>
    );
}
