import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vectorbuilds.dev";

  // Using relative URLs here, which get prefixed with metadataBase or we can output full URLs
  const routes = [
    "",
    "/about",
    "/projects",
    "/notes",
    "/articles",
    "/interests",
    "/toolkit",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
