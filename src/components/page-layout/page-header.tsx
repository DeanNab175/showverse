interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <header>{children}</header>;
}

export default PageHeader;
