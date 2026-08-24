import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";

import { deleteSkillCategory } from "./actions";
import SectionForm from "./section-form";

async function SkillsAdminPage() {
  const section = await prisma.skillsCategoriesSection.findUnique({
    where: { id: "skills_categories_singleton" },
    include: {
      categories: {
        orderBy: { sortOrder: "asc" },
        include: { items: true },
      },
    },
  });

  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Skills</h1>

      <SectionForm
        defaultValues={{
          headingText: section?.headingText ?? "",
          headingLevel: section?.headingLevel ?? "",
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium">Categories</h2>
        <Link
          href="/admin/skills/new"
          className="rounded-lg bg-primary text-button-primary-txt px-4 py-2 text-sm font-medium"
        >
          Add category
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {(section?.categories ?? []).map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{category.labelText}</span>
              <span className="text-sm text-body-txt/60">
                {category.items.length} items
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/skills/${category.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteSkillCategory.bind(null, category.id)}
                confirmMessage={`Delete "${category.labelText}" and all its items?`}
              />
            </div>
          </div>
        ))}
        {(section?.categories ?? []).length === 0 && (
          <p className="text-sm text-body-txt/60">No categories yet.</p>
        )}
      </div>
    </div>
  );
}

export default SkillsAdminPage;
