import "./globals.css";

import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

import { Providers } from "@/components/providers";

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

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
