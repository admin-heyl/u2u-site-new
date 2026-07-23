import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./news.css";

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

export const metadata: Metadata = {
  title: "U⇔U | 学生同士で「できる」がつながるスキルマーケット",
  description:
    "U⇔Uは、学生の得意・知識・経験を、ほかの学生の「やってみたい」につなぐスキルマーケットです。",
  metadataBase: new URL("https://u2u.heyl.co.jp"),
  openGraph: {
    title: "U⇔U",
    description: "学生同士で「できる」がつながるスキルマーケット。",
    url: "/",
    siteName: "U⇔U",
    images: ["/images/hero-u2u.png"],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "U⇔U",
    description: "学生同士で「できる」がつながるスキルマーケット。",
    images: ["/images/hero-u2u.png"]
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png?v=20260723", type: "image/png", sizes: "192x192" },
      { url: "/apple-touch-icon.png?v=20260723", type: "image/png", sizes: "180x180" },
      { url: "/icons/favicon-32.png?v=20260723", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico?v=20260723", sizes: "any" }
    ],
    shortcut: [
      { url: "/icons/icon-192.png?v=20260723", type: "image/png", sizes: "192x192" }
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=20260723", type: "image/png", sizes: "180x180" }
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png?v=20260723",
        sizes: "180x180"
      },
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg?v=20260723",
        color: "#FFFFFF"
      }
    ]
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "U⇔U",
    statusBarStyle: "default"
  },
  applicationName: "U⇔U"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
