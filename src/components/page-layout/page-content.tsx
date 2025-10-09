interface PageContentProps {
  children: React.ReactNode;
}

function PageContent({ children }: PageContentProps) {
  return <main>{children}</main>;
}

export default PageContent;
