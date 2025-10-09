interface PageFooterProps {
  children: React.ReactNode;
}

function PageFooter({ children }: PageFooterProps) {
  return <footer>{children}</footer>;
}

export default PageFooter;
