import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit item
      </Heading>
      <ItemForm action={boundAction} defaultValues={item} submitLabel="Save changes" />
    </div>
  );
}

export default EditSkillItemPage;
