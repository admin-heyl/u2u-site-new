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
