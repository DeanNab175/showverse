import { AboutSectionType } from "@/types/about-data-types";

import ImageOnLeftSection from "./image-on-left-section";
import BannerSection from "./banner-section";

interface AboutSectionProps {
  section: AboutSectionType;
}

export default function AboutSection({ section }: AboutSectionProps) {
  switch (section.type) {
    case "image-on-left":
      return <ImageOnLeftSection section={section} />;
    case "banner":
      return <BannerSection section={section} />;
    default:
      return null;
  }
}
