interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <header className="page-header">{children}</header>;
}

export default PageHeader;
