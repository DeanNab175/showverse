import AboutContent from "@/components/contents/about-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import { prisma } from "@/lib/prisma";
import { mapAboutIntroSection, mapAboutHireBannerSection } from "@/lib/mappers/about-mapper";

export async function generateMetadata() {
  return getPageMetadata("about");
}

export default async function AboutPage() {
  const [introRow, bannerRow] = await Promise.all([
    prisma.aboutIntroSection.findUnique({
      where: { id: "about_intro_singleton" },
      include: { image: true, experiences: true, hobbies: true },
    }),
    prisma.aboutHireBannerSection.findUnique({
      where: { id: "about_hire_banner_singleton" },
    }),
  ]);

  const aboutData = [
    mapAboutIntroSection(introRow),
    mapAboutHireBannerSection(bannerRow),
  ].filter((section) => section !== null);

  return <AboutContent data={aboutData} />;
}
