import type { ButtonVariant } from "@/components/ui/button";
import type { ExperienceType } from "./experience-types";
import type {
  EntryAnimationType,
  ScrollAnimationType,
} from "./animations-types";
import type { BaseSectionType, HeadingType } from "./common-types";

type SectionType = "image-on-left" | "banner";

type ImageType = {
  wrapperId?: string;
  wrapperClass?: string;
  isIllustration: boolean;
  illustration: {
    class?: string;
    html: string;
  };
  path: string;
};

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
