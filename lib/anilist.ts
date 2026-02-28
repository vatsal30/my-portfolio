import { MediaItem } from "@/components/MediaGrid";

export async function getAniListCurrentlyWatching(username: string): Promise<MediaItem[]> {
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME) {
        lists {
          name
          entries {
            media {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              siteUrl
            }
            score
            progress
            status
          }
        }
      }
    }`;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    const json = await response.json();

    if (json.errors) {
      console.error("AniList API Error:", json.errors);
      return [];
    }

    const lists = json.data.MediaListCollection.lists;
    if (!lists || lists.length === 0) return [];

    // Flatten all lists (Watching, Completed, Planning) into a single array
    let allEntries: any[] = [];
    for (const list of lists) {
      // Alternatively, filter for specific lists here: 
      // if (list.name === "Completed" || list.name === "Watching")
      allEntries = allEntries.concat(list.entries);
    }

    // Deduplicate in case a media is in multiple lists
    const uniqueEntries = Array.from(new Map(allEntries.map(e => [e.media.id, e])).values());

    return uniqueEntries.map((entry: any) => ({
      id: entry.media.id,
      title: entry.media.title.english || entry.media.title.romaji,
      subtitle: entry.status === "CURRENT" ? "Watching" :
        entry.status === "COMPLETED" ? "Completed" :
          (entry.status ? entry.status.charAt(0) + entry.status.slice(1).toLowerCase() : `Ep ${entry.progress}`),
      url: entry.media.siteUrl,
      imageUrl: entry.media.coverImage?.large,
      rating: entry.score || undefined
    })).sort((a, b) => {
      // Sort by rating descending
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    });
  } catch (error) {
    console.error("Failed to fetch from AniList:", error);
    return [];
  }
}
