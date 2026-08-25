import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";

import { updateSkillCategory, deleteSkillItem } from "../actions";
import CategoryForm from "../category-form";

interface EditSkillCategoryPageProps {
  params: Promise<{ id: string }>;
}

async function EditSkillCategoryPage({ params }: EditSkillCategoryPageProps) {
  const { id } = await params;
  const category = await prisma.skillCategory.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });

  if (!category) notFound();

  const boundUpdateAction = updateSkillCategory.bind(null, id);

  return (
    <div>
      <Link href="/admin/skills" className="text-sm hover:text-primary">
        &larr; Back to skills
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit category
      </Heading>
      <div className="mb-8">
        <CategoryForm
          action={boundUpdateAction}
          defaultValues={category}
          submitLabel="Save changes"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-xl font-medium">Items</Heading>
        <Button asChild size="sm">
          <Link href={`/admin/skills/${id}/items/new`}>Add item</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {category.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.iconUrl}
                alt=""
                className="h-8 w-8 rounded-md object-contain bg-page-bg"
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/skills/${id}/items/${item.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteSkillItem.bind(null, id, item.id)}
                confirmMessage={`Delete "${item.name}"?`}
              />
            </div>
          </div>
        ))}
        {category.items.length === 0 && (
          <p className="text-sm text-body-txt/60">No items yet.</p>
        )}
      </div>
    </div>
  );
}

export default EditSkillCategoryPage;
