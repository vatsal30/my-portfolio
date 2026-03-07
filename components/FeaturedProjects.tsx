import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

// Server component wrapper so the client home page can include ProjectCard
export default function FeaturedProjects() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 2).map((project, i) => (
                <Link
                    key={i}
                    href={project.link}
                    target="_blank"
                    className="block outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl h-full"
                >
                    <ProjectCard project={project} />
                </Link>
            ))}
        </div>
    );
}
