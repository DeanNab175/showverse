interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return (
    <main className="page-content overflow-y-auto min-h-0">{children}</main>
  );
}

export default PageContent;
