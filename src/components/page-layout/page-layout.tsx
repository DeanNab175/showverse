import { forwardRef } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = forwardRef<HTMLElement, PageLayoutProps>(
  ({ children }, ref) => {
    return (
      <article
        ref={ref}
        className="border border-gray-200 h-full rounded-[104px] px-16 py-14 grid grid-flow-col grid-rows-9"
      >
        {children}
      </article>
    );
  }
);

PageLayout.displayName = "PageLayout";

export default PageLayout;
