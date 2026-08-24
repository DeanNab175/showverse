import { notFound } from "next/navigation";

import PortfolioContent from "@/components/contents/portfolio-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import { prisma } from "@/lib/prisma";
import { mapPortfolioSection } from "@/lib/mappers/portfolio-mapper";

export async function generateMetadata() {
  return getPageMetadata("portfolio");
}

function getTotalPages(portfolioData: ReturnType<typeof mapPortfolioSection>[]) {
  return Math.max(
    1,
    ...portfolioData
      .map((section) => section.content.projects)
      .filter((projects) => !!projects)
      .map((projects) =>
        Math.ceil(projects.list.length / (projects.perPage ?? projects.list.length)),
      ),
  );
}

interface PortfolioPageProps {
  params: Promise<{ page?: string[] }>;
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { page: pageSegments } = await params;

  if (pageSegments && pageSegments.length > 1) notFound();

  const page = pageSegments ? Number(pageSegments[0]) : 1;

  const row = await prisma.portfolioSection.findUnique({
    where: { id: "portfolio_singleton" },
    include: { projects: { orderBy: { sortOrder: "asc" } } },
  });
  const portfolioData = [mapPortfolioSection(row)];

  const totalPages = getTotalPages(portfolioData);

  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  return <PortfolioContent data={portfolioData} currentPage={page} />;
}
