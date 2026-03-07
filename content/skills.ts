export type SkillCategory = {
  name: string;
  skills: { name: string; slug: string; iconUrl?: string }[];
};

export const skillsCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Go", slug: "go" },
      { name: "SQL", slug: "mysql" },
      { name: "Bash", slug: "gnubash" },
    ],
  },
  {
    name: "Web Tech",
    skills: [
      { name: "React", slug: "react" },
      { name: "Redux", slug: "redux" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Sass", slug: "sass" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI", slug: "fastapi" },
      { name: "Flask", slug: "flask" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", slug: "mysql" },
      { name: "MongoDB", slug: "mongodb" },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      {
        name: "AWS",
        slug: "amazonwebservices",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      },
      { name: "Docker", slug: "docker" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "GitLab", slug: "gitlab" },
      { name: "Bitbucket", slug: "bitbucket" },
      {
        name: "Linux",
        slug: "linux",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
      },
    ],
  },
  {
    name: "AI & Tools",
    skills: [
      { name: "Pandas", slug: "pandas" },
      { name: "Scikit-learn", slug: "scikitlearn" },
      {
        name: "Jupyter",
        slug: "jupyter",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
      },
      { name: "LangChain", slug: "langchain" },
      { name: "LangGraph", slug: "nodedotjs" },
      {
        name: "OpenAI",
        slug: "openai",
        iconUrl: "https://cdn.simpleicons.org/openai/white",
      },
      { name: "Claude", slug: "anthropic" },
      { name: "Gemini", slug: "googlegemini" },
      { name: "Prompt Eng.", slug: "googlegemini" },
      { name: "Postman", slug: "postman" },
      {
        name: "VS Code",
        slug: "vscode",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      },
      { name: "Cursor", slug: "cursor" },
      { name: "Cline", slug: "robotframework" },
      { name: "Antigravity", slug: "google" },
    ],
  },
];
