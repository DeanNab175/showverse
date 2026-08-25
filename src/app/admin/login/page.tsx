"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/typography/heading";

interface LoginFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = form.handleSubmit(async (data) => {
    // Let NextAuth drive the redirect itself (default `redirect: true`)
    // rather than a manual redirect:false + router.push: that split the
    // sign-in from the navigation into two separate requests, and the
    // session cookie from the first wasn't reliably attached to the
    // second yet, occasionally bouncing straight back to this page.
    // A server-driven redirect is part of the same response chain, so
    // the cookie is guaranteed to be set before the next page loads.
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/admin",
    });
  });

  return (
    <div className="min-h-dvh flex items-center justify-center bg-page-bg px-4">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-2xl bg-surface-bg p-8 flex flex-col gap-4"
        >
          <Heading level={1} className="text-2xl font-extrabold text-primary mb-2">
            Admin login
          </Heading>

          <FormField
            control={form.control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" surface="nested" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-sm text-destructive">Invalid email or password.</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
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
