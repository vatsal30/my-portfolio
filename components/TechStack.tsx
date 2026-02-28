"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { skillsCategories } from "@/content/skills";

const marqueeSkills = skillsCategories.flatMap(c => c.skills);

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

export function TechStack() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                    {isExpanded ? "Show Less" : "View Full Stack"}
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    <motion.div
                        key="marquee"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                        <div className="flex w-max animate-infinite-scroll">
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={`m1-${index}`} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://cdn.simpleicons.org/${tech.slug}`}
                                                alt={tech.name}
                                                className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-12 py-4 pr-12">
                                {marqueeSkills.map((tech, index) => (
                                    <div key={`m2-${index}`} className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-10 w-10 transition-all duration-300">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://cdn.simpleicons.org/${tech.slug}`}
                                                alt={tech.name}
                                                className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300 brightness-0 hover:brightness-100 dark:brightness-0 dark:invert dark:hover:invert-0 dark:hover:brightness-100"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 gap-8 sm:grid-cols-2 pt-4"
                        >
                            {skillsCategories.map((category) => (
                                <motion.div variants={itemVariants} key={category.name} className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {category.name}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {category.skills.map((skill) => (
                                            <motion.div
                                                key={skill.name}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-lg hover:shadow-blue-500/5 cursor-default relative overflow-hidden"
                                            >
                                                {/* Hidden background flare on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                                                <div className="h-6 w-6 shrink-0 transition-all duration-300">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={`https://cdn.simpleicons.org/${skill.slug}`}
                                                        alt={skill.name}
                                                        className="h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-md brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold tracking-tight text-zinc-500 dark:text-zinc-400 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">
                                                    {skill.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
