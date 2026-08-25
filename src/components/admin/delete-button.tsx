"use client";

import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
}

function DeleteButton({ action, confirmMessage }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
        Delete
      </Button>
    </form>
  );
}

export default DeleteButton;
