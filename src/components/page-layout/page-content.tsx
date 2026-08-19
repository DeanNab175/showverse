"use client";

import { useRef } from "react";

import ScrollHint from "./scroll-hint";

interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  const scrollerRef = useRef<HTMLElement | null>(null);

  return (
    <div className="relative h-full min-h-0">
      <main
        ref={scrollerRef}
        className="page-content h-full overflow-y-auto overflow-x-hidden min-h-0"
      >
        {children}
      </main>
      <ScrollHint scrollerRef={scrollerRef} />
    </div>
  );
}

export default PageContent;
