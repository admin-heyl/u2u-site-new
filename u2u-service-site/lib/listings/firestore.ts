import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function firebaseAdminConfig() {
  const projectId = process.env.U2U_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
  const clientEmail =
    process.env.U2U_FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (
    process.env.U2U_FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY || ""
  ).replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey
  };
}

function getFirebaseAdminApp(): App | null {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const config = firebaseAdminConfig();
  if (!config) return null;

  return initializeApp({
    credential: cert(config),
    projectId: config.projectId
  });
}

export async function getFirestoreDocument(collection: string, id: string) {
  const app = getFirebaseAdminApp();
  if (!app) return null;
  const databaseId = process.env.U2U_FIRESTORE_DATABASE_ID || "(default)";

  const document = await getFirestore(app, databaseId).collection(collection).doc(id).get();
  if (!document.exists) return null;

  return document.data() || null;
}

export async function getPublishedReviewSummary(uid: string) {
  const app = getFirebaseAdminApp();
  if (!app || !uid) return { rating: 0, count: 0 };

  const databaseId = process.env.U2U_FIRESTORE_DATABASE_ID || "(default)";
  const snapshot = await getFirestore(app, databaseId)
    .collection("reviews")
    .where("toUserId", "==", uid)
    .where("published", "==", true)
    .get();

  const ratings = snapshot.docs
    .map((document) => document.data().rating)
    .filter((value): value is number => typeof value === "number" && value >= 1 && value <= 5);

  if (ratings.length === 0) return { rating: 0, count: 0 };

  return {
    rating: ratings.reduce((total, value) => total + value, 0) / ratings.length,
    count: ratings.length
  };
}
