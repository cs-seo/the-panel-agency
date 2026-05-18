/**
 * DataForSEO v3 client — server-only.
 * Credentials must be loaded from environment variables, never bundled.
 */
import "server-only";

const BASE = "https://api.dataforseo.com/v3";

type FetchOpts = {
  retries?: number;
  timeoutMs?: number;
};

export type SearchVolumeResult = {
  keyword: string;
  search_volume: number | null;
  cpc: number | null;
  competition: number | null;
  competition_level?: string | null;
};

export type RelatedKeyword = {
  keyword: string;
  search_volume: number | null;
  cpc: number | null;
  competition: number | null;
};

function authHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    throw new Error(
      "DataForSEO credentials missing. Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in your environment."
    );
  }
  const token = Buffer.from(`${login}:${password}`).toString("base64");
  return `Basic ${token}`;
}

async function dfsPost<T>(path: string, body: unknown, opts: FetchOpts = {}): Promise<T> {
  const { retries = 2, timeoutMs = 15000 } = opts;
  const url = `${BASE}${path}`;
  let lastErr: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timer);

      if (res.status === 401) throw new Error("DataForSEO 401 Unauthorized — check credentials");
      if (res.status === 429) {
        lastErr = new Error("DataForSEO 429 Rate limited");
      } else if (!res.ok) {
        const text = await res.text();
        throw new Error(`DataForSEO ${res.status}: ${text.slice(0, 200)}`);
      } else {
        return (await res.json()) as T;
      }
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (attempt === retries) break;
      const backoff = 400 * Math.pow(2, attempt);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("DataForSEO request failed");
}

export async function getSearchVolume(
  keywords: string[],
  options: { locationName?: string; languageName?: string } = {}
): Promise<SearchVolumeResult[]> {
  if (!keywords.length) return [];
  const post = [
    {
      keywords: keywords.slice(0, 1000),
      location_name: options.locationName ?? "United States",
      language_name: options.languageName ?? "English",
    },
  ];
  type DFSResp = {
    tasks?: Array<{
      result?: Array<{
        keyword: string;
        search_volume: number | null;
        cpc: number | null;
        competition: number | null;
        competition_level?: string | null;
      }>;
    }>;
  };
  const json = await dfsPost<DFSResp>("/keywords_data/google/search_volume/live", post);
  const items = json.tasks?.[0]?.result ?? [];
  return items.map((i) => ({
    keyword: i.keyword,
    search_volume: i.search_volume ?? null,
    cpc: i.cpc ?? null,
    competition: i.competition ?? null,
    competition_level: i.competition_level ?? null,
  }));
}

export async function getRelatedKeywords(
  seed: string,
  options: { locationName?: string; languageName?: string; limit?: number } = {}
): Promise<RelatedKeyword[]> {
  const post = [
    {
      keyword: seed,
      location_name: options.locationName ?? "United States",
      language_name: options.languageName ?? "English",
      limit: options.limit ?? 50,
    },
  ];
  type DFSResp = {
    tasks?: Array<{
      result?: Array<{
        items?: Array<{
          keyword_data?: {
            keyword: string;
            keyword_info?: {
              search_volume: number | null;
              cpc: number | null;
              competition: number | null;
            };
          };
        }>;
      }>;
    }>;
  };
  const json = await dfsPost<DFSResp>("/dataforseo_labs/google/related_keywords/live", post);
  const items = json.tasks?.[0]?.result?.[0]?.items ?? [];
  return items
    .map((i) => i.keyword_data)
    .filter((k): k is NonNullable<typeof k> => Boolean(k))
    .map((k) => ({
      keyword: k.keyword,
      search_volume: k.keyword_info?.search_volume ?? null,
      cpc: k.keyword_info?.cpc ?? null,
      competition: k.keyword_info?.competition ?? null,
    }));
}
