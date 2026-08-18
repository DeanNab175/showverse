import Image from "next/image";

import type { ProjectItemType } from "@/types/portfolio-data-types";

interface ProjectCardProps {
  project: ProjectItemType;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, thumbnail, previewUrl } = project;

  const previewUrlContent = previewUrl ? (
    <a
      href={previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Preview ${title}`}
      className="absolute top-3 right-3 flex items-center justify-center size-9 rounded-md bg-background text-body-txt shadow-card-sm"
    >
      <EyeIcon />
    </a>
  ) : (
    <span
      aria-hidden
      className="absolute top-3 right-3 flex items-center justify-center size-9 rounded-md bg-background text-body-txt shadow-card-sm"
    >
      <EyeIcon />
    </span>
  );

  return (
    <article className="project-item">
      <div className="grid aspect-3/2 rounded-xl">
        <div className="[grid-area:1/1] project-item__accent-shape bg-primary rounded-sm w-3/5 justify-self-end" />
        <div className="[grid-area:1/1] project-item__image-container relative w-[97%] h-[92%] self-center justify-self-start rounded-xl overflow-hidden bg-skills-card shadow-xs">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
          {previewUrlContent}
        </div>
      </div>

      <h3 className="project-item__heading font-medium text-base mt-4 mb-1">{title}</h3>
      <p className="project-item__details text-sm font-normal">{description}</p>
    </article>
  );
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default ProjectCard;
