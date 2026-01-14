interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return <main className="page-content">{children}</main>;
}

export default PageContent;
