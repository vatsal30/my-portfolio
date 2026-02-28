import { getRepositories } from "@/lib/github";
import GithubCalendarWidget from "@/components/GithubCalendarWidget";
import LLMWrapper from "@/components/LLMWrapper";
import { GitFork, Star, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Projects | My Portfolio",
    description: "A collection of my open-source projects and GitHub activity.",
};

export default async function ProjectsPage() {
    const repos = await getRepositories();
    const githubUsername = "vercel"; // Replace with your actual GitHub username

    const llmMarkdown = `
# Projects & GitHub Activity

## GitHub Contributions
I am actively contributing to open source on GitHub (${githubUsername}).

## Open Source Repositories
${repos.map(repo => `- **${repo.name}**: ${repo.description || "No description"} (Stars: ${repo.stargazers_count}, Language: ${repo.language})`).join('\\n')}
  `;

    // Function to provide a color map for languages
    const getLanguageColor = (lang: string) => {
        const colors: Record<string, string> = {
            TypeScript: "bg-blue-500",
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.length > 0 ? (
                            repos.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="flex flex-col h-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
                                >
                                    <div className="flex-grow space-y-3">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-bold truncate pr-4 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {repo.name}
                                            </h3>
                                            <Link
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                                                aria-label={`View ${repo.name} on GitHub`}
                                            >
                                                <ExternalLink size={20} />
                                            </Link>
                                        </div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                                            {repo.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                        {repo.language && (
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                                                {repo.language}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="group-hover:text-yellow-500 transition-colors" />
                                            {repo.stargazers_count}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork size={14} />
                                            {repo.forks_count}
                                        </div>
                                    </div>
                                </div>
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
