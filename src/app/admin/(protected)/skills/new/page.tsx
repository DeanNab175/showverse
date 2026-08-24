import Link from "next/link";

import { createSkillCategory } from "../actions";
import CategoryForm from "../category-form";

function NewSkillCategoryPage() {
  return (
    <div>
      <Link href="/admin/skills" className="text-sm hover:text-primary">
        &larr; Back to skills
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add category</h1>
      <CategoryForm action={createSkillCategory} submitLabel="Create" />
    </div>
  );
}

export default NewSkillCategoryPage;
