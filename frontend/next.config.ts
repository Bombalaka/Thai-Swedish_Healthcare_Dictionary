import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || "http://localhost:5196";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  // Proxy /api/* to backend – so you only need 1 ngrok tunnel (frontend)
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default nextConfig;
