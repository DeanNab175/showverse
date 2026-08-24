import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";

export type PageKey = "home" | "about" | "portfolio" | "skills" | "contact";

export async function getPageMetadata(pageKey: PageKey): Promise<Metadata> {
  const meta = await prisma.pageMetadata.findUnique({ where: { pageKey } });

  return {
    title: meta?.title,
    description: meta?.description,
  };
}
