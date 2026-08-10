import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicListingView } from "@/components/listings/PublicListingView";
import {
  DEFAULT_OG_IMAGE,
  getPublicListing,
  metadataDescription
} from "@/lib/listings/publicListing";

type SkillPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getPublicListing("skill", id);

  if (!listing) {
    return {
      title: "投稿が見つかりません | U⇔U",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const description = metadataDescription(listing);
  const ogImage = listing.images[0] || DEFAULT_OG_IMAGE;

  return {
    title: `${listing.title} | U⇔U`,
    description,
    alternates: {
      canonical: listing.canonicalUrl
    },
    robots: {
      index: false,
      follow: false
    },
    openGraph: {
      title: listing.title,
      description,
      url: listing.canonicalUrl,
      siteName: "U⇔U",
      images: [ogImage],
      locale: "ja_JP",
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description,
      images: [ogImage]
    }
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { id } = await params;
  const listing = await getPublicListing("skill", id);

  if (!listing) {
    notFound();
  }

  return <PublicListingView listing={listing} />;
}
