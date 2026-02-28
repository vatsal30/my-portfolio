import LLMWrapper from "@/components/LLMWrapper";
import { Music, Film, Gamepad2, Tv } from "lucide-react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata = {
    title: "Interests & Tracker | My Portfolio",
    description: "What I'm currently listening to, watching, and playing.",
};

// --- Mock API Fetchers for Template purposes ---
// The user should replace these with actual API calls to Spotify, TMDB, AniList

async function getSpotifyTopTracks() {
    return [
        { id: 1, title: "Blinding Lights", artist: "The Weeknd", url: "https://spotify.com" },
        { id: 2, title: "Paint The Town Red", artist: "Doja Cat", url: "https://spotify.com" },
        { id: 3, title: "Cruel Summer", artist: "Taylor Swift", url: "https://spotify.com" },
    ];
}

async function getTmdbRecentlyWatched() {
    return [
        { id: 1, title: "Dune: Part Two", year: "2024", type: "Movie" },
        { id: 2, title: "Shōgun", year: "2024", type: "TV Series" },
    ];
}

async function getAniListCurrentlyWatching() {
    return [
        { id: 1, title: "Frieren: Beyond Journey's End", currentEpisode: 28 },
        { id: 2, title: "Jujutsu Kaisen Season 2", currentEpisode: "Completed" },
    ];
}

// --- Local File Fetcher ---
function getGamesData() {
    try {
        const filePath = path.join(process.cwd(), "content", "games.md");
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return data;
    } catch (error) {
        console.error("Error reading games.md", error);
        return { currentlyPlaying: [], recentlyCompleted: [] };
    }
}

export default async function InterestsPage() {
    const topTracks = await getSpotifyTopTracks();
    const movies = await getTmdbRecentlyWatched();
    const anime = await getAniListCurrentlyWatching();
    const gamesData = getGamesData();

    const llmMarkdown = `
# Interests Tracker

## Music (Spotify Top Tracks)
${topTracks.map(t => `- ${t.title} by ${t.artist}`).join('\n')}

## Movies & TV
${movies.map(m => `- ${m.title} (${m.year})`).join('\n')}

## Anime
${anime.map(a => `- ${a.title} (Ep: ${a.currentEpisode})`).join('\n')}

## Games
### Currently Playing
${gamesData.currentlyPlaying?.map((g: any) => `- ${g.title} (${g.platform})`).join('\n')}
### Recently Completed
${gamesData.recentlyCompleted?.map((g: any) => `- ${g.title} (Rating: ${g.rating}/10)`).join('\n')}
  `;

    return (
        <LLMWrapper llmContent={llmMarkdown}>
            <div className="container mx-auto px-4 max-w-4xl pt-24 pb-16 space-y-20">
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {topTracks.map((track) => (
                            <a
                                key={track.id}
                                href={track.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-md flex-shrink-0" />
                                <div className="overflow-hidden">
                                    <p className="font-bold text-sm truncate">{track.title}</p>
                                    <p className="text-xs text-zinc-500 truncate">{track.artist}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Movies & TV Section */}
                    <section className="space-y-6 md:pr-6 md:border-r border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Film className="text-purple-500" /> Movies & TV
                        </h2>
                        <ul className="space-y-3">
                            {movies.map((movie) => (
                                <li key={movie.id} className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center">
                                    <span className="font-medium">{movie.title}</span>
                                    <span className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800">{movie.year}</span>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-bold flex items-center gap-2 mt-12 mb-6">
                            <Tv className="text-blue-500" /> Anime
                        </h2>
                        <ul className="space-y-3">
                            {anime.map((show) => (
                                <li key={show.id} className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-1">
                                    <span className="font-medium">{show.title}</span>
                                    <span className="text-xs text-zinc-500">Episode / Status: {show.currentEpisode}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Games Section */}
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                                <Gamepad2 className="text-orange-500" /> Currently Playing
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {gamesData.currentlyPlaying?.map((game: any, i: number) => (
                                    <div key={i} className="group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 aspect-video flex items-end">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <div className="relative z-20 p-4">
                                            <p className="font-bold text-white text-sm">{game.title}</p>
                                            <p className="text-xs text-zinc-300">{game.platform}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold mb-4">Recently Completed</h3>
                            <ul className="space-y-3">
                                {gamesData.recentlyCompleted?.map((game: any, i: number) => (
                                    <li key={i} className="flex justify-between items-center p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                                        <span className="text-sm font-medium">{game.title}</span>
                                        <span className="text-xs font-mono text-orange-500">{game.rating}/10</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </LLMWrapper>
    );
}
