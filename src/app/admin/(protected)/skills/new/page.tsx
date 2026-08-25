import Link from "next/link";

import Heading from "@/components/typography/heading";

import { createSkillCategory } from "../actions";
import CategoryForm from "../category-form";

function NewSkillCategoryPage() {
  return (
    <div>
      <Link href="/admin/skills" className="text-sm hover:text-primary">
        &larr; Back to skills
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add category
      </Heading>
      <CategoryForm action={createSkillCategory} submitLabel="Create" />
    </div>
  );
}

export default NewSkillCategoryPage;
