import { NoteMeta } from "./github";
import matter from "gray-matter";

const BLOG_REPO = "vatsal30/articles-content";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const getHeaders = (isRaw = false) => {
  const headers: Record<string, string> = {
    Accept: isRaw
      ? "application/vnd.github.v3.raw"
      : "application/vnd.github.v3+json",
  };
  // Use the universal PAT for fetching private blog repo
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

export async function getBlogList(): Promise<NoteMeta[]> {
  try {
    const headers = getHeaders(false);

    // Fetch root contents of the private articles repo
    const res = await fetch(
      `https://api.github.com/repos/${BLOG_REPO}/contents`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(
          `[GitHub] Repository ${BLOG_REPO} not found. Is it private and is GITHUB_TOKEN set?`,
        );
      }
      return []; // Return empty if repo is brand new / no access yet
    }

    const items = await res.json();
    let blogs: NoteMeta[] = [];

    // Assuming we drop markdown files directly in the root or in a 'posts' folder.
    // For now, let's grab all .md files in the root.
    for (const item of items) {
      if (item.type === "file" && item.name.endsWith(".md")) {
        // Exclude README.md if it exists
        if (item.name.toLowerCase() === "readme.md") continue;

        // Fetch file content to parse frontmatter
        const fileRes = await fetch(item.download_url, {
          headers,
          next: { revalidate: 3600 },
        });
        if (fileRes.ok) {
          const content = await fileRes.text();
          const { data } = matter(content);

          const title = data.title || item.name.replace(".md", "");
          blogs.push({
            slug: slugify(title),
            title,
            category: data.category || "Blog",
            date: data.date || new Date().toISOString().split("T")[0],
            excerpt: data.excerpt || `Article from vectorbuilds.dev`,
            path: item.path,
            tags: data.tags || [],
          });
        }
      }
    }

    return blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error fetching blog list:", error);
    return [];
  }
}

export async function getBlogContent(slug: string): Promise<string | null> {
  try {
    const blogs = await getBlogList();
    const blog = blogs.find((n) => n.slug === slug);
    if (!blog) return null;

    const headers = getHeaders(true);

    const res = await fetch(
      `https://api.github.com/repos/${BLOG_REPO}/contents/${blog.path}`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error("Failed to fetch blog content");

    return await res.text();
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}
