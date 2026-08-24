import Link from "next/link";

import { createSkillItem } from "../../../actions";
import ItemForm from "../../../item-form";

interface NewSkillItemPageProps {
  params: Promise<{ id: string }>;
}

async function NewSkillItemPage({ params }: NewSkillItemPageProps) {
  const { id } = await params;
  const boundAction = createSkillItem.bind(null, id);

  return (
    <div>
      <Link href={`/admin/skills/${id}`} className="text-sm hover:text-primary">
        &larr; Back to category
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Add item</h1>
      <ItemForm action={boundAction} submitLabel="Create" />
    </div>
  );
}

export default NewSkillItemPage;
