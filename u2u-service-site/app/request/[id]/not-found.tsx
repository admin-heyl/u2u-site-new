import { PublicListingNotFound } from "@/components/listings/PublicListingNotFound";

export const metadata = {
  title: "投稿が見つかりません | U⇔U",
  robots: {
    index: false,
    follow: false
  }
};

export default function RequestNotFound() {
  return <PublicListingNotFound />;
}
