import Link from "next/link";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/delete-button";

import { deleteProject } from "./actions";
import SectionForm from "./section-form";

async function PortfolioAdminPage() {
  const section = await prisma.portfolioSection.findUnique({
    where: { id: "portfolio_singleton" },
    include: { projects: { orderBy: { sortOrder: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Portfolio</h1>

      <SectionForm
        defaultValues={{
          headingText: section?.headingText ?? "",
          headingLevel: section?.headingLevel ?? "",
          perPage: section?.perPage ?? 6,
          entryAnimations: section?.entryAnimations,
          scrollAnimations: section?.scrollAnimations,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium">Projects</h2>
        <Link
          href="/admin/portfolio/new"
          className="rounded-lg bg-primary text-button-primary-txt px-4 py-2 text-sm font-medium"
        >
          Add project
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {(section?.projects ?? []).map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-lg bg-surface-bg px-4 py-3"
          >
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnailUrl}
                alt=""
                className="h-10 w-16 rounded-md object-cover bg-page-bg"
              />
              <span className="font-medium">{project.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/portfolio/${project.id}`}
                className="text-sm hover:text-primary"
              >
                Edit
              </Link>
              <DeleteButton
                action={deleteProject.bind(null, project.id)}
                confirmMessage={`Delete "${project.title}"?`}
              />
            </div>
          </div>
        ))}
        {(section?.projects ?? []).length === 0 && (
          <p className="text-sm text-body-txt/60">No projects yet.</p>
        )}
      </div>
    </div>
  );
}

export default PortfolioAdminPage;
