interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return <main className="row-start-2 -row-end-2">{children}</main>;
}

export default PageContent;
