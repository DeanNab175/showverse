import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateHobby } from "../../actions";
import HobbyForm from "../../hobby-form";

interface EditHobbyPageProps {
  params: Promise<{ id: string }>;
}

async function EditHobbyPage({ params }: EditHobbyPageProps) {
  const { id } = await params;
  const hobby = await prisma.hobby.findUnique({ where: { id } });

  if (!hobby) notFound();

  const boundAction = updateHobby.bind(null, id);

  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit hobby</h1>
      <HobbyForm action={boundAction} defaultValues={hobby} submitLabel="Save changes" />
    </div>
  );
}

export default EditHobbyPage;
