// GitHub API helper

const GITHUB_USERNAME = "vatsal30";
const NOTES_REPO = "vatsal30/Obsidian_backup";

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
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos: Repository[] = await res.json();
    const featuredNames = [
      "Melanoma-Detection",
      "leetcode",
      "my-portfolio",
      "2048-game-clone",
    ];
    return repos.filter((repo) => featuredNames.includes(repo.name));
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt?: string;
  path: string;
}

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const getHeaders = (isRaw = false) => {
  const headers: Record<string, string> = {
    Accept: isRaw
      ? "application/vnd.github.v3.raw"
      : "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

export async function getNotesList(): Promise<NoteMeta[]> {
  try {
    const headers = getHeaders(false);

    // 1. Fetch root contents
    const rootRes = await fetch(
      `https://api.github.com/repos/${NOTES_REPO}/contents`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!rootRes.ok) {
      if (rootRes.status === 404) {
        console.warn(
          `[GitHub] Repository ${NOTES_REPO} not found or requires GITHUB_TOKEN.`,
        );
      }
      throw new Error("Failed to fetch root contents");
    }
    const rootItems = await rootRes.json();

    // 2. Filter for directories only (ignore root files)
    const directories = rootItems.filter(
      (item: any) => item.type === "dir" && !item.name.startsWith("."),
    );

    let allNotes: NoteMeta[] = [];

    // 3. Fetch contents of each directory
    for (const dir of directories) {
      if (dir.name === "2026 Arc") {
        continue;
      }

      const dirRes = await fetch(
        `https://api.github.com/repos/${NOTES_REPO}/contents/${dir.path}`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!dirRes.ok) continue;

      const dirItems = await dirRes.json();
      const mdFiles = dirItems.filter(
        (item: any) => item.type === "file" && item.name.endsWith(".md"),
      );

      const notesFromDir = mdFiles.map((file: any) => {
        const title = file.name.replace(".md", "");
        return {
          slug: slugify(title),
          title: title,
          category: dir.name,
          date: new Date().toISOString().split("T")[0], // Placeholder date or you could fetch commit history
          excerpt: `Note from ${dir.name}`,
          path: file.path,
        };
      });

      allNotes = [...allNotes, ...notesFromDir];
    }

    // 4. Sort notes by date descending (using placeholder for now)
    return allNotes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

export async function getNoteContent(slug: string): Promise<string | null> {
  try {
    const notes = await getNotesList();
    const note = notes.find((n) => n.slug === slug);
    if (!note) return null;

    const headers = getHeaders(true);

    const res = await fetch(
      `https://api.github.com/repos/${NOTES_REPO}/contents/${note.path}`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error("Failed to fetch note content");

    return await res.text();
  } catch (error) {
    console.error("Error fetching note content:", error);
    return null;
  }
}
