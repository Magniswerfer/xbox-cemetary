"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { Studio } from "@/src/sanity/lib/queries";

// Gentle, deterministic per-tombstone tilt so the graveyard reads as hand-placed.
const TILTS = [-2.5, 1.8, -1.4, 2.6, -2.2, 1.4, -1.8, 2.2];

// Exit animation length — keep in sync with `modalOut` in globals.css.
const CLOSE_MS = 200;

// Remembers that the boot ritual already played this session.
const BOOT_KEY = "xbox-cemetery:booted";

type SortId = "died-desc" | "died-asc" | "name" | "lifespan";

const SORTS: { id: SortId; label: string }[] = [
  { id: "died-desc", label: "Newest" },
  { id: "died-asc", label: "Oldest" },
  { id: "name", label: "A–Z" },
  { id: "lifespan", label: "Longest" },
];

// A green boot-orb with a Latin cross instead of the Xbox "X" — a headstone mark.
function CrossOrb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="45" fill="url(#xorb)" stroke="rgba(225,255,170,.45)" strokeWidth="1.5" />
      <path d="M50 21 V79" fill="none" stroke="#f2ffd0" strokeWidth="9" strokeLinecap="round" />
      <path d="M32 41 H68" fill="none" stroke="#f2ffd0" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="38" cy="32" rx="15" ry="9" fill="rgba(255,255,255,.35)" />
    </svg>
  );
}

