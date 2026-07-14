import type { Metadata } from "next";
import "./globals.css";
import "./news.css";

export const metadata: Metadata = {
  title: "U⇔U | 可能性が、少しずつ広がっていく場所",
  description:
    "U⇔Uは、学生の得意や挑戦が、誰かの一歩につながっていく未来を目指すHEYLのサービスです。",
  metadataBase: new URL("https://u2u.heyl.co.jp"),
  openGraph: {
    title: "U⇔U",
    description: "得意を活かし、教え合い、学び合う。可能性が少しずつ広がっていく場所。",
    url: "/",
    siteName: "U⇔U",
    images: ["/images/hero-u2u.png"],
    locale: "ja_JP",
    type: "website"
  }
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
