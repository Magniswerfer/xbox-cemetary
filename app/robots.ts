import type { MetadataRoute } from "next";

const SITE_URL = "https://xboxcemetery.com";

export default function robots(): MetadataRoute.Robots {
  return {
    // Index the memorial, but keep the Sanity Studio admin out of search.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
