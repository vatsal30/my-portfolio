import { MediaItem } from "@/components/MediaGrid";

const TMDB_READ_TOKEN = process.env.TMDB_READ_TOKEN;
const LIST_ID = "8636537";

export async function getTmdbRecentlyWatched(): Promise<MediaItem[]> {
    if (!TMDB_READ_TOKEN) return [];

    try {
        // Fetch specific list
        const res = await fetch(`https://api.themoviedb.org/3/list/${LIST_ID}?language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${TMDB_READ_TOKEN}`
            },
            next: { revalidate: 3600 }
        });
        const data = await res.json();

        if (!data.items) return [];

        interface TmdbItem {
            id: number;
            title: string;
            release_date?: string;
            poster_path?: string | null;
            vote_average?: number;
        }

        return data.items.map((item: TmdbItem) => ({
            id: item.id,
            title: item.title,
            subtitle: (item.release_date || "").substring(0, 4),
            imageUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : undefined,
            url: `https://www.themoviedb.org/movie/${item.id}`,
            rating: item.vote_average ? item.vote_average.toFixed(1) : undefined
        }));
    } catch (err) {
        console.error("TMDB Error: ", err);
        return [];
    }
}
