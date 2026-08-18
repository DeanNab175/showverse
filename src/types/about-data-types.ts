import type { ButtonVariant } from "@/components/ui/button";
import type { ExperienceType } from "./experience-types";
import type { BaseSectionType, HeadingType, ImageType } from "./common-types";

type SectionType = "image-on-left" | "banner";

type ExperienceLayoutType = {
  wrapperClass?: string;
  list: ExperienceType[];
};

type HobbyLayoutType = {
  heading?: HeadingType;
  list?: HobbyItemType[];
};

type AboutSectionContent = {
  paragraphs?: {
    body: string[];
    class?: string;
  };
  experiences?: ExperienceLayoutType;
  hobby?: HobbyLayoutType;
  cta?: {
    label: string;
    variant?: ButtonVariant;
    iconClass?: string;
    wrapperClass?: string;
  };
};

export interface AboutSectionType extends BaseSectionType<AboutSectionContent> {
  type: SectionType;
  image?: ImageType;
  contentClass?: string;
  ctaWrapperClass?: string;
}
