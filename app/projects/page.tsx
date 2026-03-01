import { featuredProjects } from "@/content/projects";
import GithubCalendarWidget from "@/components/GithubCalendarWidget";
import LLMWrapper from "@/components/LLMWrapper";
import { TechBadge } from "@/components/TechBadge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata = {
    title: "Projects | My Portfolio",
    description: "A collection of my open-source projects and GitHub activity.",
};

export default async function ProjectsPage() {
    const githubUsername = "vatsal30"; // Replace with your actual GitHub username

    const llmMarkdown = `
# Projects & Open Source Activity

This page serves as a technical showcase of my featured engineering repositories and my active GitHub contribution activity, designed to be easily readable by both humans and LLM parsing agents.

### 📈 GitHub Contribution Graph
The activity heatmap below is rendered dynamically using the 'react-github-calendar' package, directly polling the GitHub API for my username ('${githubUsername}') to establish a real-time visualization of my 1-year commit density and open-source consistency.

### 🏗️ Featured Architecture
The featured repositories below are mapped from a local TypeScript configuration file ('content/projects.ts'). This approach ensures type-safe rendering of project data, including rich metadata such as deployed URLs and required Technology Stack arrays (e.g., Next.js, Python, Tailwind, AWS).

*Here is the raw data dump of my featured projects:*
${featuredProjects.map(repo => `- **${repo.title}**: ${repo.description || "No description"} (Tech Stack: ${repo.tech.join(", ")})`).join('\n')}
  `;

    // Function to provide a color map for languages
    const getLanguageColor = (lang: string) => {
        const colors: Record<string, string> = {
            TypeScript: "bg-purple-500",
            JavaScript: "bg-yellow-400",
            Python: "bg-emerald-500",
            Rust: "bg-orange-500",
            Go: "bg-cyan-500",
            HTML: "bg-red-500",
            CSS: "bg-indigo-500",
        };
        return colors[lang] || "bg-zinc-400";
    };

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-16">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects & Code</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl text-pretty">
                        A showcase of my recent work, open-source contributions, and side projects. I build things to solve problems and learn new technologies.
                    </p>
                </header>

                {/* GitHub Activity Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Github size={24} />
                            GitHub Activity
                        </h2>
                    </div>
                    <GithubCalendarWidget username={githubUsername} />
                </section>

                {/* Repositories Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold">Featured Repositories</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                        {featuredProjects.length > 0 ? (
                            featuredProjects.map((repo, idx) => (
                                <Link 
                                    key={idx}
                                    href={repo.link} 
                                    target="_blank" 
                                    className="block w-full outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl h-full"
                                >
                                    <ProjectCard project={repo} />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
                                Could not load repositories or no repositories found.
                            </div>
                        )}
                    </div>
                </section>
            </div >
        </LLMWrapper >
    );
}
