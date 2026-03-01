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

export function WebringWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSite = () => {
    setCurrentIndex((prev) => (prev + 1) % webringSites.length);
  };

  const prevSite = () => {
    setCurrentIndex((prev) => (prev - 1 + webringSites.length) % webringSites.length);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden group min-h-[160px]">
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <LinkIcon className="text-purple-500" size={18} />
        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Webring</h3>
      </div>
      
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 max-w-[200px]">
        Discovering the internet, one personal site at a time.
      </p>

      <div className="mt-auto relative z-10 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <button 
          onClick={prevSite}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Previous Site"
        >
          <ArrowLeft size={14} />
        </button>
        
        <div className="flex-1 overflow-hidden px-2 relative h-5 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <Link 
                  href={webringSites[currentIndex].url}
                  target="_blank"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate block max-w-[120px] text-center"
                >
                  {webringSites[currentIndex].name}
                </Link>
              </motion.div>
            </AnimatePresence>
        </div>

        <button 
          onClick={nextSite}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Next Site"
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
