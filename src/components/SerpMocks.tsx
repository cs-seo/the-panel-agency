/**
 * SERP feature mocks — light-mode Google-style cards rendered as CSS,
 * embedded inside a dark-themed page. Each one is a recognisable,
 * editorial-quality recreation of a real Google search feature.
 *
 * No JS — purely server-rendered. All copy is configurable via props
 * with sensible default examples.
 */
import { Search, Star, ThumbsUp, MoreHorizontal, ChevronDown } from "lucide-react";

const lightSurface =
  "bg-white text-[#202124] border border-[#dadce0] rounded-xl shadow-[0_1px_6px_rgba(32,33,36,0.08)]";

/* ─── Shell: looks like a Chrome window with one tab on Google ─── */
export function SerpBrowserShell({
  query,
  children,
  className = "",
}: {
  query: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,82,255,0.25)] bg-[#f8f9fa] " +
        className
      }
    >
      {/* Chrome dots */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#ececec] border-b border-[#dadce0]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 max-w-md rounded-full bg-white border border-[#dadce0] px-3 py-1 text-[11px] text-[#5f6368]">
          google.com/search?q={encodeURIComponent(query).slice(0, 40)}
        </div>
      </div>
      {/* Search bar */}
      <div className="bg-white px-6 pt-5 pb-3 border-b border-[#ebebeb]">
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#4285f4] text-[20px] tracking-tight">
            <span className="text-[#4285f4]">G</span>
            <span className="text-[#ea4335]">o</span>
            <span className="text-[#fbbc05]">o</span>
            <span className="text-[#4285f4]">g</span>
            <span className="text-[#34a853]">l</span>
            <span className="text-[#ea4335]">e</span>
          </span>
          <div className="flex-1 rounded-full border border-[#dadce0] hover:shadow-md transition-shadow px-5 py-2.5 flex items-center gap-3 bg-white">
            <Search size={14} className="text-[#9aa0a6]" />
            <span className="text-[15px] text-[#202124] flex-1 truncate">{query}</span>
            <span className="w-px h-5 bg-[#dadce0]" />
            <span className="text-[#4285f4] text-xs">Search</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 text-[13px] text-[#5f6368]">
          <span className="text-[#1a73e8] border-b-2 border-[#1a73e8] pb-2 -mb-[1px]">All</span>
          <span className="pb-2">Images</span>
          <span className="pb-2">News</span>
          <span className="pb-2">Videos</span>
          <span className="pb-2">Shopping</span>
          <span className="pb-2 hidden sm:inline">Books</span>
          <span className="pb-2 hidden sm:inline">More</span>
        </div>
      </div>
      <div className="px-6 py-6 bg-white text-[14px]">{children}</div>
    </div>
  );
}

