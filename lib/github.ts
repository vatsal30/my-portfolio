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

    // 2. Filter for top-level directories (skip hidden and Private)
    const SKIP_DIRS = new Set(["Private"]);
    const topLevelDirs = rootItems.filter(
      (item: any) =>
        item.type === "dir" &&
        !item.name.startsWith(".") &&
        !SKIP_DIRS.has(item.name),
    );

    // 3. Recursively fetch all .md files from a directory path
    const fetchNotesFromDir = async (
      dirPath: string,
      category: string, // Always the top-level dir name
    ): Promise<NoteMeta[]> => {
      const res = await fetch(
        `https://api.github.com/repos/${NOTES_REPO}/contents/${dirPath}`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!res.ok) return [];

      const items = await res.json();
      let notes: NoteMeta[] = [];

      for (const item of items) {
        if (item.type === "file" && item.name.endsWith(".md")) {
          const title = item.name.replace(".md", "");
          notes.push({
            slug: slugify(title),
            title,
            category,
            date: new Date().toISOString().split("T")[0],
            excerpt: `Note from ${category}`,
            path: item.path,
          });
        } else if (item.type === "dir" && !item.name.startsWith(".")) {
          // Recurse into subdirectory, keeping the top-level category
          const subNotes = await fetchNotesFromDir(item.path, category);
          notes = [...notes, ...subNotes];
        }
      }

      return notes;
    };

    // 4. Gather notes from all top-level dirs (recursively)
    let allNotes: NoteMeta[] = [];
    for (const dir of topLevelDirs) {
      const notes = await fetchNotesFromDir(dir.path, dir.name);
      allNotes = [...allNotes, ...notes];
    }

    // 5. Sort by date descending
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
