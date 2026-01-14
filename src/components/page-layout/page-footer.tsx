interface PageFooterProps {
  children: React.ReactNode;
}

function PageFooter({ children }: PageFooterProps) {
  return <footer className="page-footer content-end">{children}</footer>;
}

export default PageFooter;
