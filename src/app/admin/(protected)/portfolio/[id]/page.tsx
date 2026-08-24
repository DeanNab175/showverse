import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

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
      <h1 className="text-lg font-medium mt-2 mb-4">Edit project</h1>
      <ProjectForm
        action={boundAction}
        defaultValues={project}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditProjectPage;
