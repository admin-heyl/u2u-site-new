declare module "firebase/storage" {
  export function getStorage(app?: unknown): unknown;
  export function ref(storage: unknown, path: string): unknown;
  export function uploadBytes(storageRef: unknown, data: Blob | Uint8Array | ArrayBuffer): Promise<unknown>;
  export function getDownloadURL(storageRef: unknown): Promise<string>;
}
