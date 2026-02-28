// GitHub API helper

const GITHUB_USERNAME = "vercel"; // Replace with your actual GitHub username
const NOTES_REPO = "vercel/next.js"; // Replace with your username/notes-repo
const NOTES_PATH = "docs"; // Replace with the folder path containing markdown

export interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    homepage: string;
}

export async function getRepositories(): Promise<Repository[]> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
            {
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch repositories");
        }

        const repos = await res.json();
        return repos;
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

export interface NoteMeta {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
}

export async function getNotesList(): Promise<NoteMeta[]> {
    try {
        // For a real app, you would fetch from the GitHub API contents endpoint:
        // https://api.github.com/repos/{owner}/{repo}/contents/{path}
        // Since we don't have a guaranteed public notes repo, we are returning some mock data
        // that the user can replace with actual API calls.
        return [
            { slug: "building-my-portfolio", title: "Building my Portfolio with Next.js", date: "2024-05-01", excerpt: "How I designed and built this portfolio." },
            { slug: "learning-rust", title: "Learning Rust in 2024", date: "2024-04-15", excerpt: "My journey into system programming." },
            { slug: "digital-gardens", title: "The Philosophy of Digital Gardens", date: "2024-03-20", excerpt: "Why everyone needs a digital garden." },
        ];
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

export async function getNoteContent(slug: string): Promise<string | null> {
    try {
        // Mocking the raw markdown content
        return `
# ${slug.replace(/-/g, " ")}

This is a placeholder for the actual markdown content fetched from GitHub. 
In your final implementation, you will fetch the raw string from \`raw.githubusercontent.com\` and pass it to the \`react-markdown\` renderer.

## Why this is cool
- Because it's a digital garden.
- You can write in Obsidian, push to GitHub, and it auto-deploys here.

> "A garden isn't a place, it's a process."
`;
    } catch {
        return null;
    }
}