/* ─── Knowledge Panel (Person) ─── */
export function KnowledgePanelMock({
  name = "Your Name",
  subtitle = "Founder & CEO of Your Company",
  bio = "Your Name is a London-based founder, author, and investor known for category-defining product work in B2B software. A graduate of Imperial College, they have been profiled in The Financial Times, Wired, and Bloomberg.",
  born = "Born: Aug 14, 1984 · London, UK",
  education = "Imperial College London",
  awards = "Forbes 30 Under 30 (Europe)",
  books = ["A Book About Things", "Another Book"],
  verified = true,
  peers = [
    { name: "Peer One" },
    { name: "Peer Two" },
    { name: "Peer Three" },
    { name: "Peer Four" },
  ],
}: {
  name?: string;
  subtitle?: string;
  bio?: string;
  born?: string;
  education?: string;
  awards?: string;
  books?: string[];
  verified?: boolean;
  peers?: { name: string }[];
}) {
  return (
    <aside className={lightSurface + " w-full max-w-[360px] overflow-hidden font-sans"}>
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[20px] leading-tight font-medium text-[#202124] truncate">
              {name}
              {verified ? (
                <span
                  title="Verified"
                  className="ml-1.5 inline-block align-middle text-[#5f6368]"
                >
                  ✓
                </span>
              ) : null}
            </h3>
            <p className="mt-0.5 text-[13px] text-[#5f6368]">{subtitle}</p>
          </div>
          <div className="shrink-0 w-16 h-16 rounded-md bg-gradient-to-br from-[#e8eaed] to-[#dadce0] border border-[#dadce0]" />
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#202124]">{bio}</p>
      </div>
      <div className="border-t border-[#ebebeb] px-5 py-3 space-y-1.5 text-[13px]">
        <KpRow k="Born" v={born} />
        <KpRow k="Education" v={education} />
        <KpRow k="Awards" v={awards} />
      </div>
      {books.length ? (
        <div className="border-t border-[#ebebeb] px-5 py-3">
          <div className="text-[11px] uppercase tracking-wider text-[#5f6368] mb-2">Books</div>
          <div className="flex gap-2 overflow-hidden">
            {books.slice(0, 3).map((b, i) => (
              <div key={i} className="flex-1 min-w-0">
                <div className="aspect-[3/4] rounded bg-gradient-to-br from-[#e8eaed] to-[#dadce0] border border-[#dadce0]" />
                <p className="mt-1.5 text-[11px] text-[#202124] line-clamp-2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="border-t border-[#ebebeb] px-5 py-3">
        <div className="text-[11px] uppercase tracking-wider text-[#5f6368] mb-2">
          People also search for
        </div>
        <div className="flex gap-2 overflow-hidden">
          {peers.map((p, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-[#e8eaed] border border-[#dadce0]" />
              <span className="text-[11px] text-center leading-tight text-[#202124] truncate w-full">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#ebebeb] px-5 py-3 flex items-center justify-between text-[11px] text-[#5f6368]">
        <span>Profiles</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-[#0a66c2]" title="LinkedIn" />
          <span className="w-4 h-4 rounded-sm bg-black" title="X" />
          <span className="w-4 h-4 rounded-sm bg-[#ff0000]" title="YouTube" />
          <span className="w-4 h-4 rounded-sm bg-[#1da1f2]" title="Twitter" />
        </div>
      </div>
    </aside>
  );
}
function KpRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[#5f6368] w-24 shrink-0">{k}:</span>
      <span className="text-[#202124] flex-1">{v}</span>
    </div>
  );
}

/* ─── Featured Snippet ─── */
export function FeaturedSnippetMock({
  question = "How long does it take to get a Google Knowledge Panel?",
  answer = "A mini Knowledge Panel typically appears within 15–20 days of entity work starting. The full panel — with bio, education, and 'People also search for' — usually goes live between days 60 and 75. Contested-name cases can take 90–120 days.",
  source = {
    domain: "thepanelagency.com",
    title: "How Knowledge Panels Work — The Panel Agency",
    url: "https://thepanelagency.com/learn/how-knowledge-panels-work",
  },
}: {
  question?: string;
  answer?: string;
  source?: { domain: string; title: string; url: string };
}) {
  return (
    <div className={lightSurface + " w-full max-w-[640px] overflow-hidden font-sans p-5"}>
      <p className="text-[13px] text-[#5f6368] mb-3">
        Featured snippet from the web
      </p>
      <p className="text-[15px] leading-relaxed text-[#202124]">{answer}</p>
      <div className="mt-4 pt-3 border-t border-[#ebebeb]">
        <p className="text-[12px] text-[#202124]">{source.domain}</p>
        <a className="text-[16px] text-[#1a0dab] hover:underline block leading-tight">
          {source.title}
        </a>
        <p className="text-[12px] text-[#5f6368] mt-1 truncate">{source.url}</p>
      </div>
    </div>
  );
}

/* ─── People Also Ask ─── */
export function PeopleAlsoAskMock({
  questions = [
    "How much does a Google Knowledge Panel cost?",
    "Can you pay Google to create a Knowledge Panel?",
    "Why did my Knowledge Panel disappear?",
    "How do I claim my Knowledge Panel?",
  ],
}: {
  questions?: string[];
}) {
  return (
    <div className={lightSurface + " w-full max-w-[640px] overflow-hidden font-sans"}>
      <p className="px-5 pt-5 pb-2 text-[15px] font-medium text-[#202124]">People also ask</p>
      <ul className="divide-y divide-[#ebebeb]">
        {questions.map((q, i) => (
          <li key={i} className="px-5 py-3 flex items-center justify-between gap-4">
            <span className="text-[14px] text-[#202124]">{q}</span>
            <ChevronDown size={16} className="text-[#5f6368] shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── AI Overview (Google AI / Gemini-style) ─── */
export function AiOverviewMock({
  query = "what is a google knowledge panel",
  paragraphs = [
    "A Google Knowledge Panel is the information card shown in Google Search for recognised entities — people, companies, places, and works. It includes a verified bio, photo, key facts, and links to authoritative sources.",
    "Panels are not user-created. They are derived from Google's Knowledge Graph, which is built from sources like Wikipedia, Wikidata, and authoritative third-party citations. Once a panel exists, the entity can claim it for management.",
  ],
  sources = [
    "thepanelagency.com",
    "support.google.com",
    "en.wikipedia.org",
    "schema.org",
  ],
}: {
  query?: string;
  paragraphs?: string[];
  sources?: string[];
}) {
  return (
    <div className="w-full max-w-[640px] overflow-hidden font-sans rounded-xl border border-[#dadce0] bg-gradient-to-br from-[#f0f7ff] via-white to-[#fff7f0] shadow-[0_1px_6px_rgba(32,33,36,0.08)]">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full"
            style={{
              background:
                "conic-gradient(from 200deg, #4285f4 0deg, #34a853 90deg, #fbbc05 180deg, #ea4335 270deg, #4285f4 360deg)",
            }}
          />
          <span className="text-[13px] font-medium text-[#202124]">AI Overview</span>
        </div>
        <span className="text-[11px] text-[#5f6368]">Generative · Beta</span>
      </div>
      <div className="px-5 pb-4 space-y-2.5 text-[14px] leading-relaxed text-[#202124]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="px-5 pb-4 flex items-center gap-2 flex-wrap">
        {sources.map((s, i) => (
          <span
            key={i}
            className="text-[11px] bg-white border border-[#dadce0] rounded-full px-2.5 py-1 text-[#202124]"
          >
            <span className="text-[#5f6368]">{i + 1}.</span> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Organic result + Site Links ─── */
export function SiteLinksMock({
  domain = "thepanelagency.com",
  title = "The Panel Agency — Google Knowledge Panels",
  url = "https://thepanelagency.com",
  snippet = "Boutique agency that builds, claims, and defends Google Knowledge Panels for founders, executives, authors, and public figures.",
  links = [
    { label: "Solutions", url: "https://thepanelagency.com/solutions" },
    { label: "How panels work", url: "https://thepanelagency.com/learn/how-knowledge-panels-work" },
    { label: "Free tools", url: "https://thepanelagency.com/tools" },
    { label: "Contact", url: "https://thepanelagency.com/contact" },
  ],
}: {
  domain?: string;
  title?: string;
  url?: string;
  snippet?: string;
  links?: { label: string; url: string }[];
}) {
  return (
    <div className="w-full max-w-[640px] font-sans">
      <div className="flex items-center gap-2 text-[12px] text-[#202124]">
        <span className="w-5 h-5 rounded-full bg-[#e8eaed]" />
        <span>{domain}</span>
        <span className="text-[#5f6368]">›</span>
        <span className="text-[#5f6368] truncate">{url.replace(/^https?:\/\/[^/]+/, "")}</span>
        <MoreHorizontal size={14} className="text-[#5f6368]" />
      </div>
      <a className="text-[20px] leading-tight text-[#1a0dab] hover:underline block mt-1">
        {title}
      </a>
      <p className="text-[14px] text-[#4d5156] leading-snug mt-1">{snippet}</p>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 max-w-[520px]">
        {links.map((l, i) => (
          <div key={i}>
            <a className="text-[14px] text-[#1a0dab] hover:underline">{l.label}</a>
            <p className="text-[12px] text-[#4d5156] leading-snug truncate">
              {l.url.replace(/^https?:\/\//, "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Image Pack ─── */
export function ImagePackMock({
  query = "your name",
  count = 6,
}: {
  query?: string;
  count?: number;
}) {
  return (
    <div className={lightSurface + " w-full max-w-[640px] overflow-hidden font-sans p-5"}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[14px] text-[#202124] font-medium">
          Images for &quot;{query}&quot;
        </p>
        <a className="text-[12px] text-[#1a73e8] hover:underline">
          View all →
        </a>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md bg-gradient-to-br from-[#e8eaed] to-[#dadce0] border border-[#dadce0]"
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Top Stories (news carousel) ─── */
export function TopStoriesMock({
  stories = [
    { source: "TechCrunch", title: "Why entity SEO is the new perimeter for executive reputation", time: "2 hours ago" },
    { source: "Bloomberg", title: "Inside the rise of boutique Knowledge Panel agencies", time: "Yesterday" },
    { source: "The Verge", title: "AI Overviews are reshaping who gets cited", time: "2 days ago" },
  ],
}: {
  stories?: { source: string; title: string; time: string }[];
}) {
  return (
    <div className={lightSurface + " w-full max-w-[640px] overflow-hidden font-sans"}>
      <p className="px-5 pt-5 pb-3 text-[15px] font-medium text-[#202124]">Top stories</p>
      <ul className="divide-y divide-[#ebebeb]">
        {stories.map((s, i) => (
          <li key={i} className="px-5 py-3 flex items-start gap-3">
            <div className="w-14 h-14 rounded-md bg-gradient-to-br from-[#e8eaed] to-[#dadce0] border border-[#dadce0] shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-[#5f6368]">{s.source}</p>
              <p className="text-[14px] text-[#202124] leading-snug mt-0.5 line-clamp-2">{s.title}</p>
              <p className="text-[11px] text-[#5f6368] mt-1">{s.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Review snippet / star rating ─── */
export function ReviewSnippetMock({
  title = "The Panel Agency — Verified Reviews",
  rating = 4.9,
  reviewCount = 127,
  highlight = "Founders consistently rate the discovery call as the most useful 30 minutes they spent on their reputation work this year.",
}: {
  title?: string;
  rating?: number;
  reviewCount?: number;
  highlight?: string;
}) {
  return (
    <div className={lightSurface + " w-full max-w-[640px] overflow-hidden font-sans p-5"}>
      <p className="text-[20px] text-[#1a0dab] leading-tight">{title}</p>
      <div className="mt-1 flex items-center gap-1 text-[13px] text-[#202124]">
        <span className="font-medium tabular-nums">{rating.toFixed(1)}</span>
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.round(rating) ? "fill-[#fabb05] text-[#fabb05]" : "text-[#dadce0]"}
            />
          ))}
        </span>
        <span className="text-[#5f6368]">({reviewCount.toLocaleString()})</span>
      </div>
      <p className="mt-2 text-[14px] text-[#4d5156] leading-snug flex items-start gap-2">
        <ThumbsUp size={14} className="shrink-0 mt-0.5 text-[#5f6368]" />
        <span>&ldquo;{highlight}&rdquo;</span>
      </p>
    </div>
  );
}
