import { ExperienceType } from "@/types/experience-types";

interface ExperienceCardProps {
  experience: ExperienceType;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div
      key={experience.description}
      className="experience-card aspect-square bg-white shadow-2xl rounded-lg p-1 text-center"
    >
      <p className="experience-total text-sm font-medium">
        {experience.total}+
      </p>
      <p className="experience-description text-tiny font-light leading-tight">
        {experience.description}
      </p>
    </div>
  );
}

export default ExperienceCard;
