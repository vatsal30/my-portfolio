// GitHub API helper
import matter from "gray-matter";

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
  tags?: string[];
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

const SKIP_DIRS = new Set(["Private"]);

function extractExcerpt(content: string, maxLength = 200): string {
  return content
    .replace(/^#{1,6}\s+.+$/gm, "")       // strip headings
    .replace(/!\[.*?\]\(.*?\)/g, "")        // strip images
    .replace(/\[(.+?)\]\(.*?\)/g, "$1")     // links → text only
    .replace(/[`*_~>|]/g, "")              // strip inline formatting chars
    .replace(/\n+/g, " ")                   // collapse newlines to spaces
    .trim()
    .slice(0, maxLength);
}

// In-memory cache to avoid redundant API calls during build
let _notesListCache: NoteMeta[] | null = null;

export async function getNotesList(): Promise<NoteMeta[]> {
  if (_notesListCache) return _notesListCache;

  try {
    const headers = getHeaders(false);
    const rawHeaders = getHeaders(true);

    // 1. Fetch the full repo tree in one API call
    const treeRes = await fetch(
      `https://api.github.com/repos/${NOTES_REPO}/git/trees/HEAD?recursive=1`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!treeRes.ok) {
      if (treeRes.status === 404) {
        console.warn(`[GitHub] Repository ${NOTES_REPO} not found or requires GITHUB_TOKEN.`);
      }
      throw new Error(`Failed to fetch repo tree: ${treeRes.status}`);
    }

    const treeData = await treeRes.json();

    if (treeData.truncated) {
      console.warn("[GitHub] Repo tree was truncated — vault exceeds 100,000 items.");
    }

    interface TreeItem { path: string; type: string; }

    const mdFiles = (treeData.tree as TreeItem[]).filter((item) => {
      if (item.type !== "blob" || !item.path.endsWith(".md")) return false;
      const parts = item.path.split("/");
      if (parts.some((p) => p.startsWith("."))) return false;
      if (SKIP_DIRS.has(parts[0])) return false;
      if (parts[parts.length - 1].toUpperCase() === "CLAUDE.md") return false;
      return true;
    });

    // 2. Fetch all file contents in parallel to extract real frontmatter metadata
    const notes = await Promise.all(
      mdFiles.map(async (item): Promise<NoteMeta> => {
        const parts = item.path.split("/");
        const category = parts[0];
        const fileName = parts[parts.length - 1].replace(".md", "");
        const slug = slugify(category + "-" + fileName);

        try {
          const contentRes = await fetch(
            `https://api.github.com/repos/${NOTES_REPO}/contents/${item.path}`,
            { headers: rawHeaders, next: { revalidate: 3600 } },
          );
          if (!contentRes.ok) throw new Error(`HTTP ${contentRes.status}`);

          const raw = await contentRes.text();
          const { data, content } = matter(raw);

          return {
            slug,
            title: data.title || fileName,
            category,
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
            excerpt: extractExcerpt(content),
            path: item.path,
            tags: Array.isArray(data.tags) ? data.tags : undefined,
          };
        } catch {
          // Fall back to filename-derived metadata if fetch fails
          return { slug, title: fileName, category, date: "", excerpt: "", path: item.path };
        }
      }),
    );

    // Sort: dated notes descending, undated notes alphabetically at the end
    const sorted = notes.sort((a, b) => {
      if (!a.date && !b.date) return a.title.localeCompare(b.title);
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    _notesListCache = sorted;
    return sorted;
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
    if (!res.ok) {
      console.warn(`[GitHub] Failed to fetch note "${slug}" (HTTP ${res.status})`);
      return null;
    }

    return await res.text();
  } catch (error) {
    console.error("Error fetching note content:", error);
    return null;
  }
}
