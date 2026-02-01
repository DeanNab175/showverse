import { ExperienceType } from "@/types/experience-types";
import ExperienceCard from "./experience-card";

interface ExperienceContentProps {
  experiences: ExperienceType[];
}

function ExperienceContent({ experiences }: ExperienceContentProps) {
  return (
    <div className="experiences w-4/5 grid grid-cols-3 gap-4">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.description} experience={experience} />
      ))}
    </div>
  );
}

export default ExperienceContent;
