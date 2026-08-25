import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

import { updateProject } from "../actions";
import ProjectForm from "../project-form";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  const boundAction = updateProject.bind(null, id);

  return (
    <div>
      <Link href="/admin/portfolio" className="text-sm hover:text-primary">
        &larr; Back to portfolio
      </Link>
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit project
      </Heading>
      <ProjectForm
        action={boundAction}
        defaultValues={project}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditProjectPage;
