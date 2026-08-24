import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";

import { deleteService } from "./actions";
import SectionForm from "./section-form";

async function ServicesPage() {
  const section = await prisma.skillsServicesSection.findUnique({
    where: { id: "services_singleton" },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Services</h1>

      <SectionForm
        defaultValues={{
          headingText: section?.headingText ?? "",
          headingLevel: section?.headingLevel ?? "",
          servicesWrapperClass: section?.servicesWrapperClass ?? "",
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium">Service items</h2>
        <Link
          href="/admin/services/new"
          className="rounded-lg bg-primary text-button-primary-txt px-4 py-2 text-sm font-medium"
        >
          Add service
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {(section?.services ?? []).map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <i className={`${service.iconClass} text-xl`} />
              <span className="font-medium">{service.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/services/${service.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteService.bind(null, service.id)}
                confirmMessage={`Delete "${service.title}"?`}
              />
            </div>
          </div>
        ))}
        {(section?.services ?? []).length === 0 && (
          <p className="text-sm text-body-txt/60">No services yet.</p>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
