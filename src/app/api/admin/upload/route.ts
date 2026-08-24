import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { uploadImage } from "@/lib/blobs";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const extension = file.name.split(".").pop() || "bin";
  const folderPrefix = typeof folder === "string" && folder ? `${folder}/` : "";
  const key = `${folderPrefix}${crypto.randomUUID()}.${extension}`;

  const buffer = await file.arrayBuffer();
  const url = await uploadImage(key, buffer, file.type);

  return NextResponse.json({ url });
}
