import { HeadingType } from "@/types/skills-data-types";
import Heading from "../typography/heading";

interface SectionHeadingProps {
  heading?: HeadingType;
}

function SectionHeading({ heading }: SectionHeadingProps) {
  if (!heading) return null;
  return (
    <Heading level={heading.level} className={heading.class}>
      {heading.text}
    </Heading>
  );
}

export default SectionHeading;
