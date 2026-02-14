import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure build doesn't fail on font loading issues in CI
  experimental: {
    optimizePackageImports: ['@hugeicons/react', 'lucide-react'],
  },
  // Skip route collection during build for API routes
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
