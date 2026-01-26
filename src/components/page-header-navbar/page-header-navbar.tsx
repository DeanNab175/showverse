"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";

function PageHeaderNavbar() {
  console.log("PageHeaderNavbar rendering, about to call useTheme");
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="flex justify-between items-center pb-4">
      <div className="logo">
        <h1 className="text-lg">
          Show<span className="text-primary font-bold">Verse</span>
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          size="icon"
          variant="ghost"
          className="flex items-center justify-center"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <i className="icon-moon"></i>
          ) : (
            <i className="icon-sun"></i>
          )}
        </Button>
        <Button asChild>
          <Link href="/contact" className="menu-nav-link">
            Contact me
            <span className="text-base">
              <i className="icon-send"></i>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default PageHeaderNavbar;
