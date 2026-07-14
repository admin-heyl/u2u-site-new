"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseServices } from "@/lib/firebase/client";
import type { NewsArticle, NewsBlock, NewsCategory, NewsStatus } from "@/lib/news";
import { seedNewsArticles } from "@/lib/news";

const categories: NewsCategory[] = [
  "キャンペーン",
  "お知らせ",
  "リリース情報",
  "アップデート",
  "機能追加",
  "メンテナンス",
  "障害情報",
  "その他"
];

const blockTypes: NewsBlock["type"][] = [
  "h2",
  "h3",
  "p",
  "strong",
  "ul",
  "ol",
  "link",
  "button",
  "image",
  "note"
];

const emptyArticle: NewsArticle = {
  slug: "",
  status: "draft",
  category: "お知らせ",
  title: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "",
  seo: {
    title: "",
    description: ""
  },
  body: []
};

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createBlock(type: NewsBlock["type"]): NewsBlock {
  const id = createId();

  if (type === "ul" || type === "ol") return { id, type, items: [""] };
  if (type === "image") return { id, type, src: "", alt: "", caption: "" };
  if (type === "button" || type === "link") return { id, type, label: "", href: "" };
  if (type === "note") return { id, type, title: "", items: [""] };

  return { id, type, text: "" };
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewsCms() {
  const [services, setServices] = useState<ReturnType<typeof getFirebaseServices> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editing, setEditing] = useState<NewsArticle>(emptyArticle);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    try {
      setServices(getFirebaseServices());
    } catch {
      setMessage("NEWS管理を利用するには、Firebaseの環境変数を設定してください。");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!services) return;

    return onAuthStateChanged(services.auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [services]);

  useEffect(() => {
    if (!user || !services) return;

    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, services]);

  async function loadArticles() {
    if (!services) return;

    const snapshot = await getDocs(query(collection(services.db, "newsArticles"), orderBy("publishedAt", "desc")));
    const nextArticles = snapshot.docs.map((item) => item.data() as NewsArticle);
    setArticles(nextArticles);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!services) {
      setMessage("NEWS管理を利用するには、Firebaseの環境変数を設定してください。");
      return;
    }

    await setPersistence(services.auth, browserLocalPersistence);
    await signInWithEmailAndPassword(services.auth, email, password);
  }

  function updateArticle(next: Partial<NewsArticle>) {
    setEditing((current) => ({ ...current, ...next }));
  }

  function updateBlock(index: number, next: NewsBlock) {
    setEditing((current) => ({
      ...current,
      body: current.body.map((block, blockIndex) => (blockIndex === index ? next : block))
    }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= editing.body.length) return;

    const nextBody = [...editing.body];
    const [target] = nextBody.splice(index, 1);
    nextBody.splice(nextIndex, 0, target);
    updateArticle({ body: nextBody });
  }

  async function uploadImage(file: File) {
    if (!services) {
      throw new Error("Firebase client environment variables are missing.");
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `news/${editing.slug || "draft"}/${Date.now()}-${safeName}`;
    const storageRef = ref(services.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async function handleImageUpload(file: File, onUrl: (url: string) => void) {
    setMessage("画像をアップロードしています...");
    const url = await uploadImage(file);
    onUrl(url);
    setMessage("画像をアップロードしました。");
  }

  function toSaveData(status: NewsStatus): NewsArticle {
    const slug = normalizeSlug(editing.slug);

    return {
      ...editing,
      slug,
      status,
      seo: {
        title: editing.seo.title || editing.title,
        description: editing.seo.description || editing.excerpt,
        ogImage: editing.seo.ogImage || editing.eyecatch?.src
      },
      updatedAt: new Date().toISOString()
    };
  }

  async function save(status: NewsStatus) {
    if (!services) {
      setMessage("NEWS管理を利用するには、Firebaseの環境変数を設定してください。");
      return;
    }

    const article = toSaveData(status);

    if (!article.slug || !article.title) {
      setMessage("タイトルとスラッグを入力してください。");
      return;
    }

    await setDoc(
      doc(services.db, "newsArticles", article.slug),
      {
        ...article,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    setEditing(article);
    await loadArticles();
    setMessage(status === "published" ? "公開しました。" : status === "preview" ? "プレビュー保存しました。" : "下書き保存しました。");
  }

  async function removeArticle(slug: string) {
    if (!services) {
      setMessage("NEWS管理を利用するには、Firebaseの環境変数を設定してください。");
      return;
    }

    if (!window.confirm("この記事を削除しますか？")) return;
    await deleteDoc(doc(services.db, "newsArticles", slug));
    await loadArticles();
    if (editing.slug === slug) setEditing(emptyArticle);
  }

  function loadSeed() {
    setEditing(seedNewsArticles[0] || emptyArticle);
    setMessage("事前登録キャンペーンの記事テンプレートを読み込みました。");
  }

  if (loading) return <main className="admin-page">読み込み中...</main>;

  if (!user) {
    return (
      <main className="admin-page admin-login">
        <form className="admin-panel" onSubmit={login}>
          <p className="section-label">U⇔U CMS</p>
          <h1>NEWS管理ログイン</h1>
          <label>
            メールアドレス
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            パスワード
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          <button className="button primary" type="submit">
            ログイン
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="section-label">U⇔U CMS</p>
          <h1>NEWS管理</h1>
        </div>
        <button type="button" onClick={() => services && signOut(services.auth)}>
          ログアウト
        </button>
      </header>

      {message ? <p className="admin-message">{message}</p> : null}

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-actions">
            <button type="button" onClick={() => setEditing(emptyArticle)}>
              新規作成
            </button>
            <button type="button" onClick={loadSeed}>
              キャンペーン雛形
            </button>
          </div>
          <div className="admin-list">
            {articles.map((article) => (
              <article className="admin-list-item" key={article.slug}>
                <button type="button" onClick={() => setEditing(article)}>
                  <strong>{article.title}</strong>
                  <span>{article.category}</span>
                  <span>
                    {article.status} / {article.publishedAt}
                  </span>
                </button>
                <button type="button" onClick={() => removeArticle(article.slug)}>
                  削除
                </button>
              </article>
            ))}
          </div>
        </aside>

        <section className="admin-editor">
          <ArticleFields
            article={editing}
            onChange={updateArticle}
            onImageUpload={(file, onUrl) => handleImageUpload(file, onUrl)}
          />

          <section className="admin-panel">
            <h2>本文</h2>
            <div className="admin-toolbar">
              {blockTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateArticle({ body: [...editing.body, createBlock(type)] })}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="admin-blocks">
              {editing.body.map((block, index) => (
                <BlockEditor
                  block={block}
                  index={index}
                  key={block.id}
                  onChange={(next) => updateBlock(index, next)}
                  onMove={moveBlock}
                  onRemove={() => updateArticle({ body: editing.body.filter((item) => item.id !== block.id) })}
                  onImageUpload={(file, onUrl) => handleImageUpload(file, onUrl)}
                />
              ))}
            </div>
          </section>

          <div className="admin-publish-bar">
            <button type="button" onClick={() => save("draft")}>
              下書き保存
            </button>
            <button type="button" onClick={() => save("preview")}>
              プレビュー保存
            </button>
            <a href={`${basePath}/news/preview/${editing.slug}`} target="_blank">
              プレビュー
            </a>
            <button className="button primary" type="button" onClick={() => save("published")}>
              公開
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function ArticleFields({
  article,
  onChange,
  onImageUpload
}: {
  article: NewsArticle;
  onChange: (next: Partial<NewsArticle>) => void;
  onImageUpload: (file: File, onUrl: (url: string) => void) => void;
}) {
  return (
    <section className="admin-panel">
      <h2>記事情報</h2>
      <label>
        タイトル
        <input value={article.title} onChange={(event) => onChange({ title: event.target.value })} />
      </label>
      <label>
        スラッグ
        <input value={article.slug} onChange={(event) => onChange({ slug: normalizeSlug(event.target.value) })} />
      </label>
      <label>
        カテゴリー
        <select value={article.category} onChange={(event) => onChange({ category: event.target.value as NewsCategory })}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        公開日
        <input type="date" value={article.publishedAt} onChange={(event) => onChange({ publishedAt: event.target.value })} />
      </label>
      <label>
        説明文
        <textarea value={article.excerpt} onChange={(event) => onChange({ excerpt: event.target.value })} />
      </label>
      <ImageUrlField
        label="アイキャッチ画像"
        value={article.eyecatch?.src || ""}
        onChange={(src) => onChange({ eyecatch: { src, alt: article.eyecatch?.alt || article.title } })}
        onUpload={onImageUpload}
      />
      <label>
        アイキャッチalt
        <input
          value={article.eyecatch?.alt || ""}
          onChange={(event) => onChange({ eyecatch: { src: article.eyecatch?.src || "", alt: event.target.value } })}
        />
      </label>
      <h2>SEO</h2>
      <label>
        SEO title
        <input value={article.seo.title} onChange={(event) => onChange({ seo: { ...article.seo, title: event.target.value } })} />
      </label>
      <label>
        SEO description
        <textarea
          value={article.seo.description}
          onChange={(event) => onChange({ seo: { ...article.seo, description: event.target.value } })}
        />
      </label>
      <ImageUrlField
        label="OGP画像"
        value={article.seo.ogImage || ""}
        onChange={(ogImage) => onChange({ seo: { ...article.seo, ogImage } })}
        onUpload={onImageUpload}
      />
    </section>
  );
}

function ImageUrlField({
  label,
  value,
  onChange,
  onUpload
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File, onUrl: (url: string) => void) => void;
}) {
  return (
    <label>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="画像URL" />
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUpload(file, onChange);
        }}
      />
      {value ? <img className="admin-image-preview" src={value} alt="" /> : null}
    </label>
  );
}

function BlockEditor({
  block,
  index,
  onChange,
  onMove,
  onRemove,
  onImageUpload
}: {
  block: NewsBlock;
  index: number;
  onChange: (block: NewsBlock) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: () => void;
  onImageUpload: (file: File, onUrl: (url: string) => void) => void;
}) {
  return (
    <article className="admin-block">
      <div className="admin-block-head">
        <strong>{block.type}</strong>
        <div>
          <button type="button" onClick={() => onMove(index, -1)}>
            上へ
          </button>
          <button type="button" onClick={() => onMove(index, 1)}>
            下へ
          </button>
          <button type="button" onClick={onRemove}>
            削除
          </button>
        </div>
      </div>

      {"text" in block ? (
        <textarea value={block.text} onChange={(event) => onChange({ ...block, text: event.target.value })} />
      ) : null}
      {"items" in block ? (
        <textarea
          value={block.items.join("\n")}
          onChange={(event) => onChange({ ...block, items: event.target.value.split("\n") })}
          placeholder="1行ごとに項目を入力"
        />
      ) : null}
      {"label" in block ? (
        <div className="admin-inline-fields">
          <input value={block.label} onChange={(event) => onChange({ ...block, label: event.target.value })} placeholder="表示テキスト" />
          <input value={block.href} onChange={(event) => onChange({ ...block, href: event.target.value })} placeholder="URL" />
        </div>
      ) : null}
      {block.type === "image" ? (
        <>
          <ImageUrlField
            label="本文画像"
            value={block.src}
            onChange={(src) => onChange({ ...block, src })}
            onUpload={onImageUpload}
          />
          <input value={block.alt} onChange={(event) => onChange({ ...block, alt: event.target.value })} placeholder="alt" />
          <input value={block.caption || ""} onChange={(event) => onChange({ ...block, caption: event.target.value })} placeholder="キャプション" />
        </>
      ) : null}
      {block.type === "note" ? (
        <input value={block.title} onChange={(event) => onChange({ ...block, title: event.target.value })} placeholder="注意事項タイトル" />
      ) : null}
    </article>
  );
}
