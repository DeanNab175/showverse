import SkillsContent from "@/components/contents/skills-content";
import pagesMetadata from "@/constants/data/metadata";
import skillsData from "@/constants/data/skills";

export const metadata = pagesMetadata.skills;

export default function SkillsPage() {
  return <SkillsContent data={skillsData} />;
}
