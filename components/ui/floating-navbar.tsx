"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Reset to visible on route change
  useEffect(() => {
    setVisible(true);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Always visible when at or near the top
    if (current < 10) {
      setVisible(true);
      return;
    }

    const direction = current - previous;
    if (direction < 0) {
      // Scrolling up → show
      setVisible(true);
    } else {
      // Scrolling down → hide
      setVisible(false);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-zinc-200 dark:border-zinc-800 rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-md z-[5000] px-6 py-3 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem, idx: number) => {
          const isActive = pathname === navItem.link || (navItem.link !== '/' && pathname?.startsWith(navItem.link));
          return (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-zinc-50 flex items-center space-x-2 text-zinc-600 dark:hover:text-zinc-300 hover:text-zinc-900 transition-colors uppercase tracking-widest text-xs font-mono",
                isActive ? "text-purple-600 dark:text-purple-400 font-bold" : ""
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
