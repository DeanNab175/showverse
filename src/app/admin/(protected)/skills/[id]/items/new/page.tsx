import Link from "next/link";

import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Add item
      </Heading>
      <ItemForm action={boundAction} submitLabel="Create" />
    </div>
  );
}

export default NewSkillItemPage;
