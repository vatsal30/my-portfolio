"use client";

import { Link as LinkIcon, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const webringSites = [
  { name: "Jason Cameron", url: "https://jasoncameron.dev" },
  { name: "Aditya Patil", url: "https://adityapatil.dev" },
  { name: "Prasoon", url: "https://prasoon.dev" },
  { name: "Paco Coursey", url: "https://paco.me" },
  { name: "Lee Robinson", url: "https://leerob.io" },
];

export function FixedWebring() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSite = () => {
    setCurrentIndex((prev) => (prev + 1) % webringSites.length);
  };

  const prevSite = () => {
    setCurrentIndex((prev) => (prev - 1 + webringSites.length) % webringSites.length);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-lg min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <LinkIcon className="text-purple-500" size={14} />
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Webring</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={prevSite}
          className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Previous Site"
        >
          <ArrowLeft size={12} />
        </button>
        
        <div className="flex-1 overflow-hidden px-1 relative h-4 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Link 
                  href={webringSites[currentIndex].url}
                  target="_blank"
                  className="text-[10px] font-medium text-zinc-900 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate block max-w-[100px] text-center"
                >
                  {webringSites[currentIndex].name}
                </Link>
              </motion.div>
            </AnimatePresence>
        </div>

        <button 
          onClick={nextSite}
          className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Next Site"
        >
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
