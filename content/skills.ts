export type SkillCategory = {
    name: string;
    skills: { name: string; slug: string }[];
};

export const skillsCategories: SkillCategory[] = [
    {
        name: "Languages",
        skills: [
            { name: "Python", slug: "python" },
            { name: "Go", slug: "go" },
            { name: "TypeScript", slug: "typescript" },
            { name: "JavaScript", slug: "javascript" },
            { name: "C++", slug: "cplusplus" },
            { name: "SQL", slug: "mysql" },
            { name: "Bash", slug: "gnubash" },
        ]
    },
    {
        name: "Backend & Cloud",
        skills: [
            { name: "FastAPI", slug: "fastapi" },
            { name: "Django", slug: "django" },
            { name: "Node.js", slug: "nodedotjs" },
            { name: "AWS", slug: "amazonaws" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "Docker", slug: "docker" },
        ]
    },
    {
        name: "Frontend",
        skills: [
            { name: "React", slug: "react" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "Redux", slug: "redux" },
            { name: "Vue.js", slug: "vuedotjs" },
            { name: "D3.js", slug: "d3dotjs" },
            { name: "Tailwind CSS", slug: "tailwindcss" },
        ]
    },
    {
        name: "Data & ML",
        skills: [
            { name: "Scikit-learn", slug: "scikitlearn" },
            { name: "Pandas", slug: "pandas" },
            { name: "MongoDB", slug: "mongodb" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
        ]
    }
];
