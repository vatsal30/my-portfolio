import { Star, Tag } from "lucide-react";
import { Project } from "@/content/projects";
import { TechBadge } from "@/components/TechBadge";

export async function ProjectCard({ project }: { project: Project }) {
    // Extract the repository name from the GitHub URL to match the terminal visual
    const urlParts = project.link.replace("https://github.com/", "").split('/');
    const owner = urlParts[0] || "vatsal30";
    const repoName = urlParts[1] || project.title;

    let stars = 0;
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
            next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
        });
        if (res.ok) {
            const data = await res.json();
            stars = data.stargazers_count;
        }
    } catch (e) {
        console.error("Failed to fetch GitHub stars for", repoName);
    }

    return (
        <div className="w-full bg-zinc-50 dark:bg-[#1a1a1f] rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-lg overflow-hidden flex flex-col relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/10 hover:border-purple-500/30">
            
            {/* Top Thumbnail: macOS Terminal Graphic */}
            <div className="bg-[#27272a] dark:bg-[#202026] relative flex flex-col border-b border-zinc-200 dark:border-zinc-800">
                <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 opacity-80">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                        <span className="font-mono text-xs tracking-wider font-semibold">{stars}</span>
                        <Star size={14} className="fill-current" />
                    </div>
                </div>
                <div className="p-6 md:p-8 flex-1 min-h-[160px] flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-mono text-[#e879f9] mb-3 tracking-tight font-semibold">
                        {owner} <span className="text-zinc-500 mx-1">/</span> <span className="text-[#4ade80]">{repoName}</span>
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 font-mono leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>
            </div>
            
            {/* Bottom Content: Descriptive Metadata */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h4>
                    <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0">{project.date}</span>
                </div>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 flex-1">
                    {project.story || project.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={16} className="text-zinc-400 mr-1" />
                    {project.tech.map((t, idx) => (
                        <TechBadge key={idx} tech={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}
