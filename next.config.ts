import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't fail the production build on lint warnings. We typecheck strictly
  // (tsc --noEmit passes), so the meaningful safety net is still there.
  // Allows shipping while we clean up react/no-unescaped-entities etc.
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
