import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  primary?: boolean;
  icon?: boolean;
  size?: "small" | "medium" | "large";
}

function Button({
  children,
  primary,
  icon,
  size = "medium",
  ...rest
}: ButtonProps) {
  const classes = clsx(
    rest.className,
    "cursor-pointer rounded-xl border-2 border-transparent",
    {
      "bg-primary text-secondary hover:bg-white hover:border-primary": primary,
      "p-1.5 hover:bg-primary/20": icon,
      // "text-sm": size === "small",
      "text-xs px-4 py-2.5": size === "medium" && !icon,
      // "text-lg": size === "large",
    }
  );
  return <button className={classes}>{children}</button>;
}

export default Button;
