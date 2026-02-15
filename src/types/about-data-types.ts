import type { ButtonVariant } from "@/components/ui/button";
import type { ExperienceType } from "./experience-types";
import type { HeadingLevelType } from "./typography-types";
import type {
  EntryAnimationType,
  ScrollAnimationType,
} from "./animations-types";

type SectionType = "image-on-left" | "banner";

type HeadingType = {
  class?: string;
  text: string;
  level: HeadingLevelType;
};

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

export type AboutSectionType = {
  id: string;
  name: string;
  type: SectionType;
  wrapperClass?: string;
  sectionClass?: string;
  image?: ImageType;
  contentClass?: string;
  ctaWrapperClass?: string;
  content: {
    wrapperClass?: string;
    heading?: HeadingType;
    // title?: string;
    // titleClass?: string;
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
  entryAnimations?: EntryAnimationType[];
  scrollAnimations?: ScrollAnimationType[];
};
