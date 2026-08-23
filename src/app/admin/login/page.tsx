"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Let NextAuth drive the redirect itself (default `redirect: true`)
    // rather than a manual redirect:false + router.push: that split the
    // sign-in from the navigation into two separate requests, and the
    // session cookie from the first wasn't reliably attached to the
    // second yet, occasionally bouncing straight back to this page.
    // A server-driven redirect is part of the same response chain, so
    // the cookie is guaranteed to be set before the next page loads.
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-page-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-surface-bg p-8 flex flex-col gap-4"
      >
        <h1 className="text-xl font-medium text-body-txt mb-2">Admin login</h1>

        <label className="flex flex-col gap-1 text-sm text-body-txt">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-page-bg px-3 py-2 text-body-txt outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-body-txt">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-page-bg px-3 py-2 text-body-txt outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>

        {error && (
          <p className="text-sm text-destructive">Invalid email or password.</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-primary text-button-primary-txt py-3 font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

export default AdminLoginPage;
