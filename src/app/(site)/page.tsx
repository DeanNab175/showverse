import HomeContent from "@/components/contents/home-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import { prisma } from "@/lib/prisma";
import { mapHomeSection } from "@/lib/mappers/home-mapper";

export async function generateMetadata() {
  return getPageMetadata("home");
}

export default async function HomePage() {
  const row = await prisma.homeSection.findUnique({
    where: { id: "home_singleton" },
    include: { image: true },
  });
  const homeData = mapHomeSection(row);

  return <HomeContent data={homeData} />;
}
