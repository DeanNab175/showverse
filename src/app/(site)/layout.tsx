"use client";

import { usePathname, useRouter } from "next/navigation";
import PageLayout from "@/components/page-layout/page-layout";
import PageHeader from "@/components/page-layout/page-header";
import PageFooter from "@/components/page-layout/page-footer";
import PageContent from "@/components/page-layout/page-content";
// import PageTransition from "@/components/page-transition";
import PageHeaderComponent from "@/components/page-header-component/page-header-component";
import Transition from "@/components/transition/transition";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  console.log("Current path:", pathname);

  return (
    <Transition>
      <PageLayout key={pathname}>
        <PageHeader>
          <PageHeaderComponent />
        </PageHeader>
        <PageContent>{children}</PageContent>
        <PageFooter>Footer</PageFooter>
      </PageLayout>
    </Transition>
  );
}
