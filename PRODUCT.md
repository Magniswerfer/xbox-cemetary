# Product

## Register

brand

## Users

Gaming-history enthusiasts and preservation-minded players — people who followed the studios behind Halo Wars, Fable, Hi-Fi Rush, and remember when they went dark. They arrive curious, often a little wistful, frequently from a link someone shared. Their context is leisure browsing, not work: they're here to feel something and to learn, not to complete a task. Success is that a closure they only half-remembered suddenly feels real and specific again.

## Product Purpose

An unofficial memorial that documents game studios closed, dissolved, or absorbed under the Xbox / Microsoft umbrella. It exists to turn a dry list of corporate closures into something that registers emotionally — a place of remembrance with the facts intact. Each studio is a grave: name, lifespan, cause of death, the games it left behind, and a one-line epitaph. Content is CMS-backed (Sanity) and enriched with live IGDB game data, so the record stays accurate and extensible over time. Success looks like a visitor lingering, clicking through several eulogies, and leaving with the losses feeling tangible rather than abstract.

## Brand Personality

Elegiac, nostalgic, wry. The voice is a eulogist with a dark sense of humor — it mourns sincerely but isn't above a dry, bittersweet joke carved into the headstone ("Survived its own horror games. Not the spreadsheet."). Era-authentic to the early-2000s Xbox: green translucent jewel plastic, the boot-up orb, CRT glow. The emotional target is reverence laced with melancholy and a knowing half-smile — never solemn to the point of dull, never flippant to the point of disrespectful.

## Anti-references

- **The official Xbox / Microsoft site.** This is unofficial and elegiac, not polished corporate marketing. No product-page gloss, no on-brand cheerfulness.
- **Generic "gamer" RGB dark UI.** No neon rainbow, no aggressive angular esports tropes, no Discord-dark sameness. The green is specific and material (jewel plastic), not decorative neon.
- **A sterile wiki or data table.** Not a Wikipedia list or spreadsheet. The mood carries equal weight to the facts; atmosphere is the point.
- **Jokey / meme tone.** The humor stays dry and bittersweet. Never goofy, clickbait, or meme-y — it's a wake, not a roast.

## Design Principles

1. **Reverence over spectacle.** The atmosphere exists to serve the elegy. Effects mourn; they don't show off. If a flourish draws attention to itself instead of the studio, cut it.
2. **Period-authentic, not cosplay.** Evoke the 00s Xbox era through material truth — translucent jewel-green plastic, CRT scanlines, the boot orb — not literal logos or kitsch nostalgia.
3. **Every grave is sourced.** Credibility underpins the mood. Facts, citations, and real metadata (Sanity + IGDB + source links) are part of the respect, not an afterthought.
4. **Dry, never goofy.** Humor is a eulogist's wit — understated, bittersweet, carved in stone. The line should make you exhale through your nose, not laugh out loud.
5. **The mood survives accessibility.** The experience must hold up with motion reduced and effects dialed back. Atmosphere should degrade gracefully, never gate the content or the meaning behind it.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Body and stone text must clear contrast minimums against their translucent backgrounds (verify the dark-ink text on jewel-green stones especially). Honor `prefers-reduced-motion` across the boot intro, gravestone stagger, mist drift, modal transitions, and CRT flicker — reduced means calm crossfades or instant states, not broken layout. Keyboard and screen-reader paths must stay coherent: the eulogy modal is a real dialog (focusable, Escape-closable, labeled), graves are real buttons. CRT scanlines, grain, and vignette are decorative overlays (`aria-hidden`, `pointer-events: none`) and must never reduce text legibility below AA.
