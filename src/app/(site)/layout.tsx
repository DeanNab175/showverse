import PageTransition from "@/components/page-transition";
import TransitionProvider from "@/contexts/transition-context";

import PageHeader from "@/components/page-layout/page-header";
import PageFooter from "@/components/page-layout/page-footer";
import PageContent from "@/components/page-layout/page-content";
import PageHeaderNavbar from "@/components/page-header-navbar/page-header-navbar";
import FooterContact from "@/components/footer-component/footer-contact";
import FooterSocials from "@/components/footer-component/footer-socials";
import NavbarComponent from "@/components/navbar-component/navbar-component";
import { prisma } from "@/lib/prisma";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const navbarLinks = await prisma.navbarLink.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <div className="main-content-shape bg-surface-bg fixed w-full h-full -z-[1]"></div>
      {/* site-scope confines the CMS-editable text colours to the public site so
          they can never make the admin unreadable; text-body-txt is required
          here so this element resolves the scoped value and children inherit it. */}
      <main className="site-scope text-body-txt container mx-auto px-3 flex items-center min-h-dvh">
        <div className="grid gap-4 w-full h-[85vh] tall:h-[1040px] grid-rows-[1fr_auto] lg:grid-rows-none lg:grid-cols-9 xl:grid-cols-12">
          <div className="lg:col-start-1 lg:col-end-2">
            <NavbarComponent links={navbarLinks} />
          </div>
          <div className="row-start-1 lg:col-start-2 lg:-col-end-1 h-[inherit]">
            <section className="h-full">
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
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
