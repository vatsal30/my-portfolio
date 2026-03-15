"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { careerData } from "@/content/career";
import { Globe, GraduationCap, Building2 } from "lucide-react";

export function CareerTabs() {
    const [activeTab, setActiveTab] = useState(0);
    const activeItem = careerData[activeTab];

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 min-h-[400px]">
            {/* Tabs List */}
            <div className="flex overflow-x-auto md:flex-col gap-2 md:w-1/3 border-b md:border-b-0 md:border-l border-zinc-200 dark:border-zinc-800 pb-4 md:pb-0 hide-scrollbar relative">
                {careerData.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(index)}
                        className={`text-left px-4 py-3 md:py-4 transition-all whitespace-nowrap md:whitespace-normal md:-ml-[1px] relative flex flex-col ${activeTab === index
                            ? "text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-500/10"
                            : "text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                    >
                        {/* Active Border */}
                        {activeTab === index && (
                            <motion.div
                                layoutId="activeTabBorder"
                                className="absolute bottom-0 left-0 w-full md:w-[2px] md:h-full bg-purple-500"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{item.company}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="md:w-2/3 md:pl-6 pt-4 md:pt-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            {/* Logo */}
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 overflow-hidden">
                                {activeItem.logo ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={activeItem.logo} alt={activeItem.company} className="w-full h-full object-cover bg-white" />
                                ) : activeItem.id === "cspit" ? (
                                    <GraduationCap size={24} />
                                ) : (
                                    <Building2 size={24} />
                                )}
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    {activeItem.company}
                                    {activeItem.link && (
                                        <a href={activeItem.link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-500 transition-colors">
                                            <Globe size={16} />
                                        </a>
                                    )}
                                </h3>
                                <p className="text-sm md:text-base font-semibold text-zinc-600 dark:text-zinc-400">
                                    {activeItem.role}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm font-mono tracking-tight text-zinc-600 dark:text-zinc-400 mb-6 flex items-center gap-2">
                            {activeItem.date} <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" /> {activeItem.location}
                        </p>

                        {activeItem.tech.length > 0 && (
                            <div className="mb-6 space-y-3">
                                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Technologies & Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeItem.tech.map(tech => (
                                        <div key={tech.name} className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group relative overflow-hidden ring-1 ring-inset ring-zinc-900/5 dark:ring-white/5 shadow-sm">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://cdn.simpleicons.org/${tech.slug}`}
                                                alt={tech.name}
                                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity brightness-0 dark:brightness-0 dark:invert relative z-10"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <ul className="space-y-4">
                            {activeItem.description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
