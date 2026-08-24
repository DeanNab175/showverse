import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateSkillItem } from "../../../actions";
import ItemForm from "../../../item-form";

interface EditSkillItemPageProps {
  params: Promise<{ id: string; itemId: string }>;
}

async function EditSkillItemPage({ params }: EditSkillItemPageProps) {
  const { id, itemId } = await params;
  const item = await prisma.skillItem.findUnique({ where: { id: itemId } });

  if (!item || item.skillCategoryId !== id) notFound();

  const boundAction = updateSkillItem.bind(null, id, itemId);

  return (
    <div>
      <Link href={`/admin/skills/${id}`} className="text-sm hover:text-primary">
        &larr; Back to category
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit item</h1>
      <ItemForm action={boundAction} defaultValues={item} submitLabel="Save changes" />
    </div>
  );
}

export default EditSkillItemPage;
