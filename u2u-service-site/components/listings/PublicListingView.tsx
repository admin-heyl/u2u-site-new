import Link from "next/link";
import {
  APP_START_URL,
  listingInfoRows,
  type PublicListing
} from "@/lib/listings/publicListing";

type PublicListingViewProps = {
  listing: PublicListing;
};

export function PublicListingView({ listing }: PublicListingViewProps) {
  const [mainImage, ...subImages] = listing.images;
  const profileMeta = [listing.profile.schoolType, listing.profile.schoolYearLabel]
    .filter(Boolean)
    .join(" / ");

  return (
    <main className="listing-page">
      <article className="listing-shell">
        <header className="listing-header">
          <Link className="listing-logo" href="/" aria-label="U⇔U ホーム">
            U⇔U
          </Link>
          <span className="listing-badge">{listing.label}</span>
        </header>

        {mainImage ? (
          <>
            <div className="listing-hero-image">
              <img src={mainImage} alt={listing.title} />
            </div>
            {subImages.length > 0 ? (
              <div className="listing-thumbnails" aria-label="投稿画像">
                {subImages.map((image) => (
                  <img src={image} alt="" key={image} loading="lazy" />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="listing-hero-fallback">
            <span>{listing.label}</span>
          </div>
        )}

        <section className="listing-content">
          <p className="listing-eyebrow">{listing.label}</p>
          <h1>{listing.title}</h1>

          {listing.description ? (
            <p className="listing-description">
              {listing.description.split("\n").map((line, index) => (
                <span key={`${listing.id}-description-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          ) : null}

          <dl className="listing-info-grid">
            {listingInfoRows(listing).map(([label, value]) => (
              <div className="listing-info-row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <section className="listing-profile" aria-label="公開プロフィール">
            <div className="listing-avatar">
              {listing.profile.photoUrl ? (
                <img src={listing.profile.photoUrl} alt="" />
              ) : (
                <span>{listing.profile.name.slice(0, 1)}</span>
              )}
            </div>
            <div>
              <p className="listing-profile-name">{listing.profile.name}</p>
              {profileMeta ? <p className="listing-profile-meta">{profileMeta}</p> : null}
            </div>
          </section>

          <div className="listing-actions">
            <a className="button primary" href={listing.canonicalUrl}>
              アプリで見る・操作する
            </a>
            <a className="button secondary" href={APP_START_URL}>
              U⇔Uをはじめる
            </a>
          </div>

          <p className="listing-notice">
            Webでは閲覧のみできます。応募・購入・コメント・メッセージなどの操作はU⇔Uアプリで行ってください。
            アプリが開かない場合は、U⇔Uを起動して投稿を確認してください。
          </p>
        </section>
      </article>
    </main>
  );
}
