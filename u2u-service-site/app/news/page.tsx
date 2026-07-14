import Link from "next/link";
import type { Metadata } from "next";
import { formatNewsDate, getPublishedNewsArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "NEWS | U⇔U",
  description: "U⇔Uからのお知らせ、キャンペーン、アップデート、メンテナンス情報を掲載します。",
  openGraph: {
    title: "NEWS | U⇔U",
    description: "U⇔Uからのお知らせ、キャンペーン、アップデート、メンテナンス情報を掲載します。",
    url: "/news",
    images: ["/images/news/campaign-preregistration.svg"]
  }
};

export default async function NewsListPage() {
  const articles = await getPublishedNewsArticles();

  return (
    <main className="news-page">
      <header className="news-header">
        <Link className="news-back-link" href="/">
          U⇔Uへ戻る
        </Link>
        <p className="section-label">NEWS</p>
        <h1>お知らせ</h1>
        <p>
          リリース情報、キャンペーン、機能追加、アップデート、メンテナンスなど、
          U⇔Uに関する最新情報をお届けします。
        </p>
      </header>

      <section className="news-list" aria-label="お知らせ一覧">
        {articles.length === 0 ? (
          <p className="news-empty">現在公開中のお知らせはありません。</p>
        ) : null}
        {articles.map((article) => (
          <Link className="news-card" href={`/news/${article.slug}`} key={article.slug}>
            {article.eyecatch ? (
              <span className="news-card-image">
                <img src={article.eyecatch.src} alt="" />
              </span>
            ) : null}
            <span className="news-card-body">
              <span className="news-meta">
                <span className="news-category">{article.category}</span>
                <time dateTime={article.publishedAt}>{formatNewsDate(article.publishedAt)}</time>
              </span>
              <span className="news-card-title">{article.title}</span>
              <span className="news-card-excerpt">{article.excerpt}</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
