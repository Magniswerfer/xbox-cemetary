# Xbox Cemetery

A single-page memorial for the game studios closed by Microsoft / Xbox — inspired by
[Killed by Google](https://killedbygoogle.com). Each studio gets a tombstone in the
graveyard and a full eulogy in a modal. Content is managed through an embedded
[Sanity](https://www.sanity.io/) Studio, with optional rich game data pulled from
[IGDB](https://www.igdb.com/).

The design is the product: a translucent-green "jewel-case reliquary" aesthetic with a
CRT/boot-screen treatment. See [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md) for the
brand and visual system, and [CLAUDE.md](CLAUDE.md) for the working context.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack) + **React 19** + **TypeScript**
- **[Sanity v6](https://www.sanity.io/)** for content, embedded at `/studio` via **next-sanity**
- **IGDB** game data via a server-side **Twitch OAuth** proxy (`/api/igdb`)
- Styling: plain CSS in [`app/globals.css`](app/globals.css) (no UI framework)
- Analytics: **[Umami](https://umami.is/)** (cookieless, loaded in `<head>`)
- Hosting: **Vercel**

Requires **Node 20+**.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

If Sanity isn't configured, the homepage renders an empty cemetery (it fails soft rather
than crashing).

## Environment variables

Copy `.env.local.example` to `.env.local` and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project ID (from https://www.sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | no | Defaults to `2025-06-16` |
| `SANITY_API_READ_TOKEN` | no | Only needed if you add authenticated reads/previews |
| `TWITCH_CLIENT_ID` | no* | IGDB access via Twitch OAuth — create an app at https://dev.twitch.tv/console/apps |
| `TWITCH_CLIENT_SECRET` | no* | Server-only secret (no `NEXT_PUBLIC_` prefix, never shipped to the browser) |

\* Required only if you want the IGDB game-search field in the Studio to work.

## Connecting Sanity

1. Create a project at https://www.sanity.io/manage.
2. Put the project ID and dataset in `.env.local`, then restart `npm run dev`.
3. Open `/studio`, log in, and create `Buried studio` documents.

Optional seed import (eight starter studios from [`sample-data/studios.ndjson`](sample-data/studios.ndjson)):

```bash
npm run sanity:dataset   # imports into the production dataset (--replace)
```

## Content model

Defined in [`src/sanity/schema`](src/sanity/schema):

### `studio` — a buried studio

- **Name** + **slug**
- **Born** (founded year) and **Died** (closure year)
- **Logo** and **Cover art / image** (both optional, with alt text)
- **Description** — optional intro line shown atop the eulogy
- **Notable games (manual)** — simple text tags
- **IGDB games** — rich, linked titles searched and cached from IGDB (see below)
- **Cause of death** — optional
- **Exhumed / revived** — optional note if the studio was brought back
- **Location**, **Primary source URL**, **Wikipedia URL**, and a repeatable
  **Other links & sources** list (label + URL)
- **Sort order** (`orderRank`) — manual override; otherwise sorted by closure year

### `siteSettings` — singleton chrome

Header tagline, footer left/right text, the "Inspired by" credit (label + URL), and an
optional GitHub URL. Empty fields fall back to sensible defaults in code.

### `igdbGame` — object

Cached IGDB fields (id, name, cover, rating, release year, summary, URL). Populated by a
custom Studio input ([`IgdbGamesInput`](src/sanity/components/IgdbGamesInput.tsx)) that
searches IGDB through the `/api/igdb` proxy.

## Front-end behaviour

- **Boot intro** — a one-time-per-session "press F / tap to enter" screen; a pre-paint
  script prevents it from flashing on reload.
- **Search** — filters by **studio name** (not games).
- **Sort** — Newest / Oldest (by closure year), A–Z, and Longest (lifespan).
- **Eulogy modal** — logo, cover banner, dates, description, cause, manual + IGDB games,
  "exhumed" note, and a unified Sources section. Small logos/covers scale up to fill
  their slot (capped at 3× natural size).
- **Atmosphere** — CRT scanlines layered behind content and onto the gravestone/modal
  surfaces; dark-green mobile overscroll + theme-color.
- **Accessibility** — focus trapping in the modal, `Escape` to close, and respect for
  `prefers-reduced-motion` (WCAG 2.1 AA target).

## Routes

| Route | What it is |
| --- | --- |
| `/` | The cemetery (dynamic; revalidates Sanity every 60s) |
| `/studio/[[...tool]]` | Embedded Sanity Studio |
| `/api/igdb?q=...` | Server-side IGDB search proxy |
| `/opengraph-image` | Dynamic 1200×630 social card |
| `/icon.svg` | Favicon (the CrossOrb with glow + scanlines) |
| `/robots.txt`, `/sitemap.xml` | Generated; `robots` disallows `/studio` |

## SEO & analytics

- Metadata, Open Graph + Twitter cards, canonical URL, and a dynamic OG image live in
  [`app/layout.tsx`](app/layout.tsx) and [`app/opengraph-image.tsx`](app/opengraph-image.tsx).
- `robots.txt` / `sitemap.xml` are generated by [`app/robots.ts`](app/robots.ts) and
  [`app/sitemap.ts`](app/sitemap.ts). The canonical domain is set to
  `https://xboxcemetery.com` — update it there if the production domain changes.
- Umami analytics is loaded in `<head>` (see `app/layout.tsx`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run sanity:deploy` | Deploy the Sanity Studio |
| `npm run sanity:dataset` | Import the sample studios into `production` (`--replace`) |

## Project structure

```
app/
  page.tsx              # Home — fetches studios + settings, renders <Cemetery>
  Cemetery.tsx          # The whole client UI (graveyard, search, sort, eulogy modal, boot)
  layout.tsx            # Metadata, fonts, viewport/theme-color, head scripts
  globals.css           # All styling
  opengraph-image.tsx   # Dynamic OG image
  robots.ts, sitemap.ts # Generated SEO files
  studio/[[...tool]]/   # Embedded Sanity Studio
  api/igdb/route.ts     # IGDB proxy (Twitch OAuth)
src/sanity/
  lib/client.ts         # Sanity client + config guard
  lib/queries.ts        # GROQ queries + types (studios, site settings)
  schema/               # studio, siteSettings, igdbGame
  components/           # IgdbGamesInput (Studio search field)
sample-data/            # studios.ndjson seed
sanity.config.ts        # Studio config (desk structure, plugins)
```

## Deployment

Deploys to **Vercel** (`framework: nextjs`). Set the environment variables above in the
Vercel project settings. Pushing to `main` triggers a production build.

## License

[MIT](LICENSE).
