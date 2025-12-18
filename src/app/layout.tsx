import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/context/transition-context";
import NavbarComponent from "@/components/navbar-component/navbar-component";

const mPlusRounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "ShowVerse",
  description: "Showcasing verse for your work.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${mPlusRounded.variable} antialiased`}>
        <TransitionProvider>
          <main className="container mx-auto">
            <div className="grid lg:grid-cols-9 xl:grid-cols-12 gap-4 h-full min-h-screen py-16">
              <div className="col-start-1 col-end-2">
                <NavbarComponent />
              </div>
              <div className="col-start-2 -col-end-1">
                <section className="h-full">{children}</section>
              </div>
            </div>
          </main>
        </TransitionProvider>
      </body>
    </html>
  );
}
