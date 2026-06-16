---
target: graveyard + eulogy (app/Cemetery.tsx)
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-06-16T12-30-53Z
slug: app-cemetery-tsx
---
# Critique: Graveyard + Eulogy (app/Cemetery.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Hover/press/modal feedback is clear; clickability of a stone relies on hover alone |
| 2 | Match System / Real World | 4 | Gravestone → eulogy → "cause of death" metaphor is exact and legible |
| 3 | User Control and Freedom | 3 | Escape + scrim + close button; focus not restored to trigger on close |
| 4 | Consistency and Standards | 4 | Cohesive jewel-plastic system, predictable behavior |
| 5 | Error Prevention | 3 | n/a — no destructive actions; external links open in new tab |
| 6 | Recognition Rather Than Recall | 3 | Everything visible; no hidden nav |
| 7 | Flexibility and Efficiency | 2 | No search/sort/filter; no way to find a specific studio as the list grows |
| 8 | Aesthetic and Minimalist Design | 4 | Focused, atmospheric, every element earns its place |
| 9 | Error Recovery | 3 | n/a — minimal failure surface |
| 10 | Help and Documentation | 2 | None; the metaphor self-explains but there is no orientation for scale |
| **Total** | | **31/40** | **Good** |

## Anti-Patterns Verdict
PASS. Does not read AI-generated. Specific type pairing (Cinzel/Chakra), headstone silhouette, boot-orb, CRT layer. Only reflex-flag is glassmorphism, which is the documented brand material (jewel plastic), not decorative default. No gradient text, AI fonts, side-stripes, nested cards, or hero-metric template.

Deterministic scan: UNAVAILABLE — bundled detector failed to load (missing scripts/lib/impeccable-config.mjs; install incomplete). No browser overlay this run.

## Overall Impression
The concept is fully realized and emotionally on-target: a wake held inside a 2001 console. The biggest opportunity is not aesthetic but structural — the experience is built for a small, hand-placed field of graves and has no affordance for finding one studio among many. As the Sanity dataset grows, the single scroll of tilted stones becomes a liability.

## What's Working
1. The metaphor carries the whole IA — gravestone, "R·I·P", "cause of death", "interred", "EXHUMED" — zero jargon, instant comprehension.
2. Motion craft: staggered stone entrance, asymmetric modal enter/exit, real reduced-motion handling, press feedback. It feels alive without showing off (matches "reverence over spectacle").
3. The eulogy modal is genuinely informative — cause, games, IGDB covers with ratings, epitaph — a satisfying peak-end payoff per click.

## Priority Issues

[P1] No way to find a specific studio. As the list grows past ~15–20 graves, there is no search, sort, or filter; the user must eyeball a tilted field. Hurts the "credible reference they return to" goal. Fix: add a quiet search/sort affordance that respects the mood (e.g. a chrome-styled filter bar), or chronological grouping. Suggested command: /impeccable shape.

[P1] Modal focus management missing. Focus is not moved into the dialog, not trapped, not restored on close. Keyboard/SR users can tab behind it. Escape works. Fix: focus-trap, move-on-open, restore-on-close. Suggested command: /impeccable harden.

[P2] Stone date/label contrast likely sub-AA. Semi-transparent dark ink (rgba(18,44,8,.72), rgba(20,46,8,.55)) on the darker lower half of the stone gradient — dark on dark. Fix: solid stone-ink or lighten lower stone. Suggested command: /impeccable colorize.

[P2] Boot intro replays every visit with no memory. A 4.6s gate on every load punishes return visitors (Alex/Casey). Fix: remember "booted" in sessionStorage, or shorten on repeat. Suggested command: /impeccable harden.

[P3] Empty state undefined. With 0 studios the count reads "0" over an empty grid with no message. Fix: a tombstone-shaped empty state. Suggested command: /impeccable onboard.

## Persona Red Flags

Sam (accessibility-dependent): Modal does not trap or restore focus. Stone metadata contrast likely below 4.5:1. No tuned focus-visible ring on translucent buttons. Decorative overlays correctly hidden — good.

Casey (distracted mobile): Boot intro replays every visit, costing 4.6s on a small screen. IGDB covers shrink to ~90px in a 94vw modal (fixed 3 columns). Close target 34px, under 44px.

Riley (stress tester): No empty state at 0 studios. Very long studio names rely on text-wrap balance + min-height; worth checking the longest real names at mobile width. External "Source" / IGDB links open new tabs without rel hardening beyond noreferrer (present — good).

## Minor Observations
- Clickability of a stone is signaled only by hover; consider a faint persistent affordance for touch users.
- The "interred" count is the one hero-metric-shaped element; it stays on the right side of taste because it is a death toll, but watch it if more stats appear.
- Footer text rgba(174,219,124,.42) is very faint on the void — borderline even as de-emphasized chrome.

## Questions to Consider
- What does this look like at 80 graves instead of 8? Does the single tilted field still work, or does it want chronology/era sections?
- Should returning visitors skip the boot ritual, or is the ritual the point every time?
- Is there a quiet way to let someone deep-link to a single studio's eulogy (shareable grave)?
