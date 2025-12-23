interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="page-header row-span-1 row-start-1">{children}</header>
  );
}

export default PageHeader;
