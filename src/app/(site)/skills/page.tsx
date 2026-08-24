import SkillsContent from "@/components/contents/skills-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import skillsData from "@/constants/data/skills";

export async function generateMetadata() {
  return getPageMetadata("skills");
}

export default function SkillsPage() {
  return <SkillsContent data={skillsData} />;
}
