import type { Metadata } from "next";
import "./globals.css";
import "./news.css";
import "./listing.css";

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
