import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepanelagency.com";

/**
 * Served at /robots.txt. We allow indexing of the public site but block
 * the API routes — keywords/* hits paid DataForSEO endpoints and any future
 * /api routes will be server-internal by default.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
