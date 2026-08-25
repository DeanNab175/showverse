import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import Heading from "@/components/typography/heading";

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
      <Heading level={1} className="text-2xl font-extrabold text-primary mt-2 mb-4">
        Edit service
      </Heading>
      <ServiceForm
        action={boundAction}
        defaultValues={service}
        submitLabel="Save changes"
      />
    </div>
  );
}

export default EditServicePage;
