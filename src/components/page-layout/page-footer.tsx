interface PageFooterProps {
  children: React.ReactNode;
}

function PageFooter({ children }: PageFooterProps) {
  return (
    <footer className="page-footer row-span-1 -row-end-1">{children}</footer>
  );
}

export default PageFooter;
