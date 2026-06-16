import { defineField, defineType } from "sanity";

// Singleton: site-wide chrome (tagline, footer text, credits, links).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Header tagline",
      type: "string",
      initialValue: "In memoriam — studios laid to rest by the green machine",
    }),
    defineField({
      name: "footerLeft",
      title: "Footer — left text",
      type: "string",
      initialValue: "Rest in peace · 2001 — ∞",
    }),
    defineField({
      name: "footerRight",
      title: "Footer — right text",
      type: "string",
      initialValue: "Gone, but still in the credits",
    }),
    defineField({
      name: "inspiredByName",
      title: "Inspired-by — label",
      description: "Shown as “Inspired by <label>”.",
      type: "string",
      initialValue: "killedbygoogle.com",
    }),
    defineField({
      name: "inspiredByUrl",
      title: "Inspired-by — URL",
      type: "url",
      initialValue: "https://killedbygoogle.com",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub repository URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
