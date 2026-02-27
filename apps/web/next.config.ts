import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/utils", "@repo/ui", "@repo/auth", "@repo/db"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
