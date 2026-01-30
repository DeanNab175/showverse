interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return (
    <main className="page-content overflow-y-auto overflow-x-hidden min-h-0">
      {children}
    </main>
  );
}

export default PageContent;
