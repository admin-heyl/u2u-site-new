import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: "/preregister",
        destination: "https://unicorn1111.web.app/",
      },
      {
        source: "/preregister/:path*",
        destination: "https://unicorn1111.web.app/:path*",
      },
    ];
  },
};

export default nextConfig;
