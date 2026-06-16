---
name: Xbox Cemetery
description: A translucent-green memorial for the game studios laid to rest by the green machine.
colors:
  void-black: "#040704"
  jewel-lime: "#8fd13a"
  toxic-lime: "#bff05a"
  bone: "#eaffc0"
  moss: "#d6f7a0"
  stone-ink: "#0f2607"
  jewel-deep: "#1c4f0c"
  orb-core: "#e6ffb0"
typography:
  display:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "clamp(1.9rem, 6vw, 2.4rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.85rem"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "normal"
  title:
    fontFamily: "Cinzel, Georgia, serif"
    fontSize: "1.16rem"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "0.02em"
  body:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "0.69rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.26em"
rounded:
  stone: "108px 108px 12px 12px"
  modal: "22px"
  card: "10px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "34px"
components:
  grave-stone:
    backgroundColor: "{colors.jewel-lime}"
    textColor: "{colors.stone-ink}"
    rounded: "{rounded.stone}"
    padding: "26px 16px 20px"
  eulogy-modal:
    backgroundColor: "{colors.jewel-deep}"
    textColor: "{colors.bone}"
    rounded: "{rounded.modal}"
    padding: "34px 32px 40px"
  eulogy-chip:
    backgroundColor: "{colors.jewel-lime}"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  rating-badge:
    backgroundColor: "{colors.toxic-lime}"
    textColor: "{colors.stone-ink}"
    rounded: "{rounded.pill}"
    padding: "2px 7px"
---

# Design System: Xbox Cemetery

## 1. Overview

**Creative North Star: "The Jewel-Case Reliquary"**

Xbox Cemetery is the translucent green plastic shell of an original Xbox, hollowed out and turned into a reliquary. The whole surface behaves like backlit jewel plastic — layered greens, glossy bevels, an inner glow — and the things it holds are the dead: studios shut down by the green machine, each laid out as a headstone you can pick up and read. It is a wake held inside a 2001 console, lit by a CRT.

The system runs on a single tension: **carved stone against early-digital chrome.** Cinzel (Roman engraved capitals) carries every name and epitaph — the gravestone voice. Chakra Petch (squared, early-2000s digital) carries the chrome — labels, counts, metadata, the dashboard furniture. Ancient mourning meets boot-screen UI. Atmosphere is dense and deliberate: drifting mist, scanlines, grain, a vignette, and a green boot-orb intro that plays once before the graveyard is revealed. Nothing here is flat; every plane is a slab of glowing green resin.

It explicitly rejects three things. It is **not** the official Xbox/Microsoft site — no corporate gloss, no on-brand cheer; this is unofficial and elegiac. It is **not** generic "gamer" RGB — no neon rainbow, no angular esports edge; the green is one specific material, not decoration. And it is **not** a sterile wiki or data table — the mood carries equal weight to the facts.

**Key Characteristics:**
- Translucent jewel-green plastic on every surface (layered greens, inset bevels, backdrop blur, glossy top highlight).
- Engraved-stone display type (Cinzel) against squared digital chrome (Chakra Petch).
- Era hardware cues: green boot-orb, CRT scanlines + grain + vignette, the X-orb mark.
- Reverent, dry, bittersweet — a wake, never a roast.
- The atmosphere degrades gracefully: motion and effects pull back without breaking the layout or the meaning.

## 2. Colors

A near-black void lit from below by a single hue — Xbox green — ramped from a deep forest floor up to a toxic, glowing lime, with two warm bone tones for legible text.

