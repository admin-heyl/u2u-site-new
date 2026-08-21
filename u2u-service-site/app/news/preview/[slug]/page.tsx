import type { Metadata } from "next";
import { NewsPreviewClient } from "@/components/news/NewsPreviewClient";
import { getSeedNewsArticle } from "@/lib/news";

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
  const localDraft = process.env.NODE_ENV === "development" ? getSeedNewsArticle(slug) : undefined;

  return <NewsPreviewClient initialArticle={localDraft} slug={slug} />;
}
