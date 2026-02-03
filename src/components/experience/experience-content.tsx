import { ExperienceType } from "@/types/experience-types";
import ExperienceCard from "./experience-card";

interface ExperienceContentProps {
  experiences: ExperienceType[];
}

function ExperienceContent({ experiences }: ExperienceContentProps) {
  if (!experiences) return;

  return (
    <section className="experiences flex flex-wrap gap-5">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </section>
  );
}

export default ExperienceContent;
