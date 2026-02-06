import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable strict mode to debug AbortError
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
