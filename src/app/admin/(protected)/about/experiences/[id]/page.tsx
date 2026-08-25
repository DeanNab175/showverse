import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit experience
      </Heading>
      <ExperienceForm
        action={boundAction}
        defaultValues={experience}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditExperiencePage;
