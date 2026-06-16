import { groq } from "next-sanity";
import { client, hasSanityConfig } from "./client";

export type IgdbGame = {
  igdbId: number;
  name: string;
  slug?: string;
  coverUrl?: string;
  rating?: number;
  releaseYear?: number;
  summary?: string;
  url?: string;
};

export type Studio = {
  _id: string;
  name: string;
  slug?: string;
  born: number;
  died: number;
  games?: string[];
  igdbGames?: IgdbGame[];
  cause: string;
  epitaph: string;
  revived?: string;
  location?: string;
  sourceUrl?: string;
};

const studiosQuery = groq`*[_type == "studio"] | order(coalesce(orderRank, 9999) asc, died asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  born,
  died,
  games,
  igdbGames[]{
    igdbId,
    name,
    slug,
    coverUrl,
    rating,
    releaseYear,
    summary,
    url
  },
  cause,
  epitaph,
  revived,
  location,
  sourceUrl
}`;

export async function getStudios(): Promise<Studio[]> {
  if (!hasSanityConfig) return [];

  try {
    return await client.fetch<Studio[]>(studiosQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.warn("Could not reach Sanity; showing an empty cemetery.", error);
    return [];
  }
}
