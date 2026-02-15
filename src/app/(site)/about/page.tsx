import AboutContent from "@/components/contents/about-content";
import aboutData from "@/constants/data/about";
import { EntryAnimationType } from "@/types/animations-types";

// Extract and flatten all entry animations from aboutData
// const entryAnimationsConfig: EntryAnimationType[] = aboutData.flatMap(
//   (section) => section.entryAnimations || []
// );

// const scrollAnimationsConfig = aboutData.flatMap(
//   (section) => section.scrollAnimations || []
// );

export default function AboutPage() {
  return <AboutContent data={aboutData} />;
}
