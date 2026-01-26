"use client";

import PageTransition from "@/components/page-transition";
import TransitionProvider from "@/contexts/transition-context";

import PageHeader from "@/components/page-layout/page-header";
import PageFooter from "@/components/page-layout/page-footer";
import PageContent from "@/components/page-layout/page-content";
import PageHeaderNavbar from "@/components/page-header-navbar/page-header-navbar";
import FooterContact from "@/components/footer-component/footer-contact";
import FooterSocials from "@/components/footer-component/footer-socials";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <TransitionProvider>
      <PageTransition>
        <PageHeader>
          <PageHeaderNavbar />
        </PageHeader>
        <PageContent>{children}</PageContent>
        <PageFooter>
          <section className="flex items-center justify-between">
            <FooterContact />
            <FooterSocials />
          </section>
        </PageFooter>
      </PageTransition>
    </TransitionProvider>
  );
}
