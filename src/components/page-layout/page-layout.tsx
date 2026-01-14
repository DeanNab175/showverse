import { forwardRef } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = forwardRef<HTMLElement, PageLayoutProps>(
  ({ children }, ref) => {
    return (
      <article
        ref={ref}
        className="shadow-[2px_20px_30px_rgba(0,0,0,0.15)] bg-accent-4/60 h-full rounded-[104px] px-16 py-14 grid grid-rows-[auto_1fr_auto]"
      >
        {children}
      </article>
    );
  }
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
