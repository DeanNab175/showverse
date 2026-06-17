import Link from "next/link";

import TransitionProvider from "@/contexts/transition-context";
import PageTransition from "@/components/page-transition";
import PageHeader from "@/components/page-layout/page-header";
import PageContent from "@/components/page-layout/page-content";
import PageFooter from "@/components/page-layout/page-footer";
import PageHeaderNavbar from "@/components/page-header-navbar/page-header-navbar";
import FooterContact from "@/components/footer-component/footer-contact";
import FooterSocials from "@/components/footer-component/footer-socials";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <TransitionProvider>
      <PageTransition>
        <PageHeader>
          <PageHeaderNavbar />
        </PageHeader>
        <PageContent>
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <p className="text-8xl font-800">404</p>
            <p className="text-xl font-medium">Page not found</p>
            <p className="text-sm text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Go home</Link>
            </Button>
          </div>
        </PageContent>
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
