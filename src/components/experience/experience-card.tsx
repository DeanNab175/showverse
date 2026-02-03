import { ExperienceType } from "@/types/experience-types";

interface ExperienceCardProps {
  experience: ExperienceType;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article
      key={experience.description}
      className="experience-card w-20 bg-background shadow-card-sm rounded-xl-plus p-3 text-center text-body-txt"
    >
      <p className="experience-total text-sm font-medium mb-1">
        {experience.total}+
      </p>
      <p className="experience-description text-tiny font-light leading-tight">
        {experience.description}
      </p>
    </article>
  );
}

export default ExperienceCard;
