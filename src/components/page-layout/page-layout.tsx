interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <article className="border border-gray-200 h-full rounded-[104px] px-16 py-14">
      {children}
    </article>
  );
}

export default PageLayout;
