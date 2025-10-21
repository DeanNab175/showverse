interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <header className="row-span-1 row-start-1">{children}</header>;
}

export default PageHeader;