export default function Cemetery({ studios, boot = true }: { studios: Studio[]; boot?: boolean }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("died-desc");
  const [selected, setSelected] = useState<Studio | null>(null);
  const [closing, setClosing] = useState(false);
  const [booted, setBooted] = useState(!boot);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Stable tilt per studio (keyed by id) so sorting doesn't re-scramble the field.
  const tiltById = useMemo(() => {
    const map: Record<string, number> = {};
    studios.forEach((s, i) => {
      map[s._id] = TILTS[i % TILTS.length];
    });
    return map;
  }, [studios]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? studios.filter((s) => {
          const games = [
            ...(s.games ?? []),
            ...((s.igdbGames ?? []).map((g) => g.name)),
          ];
          return (
            s.name.toLowerCase().includes(q) ||
            games.some((g) => g.toLowerCase().includes(q))
          );
        })
      : studios;

    const list = [...matched];
    list.sort((a, b) => {
      switch (sort) {
        case "died-asc":
          return a.died - b.died || a.name.localeCompare(b.name);
        case "name":
          return a.name.localeCompare(b.name);
        case "lifespan":
          return b.died - b.born - (a.died - a.born) || a.name.localeCompare(b.name);
        case "died-desc":
        default:
          return b.died - a.died || a.name.localeCompare(b.name);
      }
    });
    return list;
  }, [studios, query, sort]);

  // Boot ritual — play once per session, then remember it. Return visitors
  // (the key is already set) skip straight past it.
  useEffect(() => {
    if (!boot) return;
    const alreadyBooted =
      typeof window !== "undefined" && window.sessionStorage.getItem(BOOT_KEY) !== null;
    const t = setTimeout(() => setBooted(true), alreadyBooted ? 0 : 4600);
    return () => clearTimeout(t);
  }, [boot]);

  useEffect(() => {
    if (booted && typeof window !== "undefined") {
      window.sessionStorage.setItem(BOOT_KEY, "1");
    }
  }, [booted]);

  // Pause the CRT scanline animation while the tab is hidden (saves compositing).
  useEffect(() => {
    const onVis = () => {
      document.documentElement.toggleAttribute("data-cemetery-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const openEulogy = useCallback((studio: Studio) => {
    lastFocused.current = (document.activeElement as HTMLElement) ?? null;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setSelected(studio);
  }, []);

  const closeEulogy = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setSelected(null);
      setClosing(false);
      // Restore focus to the grave that opened the eulogy.
      lastFocused.current?.focus();
    }, CLOSE_MS);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (!selected) return;
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEulogy();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, closeEulogy]);

  // Trap Tab focus inside the open dialog.
  const onModalKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = modalRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const showBoot = boot && !booted;
  const hasStudios = studios.length > 0;

  return (
    <div className="cemetery">
      {/* Shared gradient defs for every cross-orb on the page */}
      <svg className="svg-defs" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="xorb" cx="36%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#e6ffb0" />
            <stop offset="38%" stopColor="#8fd13a" />
            <stop offset="100%" stopColor="#1c4f0c" />
          </radialGradient>
        </defs>
      </svg>

      <div className="ambient-base" aria-hidden="true" />

      {/* BOOT INTRO */}
      {showBoot && (
        <button type="button" className="boot" onClick={() => setBooted(true)} aria-label="Enter the cemetery">
          <div className="boot-orb-wrap">
            <span className="boot-ring" />
            <span className="boot-ring boot-ring-2" />
            <div className="boot-orb">
              <CrossOrb />
            </div>
          </div>
          <div className="boot-title">XBOX</div>
          <div className="boot-sub">C E M E T E R Y</div>
          <div className="boot-cta">▷&nbsp;&nbsp;PRESS START / CLICK TO ENTER</div>
        </button>
      )}

      {/* HEADER */}
      <header className="site-header">
        <div className="logo">
          <CrossOrb />
        </div>
        <div className="header-titles">
          <h1 className="header-title">XBOX CEMETERY</h1>
          <p className="header-sub">In memoriam — studios laid to rest by the green machine</p>
        </div>
        <div className="header-count">
          <div className="count-num">{studios.length}</div>
          <div className="count-label">interred</div>
        </div>
      </header>

      <main className="cemetery-main">
        {/* CONTROLS */}
        {hasStudios && (
          <div className="controls">
            <div className="search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                className="search-input"
                type="search"
                value={query}
                placeholder="Search the dead — studio or game…"
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search studios by name or game"
              />
            </div>
            <div className="sort" role="group" aria-label="Sort graves">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`sort-btn${sort === s.id ? " is-active" : ""}`}
                  aria-pressed={sort === s.id}
                  onClick={() => setSort(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* GRAVEYARD */}
        <section className="graveyard" aria-live="polite">
          <div className="mist mist-a" aria-hidden="true" />
          <div className="mist mist-b" aria-hidden="true" />

          {filtered.length > 0 ? (
            <div className="grave-grid">
              {filtered.map((s, i) => (
                <div
                  className="grave"
                  key={s._id}
                  style={
                    {
                      transform: `rotate(${tiltById[s._id] ?? 0}deg)`,
                      "--rise": `${Math.min(i, 12) * 45}ms`,
                    } as CSSProperties
                  }
                >
                  <button type="button" className="grave-stone" onClick={() => openEulogy(s)}>
                    <div className="grave-rip">R · I · P</div>
                    <div className="grave-name">{s.name}</div>
                    <div className="grave-dates">
                      ★ {s.born} &nbsp;&nbsp; ✝ {s.died}
                    </div>
                    <div className="grave-span">{Math.max(0, s.died - s.born)} years</div>
                  </button>
                  <div className="grave-shadow" aria-hidden="true" />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-grave" role="status">
              <div className="empty-stone">
                <div className="grave-rip">R · I · P</div>
                <p className="empty-title">
                  {hasStudios ? "No graves found" : "The cemetery is empty"}
                </p>
                <p className="empty-body">
                  {hasStudios ? (
                    <>Nothing matches “{query.trim()}”. Try another studio or game.</>
                  ) : (
                    <>No studios have been interred yet. The dead will appear here.</>
                  )}
                </p>
                {hasStudios && (
                  <button type="button" className="empty-clear" onClick={() => setQuery("")}>
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}

          {filtered.length > 0 && (
            <p className="graveyard-quote">
              {query.trim()
                ? `${filtered.length} of ${studios.length} laid to rest`
                : "“Every studio dreams of a sequel. Few are granted one.”"}
            </p>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>Rest in peace · 2001 — ∞</span>
        <span>Gone, but still in the credits</span>
      </footer>

      {/* EULOGY PANEL */}
      {selected && (
        <div
          className={`eulogy${closing ? " is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Eulogy for ${selected.name}`}
          onKeyDown={onModalKeyDown}
        >
          <div className="eulogy-scrim" onClick={closeEulogy} aria-hidden="true" />
          <div className="eulogy-modal" ref={modalRef}>
            <div className="eulogy-head">
              <div className="eulogy-kicker">⚰ Here lies</div>
              <button
                type="button"
                className="eulogy-close"
                onClick={closeEulogy}
                aria-label="Close eulogy"
                ref={closeBtnRef}
              >
                ✕
              </button>
            </div>

            <h2 className="eulogy-name">{selected.name}</h2>

            <div className="eulogy-dates">
              <span>★ {selected.born}</span>
              <span className="eulogy-rule" />
              <span>✝ {selected.died}</span>
            </div>

            <div className="eulogy-label">Cause of death</div>
            <p className="eulogy-cause">{selected.cause}</p>

            {selected.games?.length ? (
              <>
                <div className="eulogy-label">Notable works left behind</div>
                <div className="eulogy-games">
                  {selected.games.map((g) => (
                    <span className="eulogy-chip" key={g}>
                      {g}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            {selected.igdbGames?.length ? (
              <>
                <div className="eulogy-label">Most popular on IGDB</div>
                <div className="igdb-grid">
                  {selected.igdbGames.map((game) => {
                    const Wrapper = game.url ? "a" : "div";
                    return (
                      <Wrapper
                        key={game.igdbId}
                        className="igdb-card"
                        {...(game.url
                          ? { href: game.url, target: "_blank", rel: "noreferrer" }
                          : {})}
                        title={game.summary ?? undefined}
                      >
                        <div className="igdb-cover">
                          {game.coverUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={game.coverUrl} alt={`${game.name} cover art`} loading="lazy" />
                          ) : (
                            <div className="igdb-cover-fallback" aria-hidden="true">
                              <CrossOrb />
                            </div>
                          )}
                          {game.rating != null && <span className="igdb-rating">★ {game.rating}</span>}
                        </div>
                        <div className="igdb-name">{game.name}</div>
                        {game.releaseYear != null && (
                          <div className="igdb-year">{game.releaseYear}</div>
                        )}
                      </Wrapper>
                    );
                  })}
                </div>
              </>
            ) : null}

            {selected.revived ? (
              <div className="eulogy-exhumed">
                <strong>⟲ EXHUMED.</strong> {selected.revived}
              </div>
            ) : null}

            <div className="eulogy-quote">
              <div className="eulogy-quote-mark">“</div>
              <p>{selected.epitaph}</p>
            </div>

            {selected.sourceUrl ? (
              <a className="eulogy-source" href={selected.sourceUrl} target="_blank" rel="noreferrer">
                Read the record ↗
              </a>
            ) : null}
          </div>
        </div>
      )}

      {/* CRT OVERLAYS */}
      <div className="crt-scan" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-grain" aria-hidden="true" />
    </div>
  );
}
