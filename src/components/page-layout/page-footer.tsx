interface PageFooterProps {
  children: React.ReactNode;
}

function PageFooter({ children }: PageFooterProps) {
  return <footer className="page-footer content-end pt-4">{children}</footer>;
}

export default PageFooter;
