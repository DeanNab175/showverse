"use client";

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
      <button type="submit" className="text-sm text-destructive hover:underline">
        Delete
      </button>
    </form>
  );
}

export default DeleteButton;
