import type { BaseSectionType, ImageType } from "./common-types";

type ViewPageLinkType = {
  url: string;
  text: string;
};

type HomeSectionContent = {
  greetMessage: string;
  name: string;
  jobTitle: string;
  shortDescription: string;
  viewPage: ViewPageLinkType[];
};

export interface HomeSectionType extends BaseSectionType<HomeSectionContent> {
  image?: ImageType;
}
