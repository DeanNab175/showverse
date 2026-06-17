import type { BaseSectionType } from "./common-types";

export type { HeadingType } from "./common-types";

export type SkillItemType = {
  name: string;
  iconPath: string;
};

export type SkillCategoryType = {
  label: {
    text: string;
    class: string;
  };
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

type SkillsSectionContent = {
  categories?: SkillCategoryType[];
  services?: {
    wrapperClass?: string;
    list: ServiceItemType[];
  };
};

export interface SkillsSectionType extends BaseSectionType<SkillsSectionContent> {
  class?: string;
}
