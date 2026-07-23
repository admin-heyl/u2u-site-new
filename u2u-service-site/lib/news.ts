export type NewsCategory =
  | "キャンペーン"
  | "お知らせ"
  | "リリース情報"
  | "アップデート"
  | "機能追加"
  | "メンテナンス"
  | "障害情報"
  | "その他";

export type NewsStatus = "draft" | "preview" | "published";

type BaseBlock = {
  id: string;
};

export type NewsBlock =
  | (BaseBlock & { type: "h2" | "h3"; text: string })
  | (BaseBlock & { type: "p"; text: string })
  | (BaseBlock & { type: "strong"; text: string })
  | (BaseBlock & { type: "ul" | "ol"; items: string[] })
  | (BaseBlock & { type: "link"; label: string; href: string })
  | (BaseBlock & { type: "image"; src: string; alt: string; caption?: string })
  | (BaseBlock & { type: "button"; label: string; href: string })
  | (BaseBlock & { type: "note"; title: string; items: string[] });

export type NewsArticle = {
  slug: string;
  status: NewsStatus;
  visibility?: "listed" | "unlisted";
  category: NewsCategory;
  title: string;
  publishedAt: string;
  excerpt: string;
  eyecatch?: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  body: NewsBlock[];
  updatedAt?: string;
};

export const seedNewsArticles: NewsArticle[] = [
  {
    slug: "pre-registration-sns",
    status: "published",
    visibility: "listed",
    category: "キャンペーン",
    title: "事前登録開始・公式SNS開設のお知らせ",
    publishedAt: "2026-07-24",
    excerpt:
      "U⇔Uの事前登録を開始しました。\nあわせて、公式SNS（X・Instagram）を開設しました。\n事前登録開始および公式SNS開設を記念したキャンペーンもスタートしました。",
    eyecatch: {
      src: "/images/news/u2u_preregistration.png",
      alt: "U⇔U 事前登録開始・公式アカウント開設記念 Amazonギフトカードプレゼントキャンペーン"
    },
    seo: {
      title: "事前登録開始・公式SNS開設のお知らせ | U⇔U TOPICS",
      description:
        "U⇔Uの事前登録開始と公式SNS開設を記念したキャンペーンもスタートしました。",
      ogImage: "/images/news/u2u_preregistration.png"
    },
    body: [
      { id: "campaign-heading", type: "h2", text: "キャンペーン概要" },
      { id: "period-heading", type: "h3", text: "応募期間" },
      {
        id: "period",
        type: "strong",
        text: "2026年7月24日（金）〜2026年8月9日（日）23:59"
      },
      { id: "howto-heading", type: "h3", text: "応募方法" },
      {
        id: "howto",
        type: "ol",
        items: [
          "U⇔U公式Xをフォロー",
          "「#ユーーズはじめよう」を付けて、あなたの得意なことや誰かの力を借りたいことを書いて、キャンペーン対象ポストを引用リポスト"
        ]
      },
      {
        id: "howto-extra",
        type: "strong",
        text: "さらに事前登録で当選確率UP"
      },
      { id: "prize-heading", type: "h3", text: "賞品" },
      {
        id: "prizes",
        type: "ul",
        items: [
          "Amazonギフトカード 5,000円分：2名様",
          "Amazonギフトカード 1,000円分：10名様",
          "Amazonギフトカード 500円分：20名様"
        ]
      },
      { id: "terms-heading", type: "h2", text: "応募規約" },
      {
        id: "terms-lead",
        type: "p",
        text: "本キャンペーンへ応募される前に、本応募規約をよくお読みください。応募された場合、本応募規約に同意いただいたものとみなします。"
      },
      { id: "eligibility-heading", type: "h3", text: "応募資格" },
      {
        id: "eligibility",
        type: "ul",
        items: [
          "日本国内にお住まいの方",
          "Xアカウントを保有している方",
          "応募期間中に応募条件を満たした方",
          "U⇔U公式XアカウントからのDMを受信できる方",
          "本応募規約に同意いただける方"
        ]
      },
      { id: "winner-heading", type: "h3", text: "当選発表" },
      {
        id: "winner-1",
        type: "p",
        text: "応募締切後、厳正なる抽選を行います。\n当選者にはU⇔U公式Xアカウントよりダイレクトメッセージ（DM）にてご連絡いたします。"
      },
      {
        id: "winner-2",
        type: "p",
        text: "DMを受信できる設定へ変更のうえご応募ください。\n当選通知後、当社が指定する期限までにご返信いただけない場合は、当選を無効とさせていただく場合があります。"
      },
      { id: "application-notes-heading", type: "h3", text: "応募に関する注意事項" },
      {
        id: "application-notes",
        type: "ul",
        items: [
          "応募はお一人様1アカウントまでとします。",
          "非公開（鍵付き）アカウントからの引用リポストは、投稿内容を確認できないため応募対象外となります。",
          "当選発表までの間に、U⇔U公式Xアカウント（@u2u_heyl）のフォローを解除した場合、または応募対象の引用リポストを削除した場合は、応募資格を無効とする場合があります。",
          "応募内容が公序良俗に反するもの、第三者の権利を侵害するもの、その他当社が不適切と判断した場合は応募を無効とします。",
          "不正行為が確認された場合は応募・当選を無効とします。",
          "本キャンペーンは予告なく変更・中止・終了する場合があります。"
        ]
      },
      { id: "privacy-heading", type: "h3", text: "個人情報の取扱い" },
      {
        id: "privacy",
        type: "p",
        text: "当選者から取得した個人情報は、本キャンペーンの運営、当選連絡および賞品送付等、本キャンペーンの実施に必要な範囲でのみ利用します。その他の取扱いについては、当社プライバシーポリシーをご確認ください。"
      },
      { id: "disclaimer-heading", type: "h3", text: "免責事項" },
      {
        id: "disclaimer-1",
        type: "p",
        text: "本キャンペーンは合同会社HEYLが実施するものであり、X Corp.とは一切関係ありません。"
      },
      {
        id: "disclaimer-2",
        type: "p",
        text: "通信環境やシステム障害等により応募できなかった場合などについて、当社は責任を負いかねます。"
      },
      {
        id: "added-terms",
        type: "ul",
        items: [
          "当選の権利は応募者ご本人のものとし、第三者への譲渡、換金、転売はできません。",
          "賞品の内容、仕様、付与方法は、やむを得ない事情により変更となる場合があります。",
          "当選連絡後、指定期日までに必要事項の確認ができない場合、または応募条件を満たしていないことが判明した場合、当選を無効とする場合があります。",
          "応募に伴う通信費、接続費、その他一切の費用は応募者の負担となります。",
          "本応募規約に定めのない事項については、当社の判断により決定します。"
        ]
      },
      { id: "amazon-notes-heading", type: "h3", text: "Amazonギフトカードに関する注意事項" },
      {
        id: "amazon-notes-1",
        type: "p",
        text: "本キャンペーンは合同会社HEYLが実施するものであり、Amazonでは本キャンペーンに関するお問い合わせを受け付けておりません。\nお問い合わせは support@u2u.heyl.co.jp までお願いいたします。"
      },
      {
        id: "amazon-notes-2",
        type: "p",
        text: "Amazon、Amazon.co.jp およびそれらのロゴは Amazon.com, Inc. またはその関連会社の商標です。"
      }
    ]
  }
];

