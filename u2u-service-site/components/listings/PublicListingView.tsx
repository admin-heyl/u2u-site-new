import Link from "next/link";
import {
  APP_START_URL,
  listingInfoRows,
  type PublicListing
} from "@/lib/listings/publicListing";
import { ListingImages } from "./ListingImages";

type PublicListingViewProps = {
  listing: PublicListing;
};

function MultilineText({ value }: { value: string }) {
  return value.split("\n").map((line, index) => (
    <span key={`${index}-${line}`}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function Rating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="listing-rating" aria-label={count > 0 ? `評価 ${rating.toFixed(1)}、${count}件` : "評価なし"}>
      <span className="listing-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>{index < Math.floor(rating) ? "★" : "☆"}</span>
        ))}
      </span>
      <span>{count > 0 ? `${rating.toFixed(1)} (${count})` : "評価なし"}</span>
    </div>
  );
}

export function PublicListingView({ listing }: PublicListingViewProps) {
  const isSkill = listing.type === "skill";
  const sections = [
    [isSkill ? "スキル説明" : "リクエスト内容", listing.description],
    [isSkill ? "必要なもの" : "用意できるもの", listing.requiredItems || "特にありません"],
    [isSkill ? "注意事項" : "希望条件", listing.precautions || "特にありません"]
  ];

  return (
    <main className={`listing-page listing-page-${listing.type}`}>
      <article className="listing-shell">
        <header className="listing-header">
          <Link className="listing-logo" href="/" aria-label="U⇔U ホーム">
            <img src="/images/u2u-logotype.svg" alt="U⇔U" />
          </Link>
          <span className="listing-web-label">公開ページ</span>
        </header>

        <ListingImages images={listing.images} title={listing.title} />

        <section className="listing-main-content">
          <div className="listing-favorite" aria-label={`お気に入り ${listing.favoriteCount}件`}>
            <span aria-hidden="true">♡</span>
            <strong>{listing.favoriteCount}</strong>
          </div>

          <h1>{listing.title}</h1>

          <div className="listing-badges" aria-label="投稿情報">
            <span className="listing-type-badge">{listing.label}</span>
            <span className="listing-stat-badge">
              <span aria-hidden="true">{isSkill ? "◴" : "♙"}</span>
              {listing.primaryStatLabel}
            </span>
            <span className="listing-stat-badge is-outlined">
              <span aria-hidden="true">{isSkill ? "✓" : "◷"}</span>
              {listing.secondaryStatLabel}
            </span>
          </div>
        </section>

        <div className="listing-sections">
          {sections.map(([title, value]) => (
            <section className="listing-section" key={title}>
              <h2>{title}</h2>
              <p><MultilineText value={value} /></p>
            </section>
          ))}
        </div>

        <div className="listing-divider" />

        <section className="listing-info" aria-label={isSkill ? "スキル情報" : "リクエスト情報"}>
          <dl>
            {listingInfoRows(listing).map(([label, value]) => (
              <div className="listing-info-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="listing-divider" />

        <section className="listing-profile" aria-label="公開プロフィール">
          <div className="listing-avatar">
            {listing.profile.photoUrl ? (
              <img src={listing.profile.photoUrl} alt="" />
            ) : (
              <span aria-hidden="true">♙</span>
            )}
          </div>
          <div className="listing-profile-body">
            <p className="listing-profile-name">{listing.profile.name}</p>
            <Rating rating={listing.profile.rating} count={listing.profile.ratingCount} />
          </div>
        </section>

        <div className="listing-divider" />

        <section className="listing-app-guide">
          <h2>続きはU⇔Uアプリで</h2>
          <p>
            Webでは投稿を閲覧できます。{isSkill ? "予約・購入" : "応募"}、コメント、メッセージなどはアプリから行ってください。
          </p>
          <a href={APP_START_URL}>U⇔Uをはじめる</a>
        </section>
      </article>

      <div className="listing-bottom-bar">
        <strong>{listing.priceLabel || "価格はアプリで確認"}</strong>
        <a href={listing.canonicalUrl}>{isSkill ? "アプリで予約する" : "アプリで引き受ける"}</a>
      </div>
    </main>
  );
}
