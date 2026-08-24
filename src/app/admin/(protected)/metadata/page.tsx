import Link from "next/link";

import { prisma } from "@/lib/prisma";

const PAGE_ORDER = ["home", "about", "portfolio", "skills", "contact"];

async function MetadataPage() {
  const rows = await prisma.pageMetadata.findMany();
  const byKey = new Map(rows.map((row) => [row.pageKey, row]));

  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Page metadata</h1>
      <div className="flex flex-col gap-2">
        {PAGE_ORDER.map((pageKey) => {
          const row = byKey.get(pageKey);
          return (
            <Link
              key={pageKey}
              href={`/admin/metadata/${pageKey}`}
              className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3 hover:text-primary"
            >
              <span className="font-medium capitalize">{pageKey}</span>
              <span className="text-sm text-body-txt/60 truncate max-w-xs">
                {row?.title ?? "(not set)"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MetadataPage;
