import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updatePageMetadata } from "../actions";
import MetadataForm from "../metadata-form";

const VALID_PAGE_KEYS = ["home", "about", "portfolio", "skills", "contact"];

interface EditMetadataPageProps {
  params: Promise<{ pageKey: string }>;
}

async function EditMetadataPage({ params }: EditMetadataPageProps) {
  const { pageKey } = await params;

  if (!VALID_PAGE_KEYS.includes(pageKey)) notFound();

  const row = await prisma.pageMetadata.findUnique({ where: { pageKey } });
  const boundAction = updatePageMetadata.bind(null, pageKey);

  return (
    <div>
      <Link href="/admin/metadata" className="text-sm hover:text-primary">
        &larr; Back to page metadata
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4 capitalize">{pageKey} metadata</h1>
      <MetadataForm
        action={boundAction}
        defaultValues={{
          title: row?.title ?? "",
          description: row?.description ?? "",
        }}
      />
    </div>
  );
}

export default EditMetadataPage;
