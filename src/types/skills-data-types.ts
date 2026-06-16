import type { HeadingLevelType } from "./typography-types";

export type HeadingType = {
  class?: string;
  text: string;
  level: HeadingLevelType;
};

export type SkillItemType = {
  name: string;
  iconPath: string;
};

export type SkillCategoryType = {
  label: string;
  labelClass?: string;
  items: {
    wrapperClass?: string;
    list: SkillItemType[];
  };
};

export type ServiceItemType = {
  iconClass: string;
  title: string;
  description: string;
};

export type SkillsSectionType = {
  id: string;
  name: string;
  class?: string;
  wrapperClass?: string;
  sectionClass?: string;
  content: {
    wrapperClass?: string;
    heading?: HeadingType;
    categories?: SkillCategoryType[];
    services?: {
      wrapperClass?: string;
      list: ServiceItemType[];
    };
  };
};
