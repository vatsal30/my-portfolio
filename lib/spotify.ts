import { MediaItem } from "@/components/MediaGrid";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token || '',
        }),
    });
    return response.json();
};

export const getNowPlaying = async () => {
    if (!refresh_token) return null;
    try {
        const { access_token } = await getAccessToken();
        return fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            cache: 'no-store'
        });
    } catch (error) {
        return null;
    }
};

export const getSpotifyTopTracks = async (): Promise<MediaItem[]> => {
    if (!refresh_token) {
        return [
            { id: 1, title: "Blinding Lights", subtitle: "The Weeknd", url: "https://spotify.com" },
            { id: 2, title: "Paint The Town Red", subtitle: "Doja Cat", url: "https://spotify.com" },
            { id: 3, title: "Cruel Summer", subtitle: "Taylor Swift", url: "https://spotify.com" },
            { id: 4, title: "No Spotify Token", subtitle: "Setup in .env.local", url: "#" },
        ];
    }

    try {
        const { access_token } = await getAccessToken();
        const res = await fetch(`${TOP_TRACKS_ENDPOINT}?time_range=medium_term&limit=10`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            next: { revalidate: 3600 }
        });

        const data = await res.json();

        if (!data.items) return [];

        return data.items.map((track: any) => {
            const min = Math.floor(track.duration_ms / 60000);
            const sec = ((track.duration_ms % 60000) / 1000).toFixed(0);

            return {
                id: track.id,
                title: track.name,
                subtitle: track.artists.map((_artist: any) => _artist.name).join(', '),
                url: track.external_urls.spotify,
                imageUrl: track.album.images?.[0]?.url,
                duration: `${min}:${Number(sec) < 10 ? '0' : ''}${sec}`,
                popularity: track.popularity
            };
        });
    } catch (e) {
        console.error("Error fetching Spotify.", e);
        return [];
    }
}
