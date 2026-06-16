import type { HeadingLevelType } from "./typography-types";

type HeadingType = {
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
  items: SkillItemType[];
};

export type ServiceItemType = {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
};

export type SkillsSectionType = {
  id: string;
  name: string;
  wrapperClass?: string;
  sectionClass?: string;
  content: {
    wrapperClass?: string;
    heading?: HeadingType;
    categories?: SkillCategoryType[];
    services?: ServiceItemType[];
  };
};
