import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit hobby
      </Heading>
      <HobbyForm action={boundAction} defaultValues={hobby} submitLabel="Save changes" />
    </div>
  );
}

export default EditHobbyPage;
