import PortfolioContent from "@/components/contents/portfolio-content";
import pagesMetadata from "@/constants/data/metadata";
import portfolioData from "@/constants/data/portfolio";

export const metadata = pagesMetadata.portfolio;

export default function PortfolioPage() {
  return <PortfolioContent data={portfolioData} />;
}
