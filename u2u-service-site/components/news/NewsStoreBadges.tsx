type NewsStoreBadgesProps = {
  appStoreHref: string;
  googlePlayHref: string;
};

// Official localized artwork from Apple App Store Marketing Tools and Google Play badge resources.
const APP_STORE_BADGE_SRC = "/images/store/download-on-the-app-store-ja.svg";
const GOOGLE_PLAY_BADGE_SRC = "/images/store/google-play-ja.png";

type StoreBadgeProps = {
  alt: string;
  className: string;
  href: string;
  label: string;
  src: string;
};

function StoreBadge({ alt, className, href, label, src }: StoreBadgeProps) {
  const image = <img alt={alt} src={src} />;

  if (!href) {
    return (
      <span
        aria-disabled="true"
        aria-label={`${label}（ストアURL設定待ち）`}
        className={`news-store-badge ${className} is-pending`}
        title="ストアURL設定待ち"
      >
        {image}
      </span>
    );
  }

  return (
    <a
      aria-label={`${label}でU⇔Uをダウンロード`}
      className={`news-store-badge ${className}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {image}
    </a>
  );
}

export function NewsStoreBadges({ appStoreHref, googlePlayHref }: NewsStoreBadgesProps) {
  const hasPendingUrl = !appStoreHref || !googlePlayHref;

  return (
    <div className="news-store-section">
      <div className="news-store-badges" aria-label="アプリストアへのリンク" role="group">
        <StoreBadge
          alt="App Storeからダウンロード"
          className="news-store-badge-app-store"
          href={appStoreHref}
          label="App Store"
          src={APP_STORE_BADGE_SRC}
        />
        <StoreBadge
          alt="Google Playで手に入れよう"
          className="news-store-badge-google-play"
          href={googlePlayHref}
          label="Google Play"
          src={GOOGLE_PLAY_BADGE_SRC}
        />
      </div>
      {hasPendingUrl ? (
        <p className="news-store-pending-note">ストアURL確認後にリンクを有効化します。</p>
      ) : null}
      <p className="news-store-legal">
        Apple、Appleのロゴ、App Storeは、米国およびその他の国で登録されたApple Inc.の商標です。Google PlayおよびGoogle Playロゴは、Google LLCの商標です。
      </p>
    </div>
  );
}
