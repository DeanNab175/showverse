import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "w-full min-w-0 rounded-lg px-3 py-2 text-sm outline-none transition-colors placeholder:text-body-txt/60 focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
  {
    variants: {
      surface: {
        default: "bg-surface-bg",
        nested: "bg-page-bg",
      },
    },
    defaultVariants: {
      surface: "default",
    },
  }
);

function Textarea({
  className,
  surface,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ surface, className }))}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
