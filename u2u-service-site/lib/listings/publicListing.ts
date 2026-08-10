import { getFirestoreDocument, getPublishedReviewSummary } from "./firestore";

export type ListingType = "skill" | "request";

export type PublicProfile = {
  name: string;
  photoUrl: string;
  rating: number;
  ratingCount: number;
};

export type PublicListing = {
  id: string;
  type: ListingType;
  label: "ForU" | "FromU";
  title: string;
  description: string;
  requiredItems: string;
  precautions: string;
  priceLabel: string;
  category: string;
  subCategory: string;
  lessonMethodLabel: string;
  timeLabel: string;
  deliveryLabel: string;
  favoriteCount: number;
  primaryStatLabel: string;
  secondaryStatLabel: string;
  images: string[];
  profile: PublicProfile;
  canonicalUrl: string;
};

export const SITE_ORIGIN = "https://u2u.heyl.co.jp";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/hero-u2u.png`;
export const APP_START_URL = `${SITE_ORIGIN}/preregister`;

const FORU_CLOSED_STATUSES = new Set([
  "draft",
  "paused",
  "deleted",
  "ended",
  "completed",
  "closed"
]);

const FROMU_CLOSED_STATUSES = new Set([
  "ended",
  "selected",
  "selection_pending",
  "matched",
  "completed",
  "closed",
  "deleted",
  "paused"
]);

const BLOCKED_ACCOUNT_STATUSES = new Set(["suspended", "frozen", "deleting", "deleted"]);

const CATEGORY_LABELS: Record<string, string> = {
  study: "勉強",
  creative: "クリエイティブ",
  sports: "スポーツ",
  beauty: "美容",
  entertainment: "エンタメ",
  it: "IT",
  life: "生活",
  support: "サポート"
};

const SUB_CATEGORY_LABELS: Record<string, string> = {
  japanese: "国語",
  math: "算数・数学",
  english: "英語",
  science: "理科",
  social: "社会",
  it_subject: "情報",
  other: "その他",
  illustration: "イラスト",
  design: "デザイン",
  photo: "写真",
  video: "動画制作",
  music: "音楽制作",
  writing: "文章・作文",
  training: "トレーニング",
  makeup: "メイク",
  hair: "ヘアアレンジ",
  skincare: "スキンケア",
  coordinate: "コーディネート",
  instrument: "楽器",
  singing: "歌",
  dance: "ダンス",
  game: "ゲーム",
  streaming: "配信・動画活動",
  programming: "プログラミング",
  web: "Web制作",
  app: "アプリ開発",
  cooking: "料理",
  cleaning: "掃除",
  laundry: "洗濯",
  sewing: "裁縫",
  career: "進路",
  school: "学校・不登校",
  relationship: "人間関係",
  love: "恋愛",
  mental: "メンタル面",
  chat: "雑談"
};

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function firstString(values: unknown[]): string {
  for (const value of values) {
    const normalized = text(value);
    if (normalized) return normalized;
  }
  return "";
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return null;
}

function toMillis(value: unknown): number | null {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value) {
    const millis = new Date(value).getTime();
    return Number.isFinite(millis) ? millis : null;
  }

  const record = objectRecord(value);
  if (!record) return null;

  if (typeof record.toDate === "function") {
    const date = (record.toDate as () => unknown)();
    return date instanceof Date ? date.getTime() : null;
  }

  const seconds = toNumber(record.seconds ?? record._seconds);
  return seconds === null ? null : seconds * 1000;
}

function safeUrl(value: unknown): string {
  const raw = text(value);
  if (!raw) return "";

  try {
    const url = new URL(raw, SITE_ORIGIN);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.protocol === "http:" && url.hostname !== "localhost") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function safeExternalImageUrl(value: unknown): string {
  const url = safeUrl(value);
  if (!url) return "";

  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.toString() : "";
  } catch {
    return "";
  }
}

function objectRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function pickImageUrls(data: Record<string, unknown>) {
  const candidates = [
    data.imageUrls,
    data.photoList,
    data.skillImageUrls,
    data.requestImageUrls
  ];
  const urls: string[] = [];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;

    for (const item of candidate) {
      const objectItem = objectRecord(item);
      const raw = objectItem
        ? firstString([
            objectItem.url,
            objectItem.downloadUrl,
            objectItem.downloadURL,
            objectItem.imageUrl,
            objectItem.photoUrl
          ])
        : text(item);
      const url = safeExternalImageUrl(raw);
      if (url && !urls.includes(url)) urls.push(url);
    }
  }

  for (const field of ["imageUrl", "photoUrl", "skillImageUrl", "requestImageUrl"]) {
    const url = safeExternalImageUrl(data[field]);
    if (url && !urls.includes(url)) urls.push(url);
  }

  return urls.slice(0, 6);
}

function lessonMethodLabel(value: unknown): string {
  const raw = text(value).toLowerCase();
  if (!raw || raw === "online" || raw === "0") return "オンライン";
  if (raw === "offline" || raw === "face_to_face" || raw === "facetoface" || raw === "1") {
    return "対面";
  }
  return text(value);
}

function yenLabel(value: unknown): string {
  const amount = toNumber(value);
  if (amount === null || amount <= 0) return "";
  return `¥${Math.round(amount).toLocaleString("ja-JP")}`;
}

function durationLabel(value: unknown, label: "所要時間" | "希望時間"): string {
  const minutes = toNumber(value);
  if (minutes === null || minutes <= 0) return "";
  return `${label}: ${Math.round(minutes)}分`;
}

function count(value: unknown): number {
  const number = toNumber(value);
  return number === null ? 0 : Math.max(0, Math.round(number));
}

function categoryLabel(value: string, labels: Record<string, string>) {
  return labels[value] || value;
}

function formatDeliveryEstimate(value: unknown) {
  const raw = text(value);
  if (!raw) return "相談して決定";
  return raw.replace(/^[～~]/, "〜").replaceAll("以内", "");
}

function formatDesiredDeliveryDate(desiredValue: unknown, createdValue: unknown) {
  const desiredMillis = toMillis(desiredValue);
  if (desiredMillis === null) return "相談して決定";

  const createdMillis = toMillis(createdValue) ?? Date.now();
  const days = Math.floor((desiredMillis - createdMillis) / 86_400_000);
  if (days <= 3) return "〜3日";
  if (days <= 7) return "〜1週間";
  if (days <= 14) return "〜2週間";
  return "〜1か月";
}

function recruitmentDeadlineLabel(data: Record<string, unknown>) {
  const explicitDeadline = toMillis(data.recruitmentDeadlineAt);
  const createdAt = toMillis(data.createdAt);
  const recruitmentDays = count(data.recruitmentPeriodDays) || 3;
  const deadline = explicitDeadline ??
    (createdAt === null ? null : createdAt + recruitmentDays * 86_400_000);

  if (deadline === null || deadline <= Date.now()) return "公開終了";

  const dateKey = (millis: number) => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date(millis));
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((item) => item.type === type)?.value || 0);
    return Date.UTC(part("year"), part("month") - 1, part("day"));
  };
  const remainingDays = Math.max(
    0,
    Math.round((dateKey(deadline) - dateKey(Date.now())) / 86_400_000)
  );
  return remainingDays === 0 ? "本日まで" : `あと${remainingDays}日`;
}

function isPublishedBase(data: Record<string, unknown>): boolean {
  const status = text(data.status).toLowerCase();
  return (
    status === "published" &&
    data.isActive === true &&
    !data.deletedAt &&
    data.ownerAccountDeleted !== true
  );
}

function isPublicSkill(data: Record<string, unknown>): boolean {
  const status = text(data.status).toLowerCase();
  if (!isPublishedBase(data)) return false;
  if (FORU_CLOSED_STATUSES.has(status)) return false;
  if (data.endedAt) return false;
  return true;
}

function isPublicRequest(data: Record<string, unknown>): boolean {
  const status = text(data.status).toLowerCase();
  if (!isPublishedBase(data)) return false;
  if (FROMU_CLOSED_STATUSES.has(status)) return false;
  if (
    data.endedAt ||
    data.recruitmentClosedAt ||
    data.finalizedOrderId ||
    data.selectedApplicationId ||
    data.selectedApplicantId ||
    data.pendingApplicationId ||
    data.pendingApplicantId ||
    data.selectionStartedAt ||
    data.orderId ||
    data.transactionId
  ) {
    return false;
  }

  const createdAtMillis = toMillis(data.createdAt);
  const recruitmentDays = count(data.recruitmentPeriodDays) || 3;
  const deadlineMillis =
    toMillis(data.recruitmentDeadlineAt) ??
    (createdAtMillis === null ? null : createdAtMillis + recruitmentDays * 86_400_000);
  return deadlineMillis === null || deadlineMillis > Date.now();
}

async function isOwnerPubliclyAvailable(uid: string) {
  if (!uid) return false;

  const user = await getFirestoreDocument("users", uid);
  if (!user) return false;

  const accountStatus = text(user.accountStatus).toLowerCase();
  return !BLOCKED_ACCOUNT_STATUSES.has(accountStatus);
}

async function publicProfile(uid: string): Promise<PublicProfile> {
  if (!uid) {
    return { name: "ユーザー", photoUrl: "", rating: 0, ratingCount: 0 };
  }

  const [data, reviewSummary] = await Promise.all([
    getFirestoreDocument("publicUsers", uid),
    getPublishedReviewSummary(uid).catch(() => ({ rating: 0, count: 0 }))
  ]);
  const publicUser = data || {};

  return {
    name: firstString([publicUser.displayName, publicUser.nickname, publicUser.name]) || "ユーザー",
    photoUrl: safeExternalImageUrl(
      firstString([publicUser.photoUrl, publicUser.imageUrl, publicUser.iconUrl])
    ),
    rating: reviewSummary.rating,
    ratingCount: reviewSummary.count
  };
}

function validateListingId(id: string) {
  const normalized = id.trim();
  if (
    !normalized ||
    normalized.includes("/") ||
    normalized.length > 160 ||
    /^__.*__$/.test(normalized)
  ) {
    return "";
  }
  return normalized;
}

export function metadataDescription(listing: PublicListing) {
  const source = listing.description || `${listing.label}の投稿をU⇔Uで確認できます。`;
  return source.replace(/\s+/g, " ").slice(0, 110);
}

export function listingInfoRows(listing: PublicListing) {
  return [
    ["カテゴリー", [listing.category, listing.subCategory].filter(Boolean).join(" / ")],
    ["実施形式", listing.lessonMethodLabel],
    [listing.type === "skill" ? "所要時間" : "希望時間", listing.timeLabel],
    [listing.type === "skill" ? "納期目安" : "希望納期", listing.deliveryLabel]
  ].filter((row): row is [string, string] => Boolean(row[1]));
}

export async function getPublicListing(type: ListingType, id: string) {
  const normalizedId = validateListingId(id);
  if (!normalizedId) return null;

  const collection = type === "skill" ? "skills" : "requests";
  const data = await getFirestoreDocument(collection, normalizedId);
  if (!data) return null;

  const isPublic = type === "skill" ? isPublicSkill(data) : isPublicRequest(data);
  if (!isPublic) return null;

  const ownerId =
    type === "skill" ? text(data.sellerId) : firstString([data.buyerId, data.userId, data.ownerId]);
  if (!(await isOwnerPubliclyAvailable(ownerId))) return null;

  const profile = await publicProfile(ownerId);
  const title = text(data.title);
  if (!title) return null;

  const rawCategory = firstString([
    data.categoryLabel,
    data.categoryName,
    data.categoryId,
    data.category
  ]);
  const rawSubCategory = firstString([
    data.subCategoryLabel,
    data.subCategoryName,
    data.subCategoryId,
    data.subCategory,
    data.subcategory
  ]);
  const time = durationLabel(data.duration, type === "skill" ? "所要時間" : "希望時間")
    .replace(/^[^:]+: /, "");

  return {
    id: normalizedId,
    type,
    label: type === "skill" ? "ForU" : "FromU",
    title,
    description: text(data.description),
    requiredItems: text(data.requiredItems),
    precautions: text(data.precautions),
    priceLabel: yenLabel(type === "skill" ? data.price : data.budget ?? data.price),
    category: categoryLabel(rawCategory, CATEGORY_LABELS),
    subCategory: categoryLabel(rawSubCategory, SUB_CATEGORY_LABELS),
    lessonMethodLabel: lessonMethodLabel(data.lessonMethod),
    timeLabel: time,
    deliveryLabel:
      type === "skill"
        ? time
          ? ""
          : formatDeliveryEstimate(data.deliveryEstimate)
        : time
          ? ""
          : formatDesiredDeliveryDate(data.desiredDeliveryDate, data.createdAt),
    favoriteCount: count(data.favoriteCount),
    primaryStatLabel:
      type === "skill"
        ? `対応中 ${count(data.inProgressTransactionCount)}件`
        : `応募件数 ${count(data.applicationCount)}件`,
    secondaryStatLabel:
      type === "skill"
        ? `販売実績 ${count(data.completedSalesCount)}件`
        : recruitmentDeadlineLabel(data),
    images: pickImageUrls(data),
    profile,
    canonicalUrl: `${SITE_ORIGIN}/${type}/${encodeURIComponent(normalizedId)}`
  } satisfies PublicListing;
}
