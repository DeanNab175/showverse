import { NextResponse } from "next/server";

import { getImage } from "@/lib/blobs";

interface RouteParams {
  params: Promise<{ key: string[] }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { key } = await params;
  const blobKey = key.join("/");

  const result = await getImage(blobKey);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const contentType =
    (result.metadata?.contentType as string | undefined) ?? "application/octet-stream";

  return new NextResponse(result.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
