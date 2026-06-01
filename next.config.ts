import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
      return [
          {
              source: '/op-admin',
              destination: '/admin',
          },
          {
              source: '/op-admin/:path*',
              destination: '/admin/:path*',
          }
      ]
  }
};

export default nextConfig;
