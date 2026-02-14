import type { HeadingLevelType } from "@/types/typography-types";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level: HeadingLevelType;
}

function Heading({ children, level = 2, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag {...rest}>{children}</Tag>;
}

export default Heading;
