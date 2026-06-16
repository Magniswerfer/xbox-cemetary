import { defineField, defineType } from "sanity";
import { IgdbGamesInput } from "../components/IgdbGamesInput";

// One IGDB title, cached into the studio document by the custom input below.
// Every field is read-only in the Studio UI because the data is owned by IGDB —
// editors curate the *selection*, not the values.
export const igdbGame = defineType({
  name: "igdbGame",
  title: "IGDB game",
  type: "object",
  fields: [
    defineField({ name: "igdbId", title: "IGDB ID", type: "number", readOnly: true }),
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "slug", title: "Slug", type: "string", readOnly: true }),
    defineField({ name: "coverUrl", title: "Cover image URL", type: "url", readOnly: true }),
    defineField({ name: "coverImageId", title: "Cover image ID", type: "string", readOnly: true }),
    defineField({ name: "rating", title: "Rating (0–100)", type: "number", readOnly: true }),
    defineField({ name: "releaseYear", title: "Release year", type: "number", readOnly: true }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4, readOnly: true }),
    defineField({ name: "url", title: "IGDB URL", type: "url", readOnly: true }),
  ],
  preview: {
    select: {
      title: "name",
      releaseYear: "releaseYear",
      rating: "rating",
      coverUrl: "coverUrl",
    },
    prepare({ title, releaseYear, rating, coverUrl }) {
      const subtitle = [releaseYear, rating ? `★ ${rating}` : null]
        .filter(Boolean)
        .join("  ·  ");
      return {
        title: title || "Untitled game",
        subtitle: subtitle || "IGDB game",
        media: coverUrl
          ? // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt="" style={{ objectFit: "cover" }} />
          : undefined,
      };
    },
  },
});

// Array field used inside the studio schema. Wired to the IGDB search input.
export const igdbGamesField = defineField({
  name: "igdbGames",
  title: "IGDB games",
  description: "Search IGDB and add the studio's most notable titles with live cover art and metadata.",
  type: "array",
  of: [{ type: "igdbGame" }],
  components: { input: IgdbGamesInput },
});
