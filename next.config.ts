import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(
  process.cwd(),
  "src/visual-edits/component-tagger-loader.js"
);

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["*"] },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // ✅ Correct handling for component loader
  webpack: (config) => {
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      use: [
        {
          loader: LOADER,
        },
      ],
    });
    return config;
  },

  // ❌ DO NOT set outputFileTracingRoot (breaks Vercel)
  // ❌ DO NOT set distDir incorrectly
  // ❌ DO NOT use output: "export"

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
