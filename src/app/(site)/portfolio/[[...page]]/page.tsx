import { notFound } from "next/navigation";

import PortfolioContent from "@/components/contents/portfolio-content";
import pagesMetadata from "@/constants/data/metadata";
import portfolioData from "@/constants/data/portfolio";

export const metadata = pagesMetadata.portfolio;

function getTotalPages() {
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
  const totalPages = getTotalPages();

  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  return <PortfolioContent data={portfolioData} currentPage={page} />;
}
