"use client";

import { useGlobal } from "./GlobalContext";
import { Bot, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LLMToggle() {
    const { isLLMView, setIsLLMView } = useGlobal();

    return (
        <button
            onClick={() => setIsLLMView(!isLLMView)}
            className="relative flex items-center w-[52px] h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 p-1 cursor-pointer transition-colors shadow-inner"
            aria-label="Toggle LLM View"
            title={isLLMView ? "Switch to Human View" : "Switch to Machine View"}
        >
            <motion.div
                className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full shadow-md z-10 bg-white text-zinc-900"
                )}
                layout
                animate={{
                    x: isLLMView ? 24 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
            >
                {isLLMView ? <Bot size={14} /> : <UserRound size={14} />}
            </motion.div>
        </button>
    );
}
