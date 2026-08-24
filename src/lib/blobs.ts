import { getStore } from "@netlify/blobs";

const STORE_NAME = "showverse-media";

function getMediaStore() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

export async function uploadImage(
  key: string,
  data: ArrayBuffer,
  contentType: string
): Promise<string> {
  const store = getMediaStore();
  await store.set(key, data, { metadata: { contentType } });
  return `/api/media/${key}`;
}

export async function deleteImage(key: string): Promise<void> {
  const store = getMediaStore();
  await store.delete(key);
}

export async function getImage(key: string) {
  const store = getMediaStore();
  return store.getWithMetadata(key, { type: "arrayBuffer" });
}
