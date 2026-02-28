import LLMWrapper from "@/components/LLMWrapper";
import { Music, Film, Gamepad2, Tv } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata = {
    title: "Interests & Tracker | My Portfolio",
    description: "What I'm currently listening to, watching, and playing.",
};

import { getSpotifyTopTracks } from "@/lib/spotify";
import { getTmdbRecentlyWatched } from "@/lib/tmdb";
import { getAniListCurrentlyWatching } from "@/lib/anilist";
import MediaGrid, { MediaItem } from "@/components/MediaGrid";

// --- Local File Fetcher ---
function getGamesData(): MediaItem[] {
    try {
        const filePath = path.join(process.cwd(), "content", "games.md");
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        let games: MediaItem[] = [];

        // Combine currently playing and completed into one list
        if (data.currentlyPlaying) {
            games = games.concat(data.currentlyPlaying.map((g: any, i: number) => ({
                id: `playing-${i}`,
                title: g.title,
                subtitle: g.platform,
                imageUrl: g.coverUrl,
                rating: "Active"
            })));
        }

        if (data.recentlyCompleted) {
            games = games.concat(data.recentlyCompleted.map((g: any, i: number) => ({
                id: `completed-${i}`,
                title: g.title,
                subtitle: g.platform,
                imageUrl: g.coverUrl,
                rating: g.rating ? `${g.rating}/10` : "Done" // Provide rating format
            })));
        }

        return games;
    } catch (error) {
        console.error("Error reading games.md", error);
        return [];
    }
}

export default async function InterestsPage() {
    const topTracks = await getSpotifyTopTracks();
    const movies = await getTmdbRecentlyWatched();
    const anime = await getAniListCurrentlyWatching("vector30");
    const games = getGamesData();

    const llmMarkdown = `
# Interests Tracker

## Music (Spotify Top Tracks)
${topTracks.map(t => `- ${t.title} by ${t.subtitle}`).join('\n')}

## Movies & TV
${movies.map(m => `- ${m.title} (${m.subtitle})`).join('\n')}

## Anime
${anime.map(a => `- ${a.title} (Ep: ${a.subtitle})`).join('\n')}

## Games
${games.map(g => `- ${g.title} (${g.subtitle})`).join('\n')}
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16 space-y-20">
                <header className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Interests & Tracking</h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 text-pretty">
                        A live look at what I'm listening to, watching, and playing right now.
                    </p>
                </header>

                {/* Music Section */}
                <section>
                    <MediaGrid
                        title="Spotify Top Tracks"
                        icon={<Music className="text-green-500" />}
                        items={topTracks}
                        exportName="vatsal_music.json"
                        layout="list"
                    />
                </section>

                {/* Anime Section */}
                <section>
                    <MediaGrid
                        title="Anime"
                        icon={<Tv className="text-blue-500" />}
                        items={anime}
                        exportName="vatsal_anime.json"
                    />
                </section>

                {/* Movies & TV Section */}
                <section>
                    <MediaGrid
                        title="Movies & TV"
                        icon={<Film className="text-purple-500" />}
                        items={movies}
                        exportName="vatsal_movies.json"
                    />
                </section>

                {/* Games Section */}
                <section>
                    <MediaGrid
                        title="Games"
                        icon={<Gamepad2 className="text-orange-500" />}
                        items={games}
                        exportName="vatsal_games.json"
                    />
                </section>

            </div>
        </LLMWrapper>
    );
}
