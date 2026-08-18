import type { BaseSectionType } from "./common-types";

export type { HeadingType } from "./common-types";

type SectionType = "skill-categories" | "service-grid";

export type SkillItemType = {
  name: string;
  iconPath: string;
};

export type SkillCategoryType = {
  id: string;
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
  type: SectionType;
  class?: string;
}
