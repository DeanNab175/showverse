import HomeContent from "@/components/contents/home-content";
import { getPageMetadata } from "@/lib/get-page-metadata";
import homeData from "@/constants/data/home";

export async function generateMetadata() {
  return getPageMetadata("home");
}

export default function HomePage() {
  return <HomeContent data={homeData} />;
}
