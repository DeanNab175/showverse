import { EntryAnimationType, ScrollAnimationType } from "./animations-types";
import type { HeadingLevelType } from "./typography-types";

export type HeadingType = {
  class?: string;
  text: string;
  level: HeadingLevelType;
};

export type ImageType = {
  wrapperId?: string;
  wrapperClass?: string;
  isIllustration: boolean;
  illustration: {
    class?: string;
    html: string;
  };
  path: string;
};

export type BaseSectionType<TContent extends object = object> = {
  id: string;
  name: string;
  wrapperClass?: string;
  sectionClass?: string;
  content: {
    wrapperClass?: string;
    heading?: HeadingType;
  } & TContent;
  entryAnimations?: EntryAnimationType[];
  scrollAnimations?: ScrollAnimationType[];
};
