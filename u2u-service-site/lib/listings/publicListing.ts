import { getFirestoreDocument } from "./firestore";

export type ListingType = "skill" | "request";

export type PublicProfile = {
  name: string;
  photoUrl: string;
  schoolType: string;
  schoolYearLabel: string;
};

export type PublicListing = {
  id: string;
  type: ListingType;
  label: "ForU" | "FromU";
  title: string;
  description: string;
  priceLabel: string;
  category: string;
  subCategory: string;
  lessonMethodLabel: string;
  durationLabel: string;
  deliveryEstimateLabel: string;
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
  if (typeof value !== "string" || !value) return null;
  const millis = new Date(value).getTime();
  return Number.isFinite(millis) ? millis : null;
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

  const deadlineMillis = toMillis(data.recruitmentDeadlineAt);
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
    return { name: "ユーザー", photoUrl: "", schoolType: "", schoolYearLabel: "" };
  }

  const data = (await getFirestoreDocument("publicUsers", uid)) || {};
  const isSchoolPublic = data.isSchoolPublic === true;

  return {
    name: firstString([data.displayName, data.nickname, data.name]) || "ユーザー",
    photoUrl: safeExternalImageUrl(firstString([data.photoUrl, data.imageUrl, data.iconUrl])),
    schoolType: isSchoolPublic ? text(data.schoolType) : "",
    schoolYearLabel: isSchoolPublic ? firstString([data.schoolYearLabel, data.schoolYear]) : ""
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
    [listing.type === "skill" ? "価格" : "予算", listing.priceLabel],
    ["カテゴリ", [listing.category, listing.subCategory].filter(Boolean).join(" / ")],
    ["実施形式", listing.lessonMethodLabel],
    [
      listing.type === "skill" ? "所要時間" : "希望時間",
      listing.durationLabel.replace(/^[^:]+: /, "")
    ],
    ["納期目安", listing.deliveryEstimateLabel]
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

  return {
    id: normalizedId,
    type,
    label: type === "skill" ? "ForU" : "FromU",
    title,
    description: text(data.description),
    priceLabel: yenLabel(type === "skill" ? data.price : data.budget ?? data.price),
    category: firstString([data.categoryLabel, data.categoryName, data.categoryId, data.category]),
    subCategory: firstString([
      data.subCategoryLabel,
      data.subCategoryName,
      data.subCategoryId,
      data.subCategory,
      data.subcategory
    ]),
    lessonMethodLabel: lessonMethodLabel(data.lessonMethod),
    durationLabel: durationLabel(data.duration, type === "skill" ? "所要時間" : "希望時間"),
    deliveryEstimateLabel: type === "skill" ? text(data.deliveryEstimate) : "",
    images: pickImageUrls(data),
    profile,
    canonicalUrl: `${SITE_ORIGIN}/${type}/${encodeURIComponent(normalizedId)}`
  } satisfies PublicListing;
}