### Primary
- **Jewel Lime** (#8fd13a): The brand's core green. The plastic the console is molded from — it fills stone gradients, the X-orb core, chip and panel backgrounds. Almost never used as flat fill; always layered over darker greens through transparency.
- **Toxic Lime** (#bff05a): The hottest accent, reserved for what must glow — the "interred" count, rating badges, active highlights, the boot CTA. Its rarity is the point (see the One Glow Rule).

### Neutral
- **Void Black** (#040704): The page ground. Everything floats above it; the radial green glow rises from the bottom edge.
- **Jewel Deep** (#1c4f0c): The dark end of the green ramp. Bottom of stone gradients, modal base, shadow-side of bevels.
- **Bone** (#eaffc0): Warm off-white for display text and names on dark surfaces. The primary legible light tone.
- **Moss** (#d6f7a0): Body and secondary text on dark — softer than bone, still comfortably legible.
- **Stone Ink** (#0f2607): The near-black green carved into the *lit* face of a headstone. Used only on jewel-lime surfaces, always paired with a light engraving highlight (`text-shadow`).
- **Orb Core** (#e6ffb0): The hot center of the X-orb radial gradient; a near-white green-cream highlight.

### Named Rules
**The One Glow Rule.** Toxic Lime (#bff05a) is the only color allowed to glow, and it appears on at most one or two elements per view (the count, a rating, the active CTA). Spread it around and the reverence collapses into neon. Scarcity is what makes the glow read as sacred.

**The Stone-Ink Contract.** Stone Ink (#0f2607) is used *only* on a lit jewel-lime face, and *only* with a light engraving `text-shadow`. Never put Stone Ink on the void or on a dark green; it disappears.

## 3. Typography

**Display Font:** Cinzel (with Georgia, serif fallback)
**Body / UI Font:** Chakra Petch (with sans-serif fallback)

**Character:** A deliberate contrast pairing — Cinzel's carved Roman capitals are the gravestone; Chakra Petch's squared early-digital letterforms are the 2001 dashboard. Serif-engraved against geometric-digital: the two never blur together, which is the whole point. One mourns, one operates.

### Hierarchy
- **Display** (Cinzel 900, `clamp(1.9rem, 6vw, 2.4rem)`, lh 1): The site wordmark "XBOX CEMETERY" and the boot title. Engraved, glowing, letter-spaced.
- **Headline** (Cinzel 900, ~1.85rem, lh 1.08): The eulogy subject's name in the modal — the loudest single word on screen.
- **Title** (Cinzel 700, ~1.16rem, lh 1.16): A studio name on its headstone, balanced across two lines.
- **Body** (Chakra Petch 400, ~0.9rem, lh 1.6): Cause-of-death prose and longer copy. Cap measure at 65–75ch.
- **Label** (Chakra Petch 700, ~0.69rem, tracking 0.26em, UPPERCASE): Section labels, dates, the "interred" / "R·I·P" furniture. The chrome voice.

### Named Rules
**The Two-Voice Rule.** Cinzel is reserved for names, the wordmark, and epitaphs — anything being *remembered*. Chakra Petch carries everything operational — labels, dates, counts, metadata. A studio name never appears in Chakra; a UI label never appears in Cinzel.

**The Carved-Caps Rule.** Display and label type is uppercase with positive tracking (0.04em–0.55em). Lowercase Cinzel headings are prohibited — it reads as a wedding invitation, not a headstone.

## 4. Elevation

A layered, lifted system — surfaces are explicitly *floating slabs of resin*, not flat cards. Depth is built from four stacked ingredients on every raised plane: a glossy top-edge inset highlight, a dark inset bottom shadow (the resin's thickness), a soft drop shadow, and a faint green ambient glow. `backdrop-filter: blur()` under each slab sells the translucency. This is the one place glassmorphism is not only allowed but mandatory — it *is* the brand material, not a decorative default.

### Shadow Vocabulary
- **Stone slab** (`inset 0 2px 0 rgba(230,255,170,.4), inset 0 -34px 50px rgba(0,16,0,.5), 0 18px 30px rgba(0,0,0,.45), 0 0 36px rgba(124,210,58,.12)`): A headstone at rest. The four-part recipe above.
- **Stone lifted** (hover: drop deepens to `0 24px 40px`, ambient glow rises to `rgba(143,209,58,.4)`): A stone raised 7px toward the cursor.
- **Modal float** (`inset 0 1px 0 rgba(230,255,170,.3), 0 40px 120px rgba(0,0,0,.62), 0 0 60px rgba(124,210,58,.14)`): The eulogy, lifted high above a blurred scrim.

### Named Rules
**The Four-Part Slab Rule.** Every raised surface carries all four ingredients — top highlight, inner bottom shadow, drop shadow, ambient glow. Drop one and the plastic looks painted-on instead of molded. The glow is faint at rest and only brightens on interaction.

## 5. Components

### Gravestone (signature component)
- **Shape:** Rounded-top headstone (`border-radius: 108px 108px 12px 12px`), with a separate soft cast-shadow ellipse beneath. Each stone carries a small per-instance rotation (±1.4–2.6°) so the field reads hand-placed.
- **Surface:** Jewel-lime gradient over dark green, the four-part slab shadow, `backdrop-filter: blur(8px)`. Asymmetric 1px bevel borders (light top/left, dark right) sell the molded edge.
- **Content:** "R·I·P" label, the studio name in Cinzel, born–died dates, and a lifespan pill — all in Stone Ink on the lit face.
- **States:** Hover lifts 7px with a brighter glow (pointer devices only). `:active` presses to `scale(0.97)` — pushing the stone into the earth. Entrance staggers in (rise + fade, 45ms apart).

### Eulogy Modal
- **Shape:** Centered dialog, `22px` radius, `min(480px, 100%)` wide, max-height with internal scroll.
- **Surface:** Deep-green gradient, full 1px toxic-tinted border, modal-float shadow, heavy backdrop blur over a dark blurred scrim.
- **Motion:** Enters with `modalIn` (rise + scale 0.94 + de-blur, 420ms ease-out); exits faster (`modalOut`, 200ms) — asymmetric by design.
- **Behavior:** Real `role="dialog"` / `aria-modal`, Escape-closable, labeled. Holds the name, a born–died rule, cause prose, game chips, the IGDB cover grid, an optional "EXHUMED" note, and the epitaph block.

### Chips
- **Game chip:** Jewel-lime gradient, 1px toxic border, pill radius, Bone text, inset top highlight. Used for notable-game tags.
- **Lifespan / date / label pills:** Smaller, lower-contrast variants of the same pill on stone or in chrome.

### IGDB Cards
- **Shape:** 3-up grid of `3/4` cover tiles, `10px` radius, jewel border.
- **Content:** Cover art (or a fallback X-orb tile), a toxic-lime rating badge top-right, Cinzel title, year.
- **States:** Hover lifts 3px and brightens the border/glow (pointer only); `:active` presses to `scale(0.98)`.

### The X-Orb (brand mark)
A radial-gradient sphere (orb-core → jewel-lime → jewel-deep) crossed by the two white Xbox arcs, with a glossy top highlight. Appears as the header logo, the boot-screen orb, and the IGDB cover fallback. One shared SVG gradient def, reused everywhere.

### Boot Intro
A one-time full-screen overlay: the X-orb grows from `scale(0.45)` with two expanding rings, the wordmark letter-spaces open, a pulsing "PRESS START / CLICK TO ENTER" CTA. Auto-dismisses after 4.6s or on click.

## 6. Do's and Don'ts

### Do:
- **Do** mold every raised surface as translucent jewel plastic — the four-part slab shadow (top highlight + inner bottom shadow + drop shadow + ambient glow) plus `backdrop-filter: blur()`. The glass *is* the brand.
- **Do** keep the Two-Voice split absolute: Cinzel for the remembered (names, wordmark, epitaphs), Chakra Petch for the operational (labels, dates, counts).
- **Do** reserve Toxic Lime (#bff05a) glow for at most one or two elements per view (the One Glow Rule).
- **Do** pair Stone Ink (#0f2607) only with a lit jewel-lime face and a light engraving `text-shadow`.
- **Do** let the atmosphere degrade gracefully — every motion and effect needs a `prefers-reduced-motion` fallback that keeps the layout and meaning intact.
- **Do** keep the humor dry and carved-in — bittersweet epitaphs, never punchlines.

### Don't:
- **Don't** make it look like the official Xbox/Microsoft site — no corporate gloss, no marketing cheer. This is unofficial and elegiac.
- **Don't** drift into generic "gamer" RGB — no neon rainbow, no angular esports tropes, no Discord-dark sameness. The green is one specific material.
- **Don't** let it become a sterile wiki or data table — the mood carries equal weight to the facts.
- **Don't** go goofy, meme-y, or clickbait — it's a wake, not a roast.
- **Don't** put Stone Ink on the void or on dark green (it vanishes), and **don't** set Cinzel headings lowercase (it stops reading as stone).
- **Don't** spread the Toxic Lime glow across many elements — scarcity is what makes it sacred.
