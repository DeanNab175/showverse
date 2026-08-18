import HomeContent from "@/components/contents/home-content";
import pagesMetadata from "@/constants/data/metadata";
import homeData from "@/constants/data/home";

export const metadata = pagesMetadata.home;

export default function HomePage() {
  return <HomeContent data={homeData} />;
}
