import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize imports from specified packages to improve bundle size and build performance
  experimental: {
    optimizePackageImports: ['@hugeicons/react', 'lucide-react'],
  },
  // Fail production builds if there are TypeScript type errors
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
