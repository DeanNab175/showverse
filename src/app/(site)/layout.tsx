import PageLayout from "@/components/page-layout/page-layout";
import PageHeader from "@/components/page-layout/page-header";
import PageFooter from "@/components/page-layout/page-footer";
import PageContent from "@/components/page-layout/page-content";
import PageTransition from "@/components/page-transition";
import PageHeaderComponent from "@/components/page-header-component/page-header-component";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <PageTransition>
      <PageLayout>
        <PageHeader>
          <PageHeaderComponent />
        </PageHeader>
        <PageContent>{children}</PageContent>
        <PageFooter>Footer</PageFooter>
      </PageLayout>
    </PageTransition>
  );
}
