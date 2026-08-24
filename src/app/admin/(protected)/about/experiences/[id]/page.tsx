import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateExperience } from "../../actions";
import ExperienceForm from "../../experience-form";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) notFound();

  const boundAction = updateExperience.bind(null, id);

  return (
    <div>
      <Link href="/admin/about" className="text-sm hover:text-primary">
        &larr; Back to about
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit experience</h1>
      <ExperienceForm
        action={boundAction}
        defaultValues={experience}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditExperiencePage;
