import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatNewsDate,
  getPublishedNewsArticle,
  isUnlistedNewsArticle,
  type NewsBlock
} from "@/lib/news";

const X_URL = "https://x.com/u2u_heyl?s=11&t=1E18F495PWSj6a64j92s6A";
const INSTAGRAM_URL = "https://www.instagram.com/u2u_heyl?igsh=bWtlM29rYnZ5NmY4&utm_source=qr";
const PRIVACY_POLICY_PATH = "/legal/privacy";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function renderLinkedText(text: string) {
  const target = "プライバシーポリシー";
  const parts = text.split(target);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <Link className="news-inline-link" href={PRIVACY_POLICY_PATH}>
          {target}
        </Link>
      ) : null}
    </span>
  ));
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seo.title,
    description: article.seo.description,
    robots:
      isUnlistedNewsArticle(article)
        ? {
            index: false,
            follow: false
          }
        : undefined
  };
}

function renderNewsBlock(block: NewsBlock) {
  switch (block.type) {
    case "h2":
      return <h2 key={block.id}>{block.text}</h2>;
    case "h3":
      return <h3 key={block.id}>{block.text}</h3>;
    case "p":
      return (
        <p key={block.id}>
          {block.text.split("\n").map((line, index) => (
            <span key={`${block.id}-${index}`}>
              {index > 0 ? <br /> : null}
              {renderLinkedText(line)}
            </span>
          ))}
        </p>
      );
    case "strong": {
      const strongClassName = block.id === "howto-extra" ? "news-emphasis" : "news-strong";
      return (
        <p className={strongClassName} key={block.id}>
          <strong>{block.text}</strong>
        </p>
      );
    }
    case "ul":
      return (
        <ul key={block.id}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={block.id}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="news-article-image" key={block.id}>
          <img src={block.src} alt={block.alt} />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "link":
      return (
        <p className="news-text-link" key={block.id}>
          <Link href={block.href}>{block.label}</Link>
        </p>
      );
    case "button": {
      return (
        <p className="news-button-row" key={block.id}>
          <a className="button primary" href={block.href}>
            {block.label}
          </a>
        </p>
      );
    }
    case "note":
      return (
        <aside className="news-note" key={block.id}>
          <h3>{block.title}</h3>
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      );
    default:
      return null;
  }
}

function renderExcerptLine(line: string) {
  const target = "公式SNS（X・Instagram）";
  const targetIndex = line.indexOf(target);

  if (targetIndex === -1) {
    return line;
  }

  const before = line.slice(0, targetIndex);
  const after = line.slice(targetIndex + target.length);

  return (
    <>
      {before}
      公式SNS（
      <a className="news-inline-link" href={X_URL}>
        X
      </a>
      ・
      <a className="news-inline-link" href={INSTAGRAM_URL}>
        Instagram
      </a>
      ）
      {after}
    </>
  );
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getPublishedNewsArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="news-page">
      <article className="news-article">
        <Link className="news-back-link" href="/news">
          NEWS一覧へ戻る
        </Link>
        <header className="news-article-header">
          <p className="news-meta">
            <span className="news-category">{article.category}</span>
            <time dateTime={article.publishedAt}>{formatNewsDate(article.publishedAt)}</time>
          </p>
          <h1>{article.title}</h1>
          <p>
            {article.excerpt.split("\n").map((line, index) => (
              <span key={`excerpt-${index}`}>
                {index > 0 ? <br /> : null}
                {renderExcerptLine(line)}
              </span>
            ))}
          </p>
        </header>

        {article.eyecatch ? (
          <figure className="news-eyecatch">
            <img src={article.eyecatch.src} alt={article.eyecatch.alt} />
          </figure>
        ) : null}

        <div className="news-body">{article.body.map(renderNewsBlock)}</div>

        <footer className="news-article-footer">
          <Link className="button quiet" href="/news">
            NEWS一覧へ戻る
          </Link>
        </footer>
      </article>
    </main>
  );
}
