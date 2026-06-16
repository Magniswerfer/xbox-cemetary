import { defineArrayMember, defineField, defineType } from "sanity";
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
      name: "logo",
      title: "Studio logo",
      description: "Optional: shown above the studio name in the eulogy.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover art / image",
      description: "Optional: a banner image shown at the top of the eulogy.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Optional intro line shown at the top of the eulogy.",
      type: "text",
      rows: 2,
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
      description: "Optional: how and why the studio was closed.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(400),
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
      title: "Primary source URL",
      description: "Optional: the main record (e.g. the closure announcement).",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "wikipediaUrl",
      title: "Wikipedia URL",
      description: "Optional: link to the studio's Wikipedia page.",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "links",
      title: "Other links & sources",
      description: "Optional: additional articles, obituaries, or references.",
      type: "array",
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
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
