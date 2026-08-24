import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateService } from "../actions";
import ServiceForm from "../service-form";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) notFound();

  const boundAction = updateService.bind(null, id);

  return (
    <div>
      <Link href="/admin/services" className="text-sm hover:text-primary">
        &larr; Back to services
      </Link>
      <h1 className="text-lg font-medium mt-2 mb-4">Edit service</h1>
      <ServiceForm
        action={boundAction}
        defaultValues={service}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditServicePage;
