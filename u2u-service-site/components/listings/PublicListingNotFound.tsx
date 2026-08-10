import Link from "next/link";
import { APP_START_URL } from "@/lib/listings/publicListing";

export function PublicListingNotFound() {
  return (
    <main className="listing-page listing-page-center">
      <section className="listing-empty">
        <p className="listing-empty-brand">U⇔U</p>
        <h1>投稿が見つかりません</h1>
        <p>この投稿は削除されたか、現在は公開されていません。</p>
        <div className="listing-actions listing-empty-actions">
          <Link className="button secondary" href="/">
            U⇔U公式サイトへ
          </Link>
          <a className="button primary" href={APP_START_URL}>
            U⇔Uをはじめる
          </a>
        </div>
      </section>
    </main>
  );
}