type FirestoreValue =
  | { stringValue?: string }
  | { timestampValue?: string }
  | { booleanValue?: boolean }
  | { arrayValue?: { values?: FirestoreValue[] } }
  | { mapValue?: { fields?: Record<string, FirestoreValue> } };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

function valueToJs(value: FirestoreValue | undefined): unknown {
  if (!value) return undefined;
  if ("stringValue" in value) return value.stringValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("arrayValue" in value) return (value.arrayValue?.values || []).map(valueToJs);
  if ("mapValue" in value) {
    return Object.fromEntries(
      Object.entries(value.mapValue?.fields || {}).map(([key, child]) => [key, valueToJs(child)])
    );
  }
  return undefined;
}

function documentToArticle(document: FirestoreDocument): NewsArticle | null {
  const data = Object.fromEntries(
    Object.entries(document.fields || {}).map(([key, value]) => [key, valueToJs(value)])
  ) as Partial<NewsArticle>;

  const slug = data.slug || document.name.split("/").pop();

  if (!slug || !data.title || !data.category || !data.status) {
    return null;
  }

  return {
    slug,
    status: data.status,
    category: data.category,
    title: data.title,
    publishedAt: data.publishedAt || "",
    excerpt: data.excerpt || "",
    eyecatch: data.eyecatch,
    seo: data.seo || {
      title: data.title,
      description: data.excerpt || ""
    },
    body: data.body || [],
    updatedAt: data.updatedAt
  } as NewsArticle;
}

function sortByPublishedAt(articles: NewsArticle[]) {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function isUnlistedNewsArticle(article: NewsArticle) {
  return article.visibility === "unlisted" || article.slug === "pre-registration-official-sns";
}

async function fetchFirestoreDocuments(status?: NewsStatus) {
  const projectId = process.env.NEWS_FIRESTORE_PROJECT_ID;
  const databaseId = process.env.NEWS_FIRESTORE_DATABASE_ID || "(default)";
  const apiKey = process.env.NEWS_FIREBASE_WEB_API_KEY;

  if (!projectId) {
    return null;
  }

  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:runQuery`
  );

  if (apiKey) {
    url.searchParams.set("key", apiKey);
  }

  const response = await fetch(url, {
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "newsArticles" }],
        where: status
          ? {
              fieldFilter: {
                field: { fieldPath: "status" },
                op: "EQUAL",
                value: { stringValue: status }
              }
            }
          : undefined,
        orderBy: [{ field: { fieldPath: "publishedAt" }, direction: "DESCENDING" }],
        limit: 100
      }
    }),
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch newsArticles from Firestore: ${response.status}`);
  }

  const payload = (await response.json()) as { document?: FirestoreDocument }[];
  return payload.map((result) => result.document).filter((document): document is FirestoreDocument => Boolean(document));
}

async function getFirestoreNewsArticles(status?: NewsStatus) {
  try {
    const documents = await fetchFirestoreDocuments(status);
    if (!documents) {
      return seedNewsArticles;
    }

    const firestoreArticles = documents
      .map(documentToArticle)
      .filter((article): article is NewsArticle => Boolean(article));
    const articlesBySlug = new Map(seedNewsArticles.map((article) => [article.slug, article]));

    for (const article of firestoreArticles) {
      const seedArticle = articlesBySlug.get(article.slug);
      if (seedArticle && isUnlistedNewsArticle(seedArticle)) {
        continue;
      }

      articlesBySlug.set(article.slug, article);
    }

    return sortByPublishedAt([...articlesBySlug.values()]);
  } catch {
    return seedNewsArticles;
  }
}

export async function getPublishedNewsArticles() {
  const articles = await getFirestoreNewsArticles("published");
  return sortByPublishedAt(
    articles.filter((article) => article.status === "published" && !isUnlistedNewsArticle(article))
  );
}

export async function getPublishedNewsArticle(slug: string) {
  const articles = await getFirestoreNewsArticles("published");
  return articles.find((article) => article.status === "published" && article.slug === slug);
}

export function formatNewsDate(date: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}
