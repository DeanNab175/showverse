import "./globals.css";

import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

import NavbarComponent from "@/components/navbar-component/navbar-component";
import { Providers } from "@/components/providers";
import { prisma } from "@/lib/prisma";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ShowVerse",
    default: "ShowVerse",
  },
  description:
    "Portfolio of Donald Smith — Freelance Web & UI/UX Designer who builds digital experiences that work beautifully and feel effortless.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const navbarLinks = await prisma.navbarLink.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${mPlusRounded.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <div className="main-content-shape bg-surface-bg fixed w-full h-full -z-[1]"></div>
          <main className="container mx-auto px-3 flex items-center min-h-dvh">
            <div className="grid gap-4 w-full h-[85vh] tall:h-[1040px] grid-rows-[1fr_auto] lg:grid-rows-none lg:grid-cols-9 xl:grid-cols-12">
              <div className="lg:col-start-1 lg:col-end-2">
                <NavbarComponent links={navbarLinks} />
              </div>
              <div className="row-start-1 lg:col-start-2 lg:-col-end-1 h-[inherit]">
                <section className="h-full">{children}</section>
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
