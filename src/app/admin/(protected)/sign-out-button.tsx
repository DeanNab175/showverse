"use client";

import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm hover:text-primary"
    >
      Sign out
    </button>
  );
}

export default SignOutButton;
