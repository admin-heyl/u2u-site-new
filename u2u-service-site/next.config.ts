import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/news/pre-registration-official-sns",
        destination: "/news/pre-registration-sns",
        permanent: true,
      },
    ];
  },
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
      {
        source: "/parent-invite",
        destination: "https://unicorn1111.web.app/parent-invite",
      },
      {
        source: "/parent-invite/:path*",
        destination: "https://unicorn1111.web.app/parent-invite/:path*",
      },
      {
        source: "/reset-password",
        destination: "https://unicorn1111.web.app/reset-password",
      },
      {
        source: "/reset-password/:path*",
        destination: "https://unicorn1111.web.app/reset-password/:path*",
      },
      {
        source: "/.well-known/apple-app-site-association",
        destination:
          "https://unicorn1111.web.app/.well-known/apple-app-site-association",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: "https://unicorn1111.web.app/.well-known/assetlinks.json",
      },
    ];
  },
};

export default nextConfig;
