import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL + "/", lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: SITE_URL + "/contact", lastModified, changeFrequency: "monthly", priority: 0.8 },

    { url: SITE_URL + "/solutions/knowledge-panel-for-founders", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/solutions/knowledge-panel-for-authors", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/solutions/knowledge-panel-for-brands", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/solutions/knowledge-panel-for-artists", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/solutions/verification-badge", lastModified, changeFrequency: "monthly", priority: 0.85 },

    { url: SITE_URL + "/learn/how-knowledge-panels-work", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/learn/how-to-claim-a-google-knowledge-panel", lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: SITE_URL + "/learn/semantic-seo-vs-entity-seo", lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: SITE_URL + "/learn/what-is-a-kgmid", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE_URL + "/learn/why-did-my-knowledge-panel-disappear", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE_URL + "/learn/merge-duplicate-knowledge-panels", lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
