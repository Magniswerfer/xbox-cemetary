# Xbox Cemetery

A single-page Next.js app inspired by Killed by Google, with an embedded Sanity Studio for editing the list of Xbox-closed game studios.

## Run locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

If Sanity env vars are not configured, the home page shows demo fallback entries.

## Connect Sanity

1. Create a project at https://www.sanity.io/manage.
2. Put the project ID and dataset in `.env.local`.
3. Restart `npm run dev`.
4. Open `/studio`, log in, and create `Closed studio` documents.

Optional seed import:

```bash
npm run sanity:dataset
```

## Content model

Each closed studio document has:

- Studio name + slug
- Closure date
- Founded year
- Location
- Status note
- Short summary
- Notable games
- Source URL
- Manual sort order
