import { useCallback, useState } from "react";
import { type ArrayOfObjectsInputProps, insert, setIfMissing } from "sanity";
import { Box, Button, Card, Flex, Spinner, Stack, Text, TextInput } from "@sanity/ui";

type SearchGame = {
  igdbId: number;
  name: string;
  slug: string | null;
  rating: number | null;
  releaseYear: number | null;
  summary: string | null;
  coverImageId: string | null;
  coverUrl: string | null;
  url: string | null;
};

/**
 * Custom array input: lets editors search IGDB and add titles to a studio.
 * The picked game's metadata is cached straight into the document, and the
 * already-selected items are rendered with Sanity's default array UI (so
 * reorder / remove keep working).
 */
export function IgdbGamesInput(props: ArrayOfObjectsInputProps) {
  const { onChange, value } = props;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const existingIds = new Set(
    (value ?? []).map((item) => (item as { igdbId?: number }).igdbId).filter(Boolean),
  );

  const search = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await fetch(`/api/igdb?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as { games?: SearchGame[]; error?: string };
      if (!res.ok) {
        setError(data.error || `Search failed (${res.status}).`);
        setResults([]);
      } else {
        setResults(data.games ?? []);
      }
    } catch {
      setError("Could not reach the IGDB endpoint (/api/igdb).");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const addGame = useCallback(
    (game: SearchGame) => {
      const item = {
        _type: "igdbGame",
        _key:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `igdb-${game.igdbId}-${Date.now()}`,
        ...game,
      };
      onChange([setIfMissing([]), insert([item], "after", [-1])]);
    },
    [onChange],
  );

  return (
    <Stack space={4}>
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Search IGDB
          </Text>
          <Flex gap={2}>
            <Box flex={1}>
              <TextInput
                value={query}
                placeholder="e.g. Halo Wars, Fable, Hi-Fi Rush…"
                onChange={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    void search();
                  }
                }}
              />
            </Box>
            <Button text="Search" tone="primary" onClick={() => void search()} disabled={loading} />
          </Flex>

          {loading && (
            <Flex align="center" gap={2}>
              <Spinner muted />
              <Text size={1} muted>
                Searching IGDB…
              </Text>
            </Flex>
          )}

          {error && (
            <Card padding={3} radius={2} tone="critical">
              <Text size={1}>{error}</Text>
            </Card>
          )}

          {!loading && !error && searched && results.length === 0 && (
            <Text size={1} muted>
              No games found.
            </Text>
          )}

          {results.map((game) => {
            const added = existingIds.has(game.igdbId);
            return (
              <Flex key={game.igdbId} align="center" gap={3}>
                <Box
                  style={{
                    width: 40,
                    height: 54,
                    flex: "none",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "rgba(124,210,58,.18)",
                  }}
                >
                  {game.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.coverUrl}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  )}
                </Box>
                <Box flex={1}>
                  <Text size={1} weight="semibold">
                    {game.name}
                  </Text>
                  <Text size={0} muted style={{ marginTop: 4 }}>
                    {[game.releaseYear, game.rating ? `★ ${game.rating}` : null]
                      .filter(Boolean)
                      .join("  ·  ") || "—"}
                  </Text>
                </Box>
                <Button
                  text={added ? "Added" : "Add"}
                  mode={added ? "ghost" : "default"}
                  tone={added ? "default" : "primary"}
                  disabled={added}
                  onClick={() => addGame(game)}
                />
              </Flex>
            );
          })}
        </Stack>
      </Card>

      {/* Selected games (default array UI: preview, reorder, remove) */}
      {props.renderDefault(props)}
    </Stack>
  );
}
