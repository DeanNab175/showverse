import PageLayout from "@/components/page-layout/page-layout";
import PageHeader from "@/components/page-layout/page-header";
import PageFooter from "@/components/page-layout/page-footer";
import PageContent from "@/components/page-layout/page-content";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <PageLayout>
      <PageHeader>Header</PageHeader>
      <PageContent>{children}</PageContent>
      <PageFooter>Footer</PageFooter>
    </PageLayout>
  );
}
