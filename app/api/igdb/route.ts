import { NextRequest, NextResponse } from "next/server";

// IGDB is fronted by Twitch's OAuth. Create an app at
// https://dev.twitch.tv/console/apps to obtain a Client ID + Secret, then set
// TWITCH_CLIENT_ID / TWITCH_CLIENT_SECRET in .env.local. These stay server-side
// (no NEXT_PUBLIC_ prefix) so the secret is never shipped to the browser.
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IgdbGame = {
  igdbId: number;
  name: string;
  slug: string | null;
  rating: number | null;
  releaseYear: number | null;
  summary: string | null;
  coverImageId: string | null;
  coverUrl: string | null;
  url: string | null;
};

// In-memory token cache. Twitch app-access tokens last ~60 days; we refresh
// once they're within a minute of expiry.
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }
  const params = new URLSearchParams({
    client_id: CLIENT_ID as string,
    client_secret: CLIENT_SECRET as string,
    grant_type: "client_credentials",
  });
  const res = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error(`Twitch token request failed (${res.status})`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.token;
}

type RawGame = {
  id: number;
  name: string;
  slug?: string;
  rating?: number;
  aggregated_rating?: number;
  total_rating?: number;
  first_release_date?: number;
  summary?: string;
  url?: string;
  cover?: { image_id?: string };
};

function normalize(g: RawGame): IgdbGame {
  const score = g.total_rating ?? g.rating ?? g.aggregated_rating ?? null;
  const imageId = g.cover?.image_id ?? null;
  return {
    igdbId: g.id,
    name: g.name,
    slug: g.slug ?? null,
    rating: score != null ? Math.round(score) : null,
    releaseYear: g.first_release_date
      ? new Date(g.first_release_date * 1000).getUTCFullYear()
      : null,
    summary: g.summary ?? null,
    coverImageId: imageId,
    coverUrl: imageId
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
      : null,
    url: g.url ?? null,
  };
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim();

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json(
      {
        error:
          "IGDB credentials are not configured. Add TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET to .env.local.",
        games: [],
      },
      { status: 503 },
    );
  }

  if (!query) {
    return NextResponse.json({ games: [] });
  }

  try {
    const token = await getAccessToken();
    // Apicalypse query. `search` ranks by relevance; we pull the fields we cache
    // into Sanity plus total_rating so the "most popular" reading is meaningful.
    const escaped = query.replace(/"/g, '\\"');
    const body = `search "${escaped}"; fields name,slug,rating,aggregated_rating,total_rating,first_release_date,summary,url,cover.image_id; limit 16;`;

    const res = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
        Accept: "application/json",
      },
      body,
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `IGDB request failed (${res.status}). ${detail}`.trim(), games: [] },
        { status: 502 },
      );
    }

    const raw = (await res.json()) as RawGame[];
    const games = raw
      .map(normalize)
      // Surface the most-rated titles first within the relevance set.
      .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));

    return NextResponse.json({ games });
  } catch (error) {
    console.error("IGDB proxy error", error);
    return NextResponse.json(
      { error: "Could not reach IGDB. Check the server logs.", games: [] },
      { status: 500 },
    );
  }
}
