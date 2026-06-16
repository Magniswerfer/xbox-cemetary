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
  logoUrl?: string;
  logoAlt?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  description?: string;
  games?: string[];
  igdbGames?: IgdbGame[];
  cause?: string;
  revived?: string;
  location?: string;
  sourceUrl?: string;
  wikipediaUrl?: string;
  links?: { label: string; url: string }[];
};

const studiosQuery = groq`*[_type == "studio"] | order(coalesce(orderRank, 9999) asc, died asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  born,
  died,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  description,
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
  revived,
  location,
  sourceUrl,
  wikipediaUrl,
  links[]{
    label,
    url
  }
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

export type SiteSettings = {
  tagline: string;
  footerLeft: string;
  footerRight: string;
  inspiredByName: string;
  inspiredByUrl: string;
  githubUrl?: string;
};

export const defaultSettings: SiteSettings = {
  tagline: "In memoriam",
  footerLeft: "Rest in peace · 2001 — ∞",
  footerRight: "Gone, but still in the credits",
  inspiredByName: "killedbygoogle.com",
  inspiredByUrl: "https://killedbygoogle.com",
};

const settingsQuery = groq`*[_type == "siteSettings"][0]{
  tagline,
  footerLeft,
  footerRight,
  inspiredByName,
  inspiredByUrl,
  githubUrl
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanityConfig) return defaultSettings;

  try {
    const data = await client.fetch<Partial<SiteSettings> | null>(
      settingsQuery,
      {},
      { next: { revalidate: 60 } },
    );
    // Empty/missing fields fall back to defaults rather than blanking the chrome.
    const set = Object.fromEntries(
      Object.entries(data ?? {}).filter(([, v]) => v != null && v !== ""),
    );
    return { ...defaultSettings, ...set };
  } catch (error) {
    console.warn("Could not reach Sanity for site settings; using defaults.", error);
    return defaultSettings;
  }
}
