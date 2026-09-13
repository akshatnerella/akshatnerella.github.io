type SpotifyImage = {
  url: string;
  width: number;
  height: number;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  externalUrl: string;
};

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

const hasSpotifyCreds = clientId && clientSecret && refreshToken;

async function getAccessToken(): Promise<string | null> {
  if (!hasSpotifyCreds) return null;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) return null;

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export async function getTopTracks(limit = 3): Promise<SpotifyTrack[]> {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  const response = await fetch(
    `${SPOTIFY_API_URL}/me/top/tracks?limit=${limit}&time_range=short_term`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return [];

  const data = (await response.json()) as {
    items: Array<{
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: { name: string; images: SpotifyImage[] };
      external_urls: { spotify: string };
    }>;
  };

  return data.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImage: track.album.images?.[0]?.url ?? "",
    externalUrl: track.external_urls.spotify,
  }));
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const response = await fetch(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204 || !response.ok) return null;

  const data = (await response.json()) as {
    item: {
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: { name: string; images: SpotifyImage[] };
      external_urls: { spotify: string };
    };
  };

  if (!data.item) return null;

  return {
    id: data.item.id,
    name: data.item.name,
    artist: data.item.artists.map((artist) => artist.name).join(", "),
    album: data.item.album.name,
    albumImage: data.item.album.images?.[0]?.url ?? "",
    externalUrl: data.item.external_urls.spotify,
  };
}
