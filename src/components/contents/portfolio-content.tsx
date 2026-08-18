"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { isEmptyOrNullish } from "@/lib/utils";
import { useSectionAnimations } from "@/hooks/useSectionAnimations";
import type { PortfolioSectionType } from "@/types/portfolio-data-types";

import Heading from "../typography/heading";
import ProjectCard from "../portfolio/project-card";
import Pagination from "../portfolio/pagination";

interface PortfolioContentProps {
  data: PortfolioSectionType[];
  currentPage: number;
}

function PortfolioContent({ data, currentPage }: PortfolioContentProps) {
  const { sectionRef } = useSectionAnimations(data);
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number) => {
      router.push(page === 1 ? "/portfolio" : `/portfolio/${page}`, {
        scroll: false,
      });
    },
    [router],
  );

  return (
    <section ref={sectionRef} className="h-full">
      {data.map((section) => {
        if (isEmptyOrNullish(section.content)) return null;

        const { heading, projects } = section.content;
        if (!projects) return null;

        const perPage = projects.perPage ?? projects.list.length;
        const totalPages = Math.max(
          1,
          Math.ceil(projects.list.length / perPage),
        );
        const pageItems = projects.list.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage,
        );

        return (
          <article key={section.name} className={section.class}>
            {heading && (
              <Heading level={heading.level} className={heading.class}>
                {heading.text}
              </Heading>
            )}

            <div className={projects.wrapperClass}>
              {pageItems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </article>
        );
      })}
    </section>
  );
}

export default PortfolioContent;
