"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import { Project } from "@/content/projects";
import { TechBadge } from "@/components/TechBadge";

function getImageSlug(link: string): string {
    const repo = link.replace("https://github.com/", "").split("/")[1] ?? "";
    return repo.toLowerCase();
}

export function ProjectCard({ project }: { project: Project }) {
    const imageSrc = `/projects/${getImageSlug(project.link)}.png`;

    return (
        <div className="w-full bg-zinc-50 dark:bg-[#1a1a1f] rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-lg overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/10 hover:border-purple-500/30">

            {/* Static generated preview image */}
            <div className="bg-slate-300/60 dark:bg-zinc-700/40 p-4">
                <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden border border-zinc-700/30 shadow-inner bg-[#1c1c22]">
                    <Image
                        src={imageSrc}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-top"
                    />
                </div>
            </div>

            {/* Metadata */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                    <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400 shrink-0 ml-3">{project.date}</span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-mono leading-relaxed mb-6 flex-1 line-clamp-3">
                    {project.story || project.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={15} className="text-zinc-400 mr-1 shrink-0" />
                    {project.tech.map((t, idx) => (
                        <TechBadge key={idx} tech={t} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}
