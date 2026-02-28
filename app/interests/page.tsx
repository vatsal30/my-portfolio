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
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Music className="text-green-500" /> Spotify Top Tracks
                    </h2>
                    <MediaGrid items={topTracks} exportName="vatsal_music.json" />
                </section>

                {/* Anime Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Tv className="text-blue-500" /> Anime
                    </h2>
                    <MediaGrid items={anime} exportName="vatsal_anime.json" />
                </section>

                {/* Movies & TV Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Film className="text-purple-500" /> Movies & TV
                    </h2>
                    <MediaGrid items={movies} exportName="vatsal_movies.json" />
                </section>

                {/* Games Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Gamepad2 className="text-orange-500" /> Games
                    </h2>
                    <MediaGrid items={games} exportName="vatsal_games.json" />
                </section>

            </div>
        </LLMWrapper>
    );
}
