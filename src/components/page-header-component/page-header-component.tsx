"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function PageHeaderComponent() {
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
        >
          <i className="text-xl icon-moon"></i>
        </Button>
        <Button asChild>
          <Link href="/contact" className="menu-nav-link">
            Contact me
            <span className="text-sm">
              <i className="icon-send font-bold"></i>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default PageHeaderComponent;
