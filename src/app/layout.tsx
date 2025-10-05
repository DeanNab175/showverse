import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mPlusRounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
