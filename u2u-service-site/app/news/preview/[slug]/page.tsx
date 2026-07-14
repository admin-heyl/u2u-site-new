import type { Metadata } from "next";
import { NewsPreviewClient } from "@/components/news/NewsPreviewClient";

type NewsPreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: "NEWS Preview | U⇔U",
  robots: {
    index: false,
    follow: false
  }
};

export default async function NewsPreviewPage({ params }: NewsPreviewPageProps) {
  const { slug } = await params;

  return <NewsPreviewClient slug={slug} />;
}
