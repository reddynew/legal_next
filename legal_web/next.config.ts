import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
