"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

function SignOutButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      Sign out
    </Button>
  );
}

export default SignOutButton;
