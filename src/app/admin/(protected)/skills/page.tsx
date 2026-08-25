import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mb-4">
        Skills
      </Heading>

      <SectionForm
        defaultValues={{
          headingText: section?.headingText ?? "",
          headingLevel: section?.headingLevel ?? "",
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-xl font-medium">Categories</Heading>
        <Button asChild size="sm">
          <Link href="/admin/skills/new">Add category</Link>
        </Button>
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
