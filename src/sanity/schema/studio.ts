import { defineField, defineType } from "sanity";
import { igdbGamesField } from "./igdbGame";

const currentYear = new Date().getFullYear();

export const studio = defineType({
  name: "studio",
  title: "Buried studio",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Studio name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "born",
      title: "Born (founded year)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1970).max(currentYear),
    }),
    defineField({
      name: "died",
      title: "Died (closure year)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1970).max(currentYear),
    }),
    defineField({
      name: "games",
      title: "Notable games (manual)",
      description: "Simple text tags. For rich linked titles, use the IGDB games field below.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    igdbGamesField,
    defineField({
      name: "cause",
      title: "Cause of death",
      description: "How and why the studio was closed.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "epitaph",
      title: "Epitaph",
      description: "A short, bittersweet headstone line.",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "revived",
      title: "Exhumed / revived",
      description: "Optional: note if the studio was later acquired or brought back.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      description: "Lower numbers appear first. If omitted, earliest closures appear first.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Closure year (oldest first)",
      name: "diedAsc",
      by: [{ field: "died", direction: "asc" }],
    },
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      born: "born",
      died: "died",
    },
    prepare({ title, born, died }) {
      return {
        title,
        subtitle: born && died ? `${born} – ${died}` : "Years unknown",
      };
    },
  },
});
