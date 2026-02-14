import type { ButtonVariant } from "@/components/ui/button";
import { ExperienceType } from "./experience-types";
import type { HeadingLevelType } from "./typography-types";

type HeadingType = {
  class?: string;
  text: string;
  level: HeadingLevelType;
};

type ImageType = {
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
  name: string;
  type: "image-on-left" | "banner";
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
};
