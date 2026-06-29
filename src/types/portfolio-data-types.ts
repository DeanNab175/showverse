import type { BaseSectionType } from "./common-types";

export type { HeadingType } from "./common-types";

export type ProjectItemType = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
};

type PortfolioSectionContent = {
  projects?: {
    wrapperClass?: string;
    perPage?: number;
    list: ProjectItemType[];
  };
};

export interface PortfolioSectionType
  extends BaseSectionType<PortfolioSectionContent> {
  class?: string;
}
