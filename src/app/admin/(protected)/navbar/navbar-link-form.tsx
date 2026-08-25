"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { navbarLinkSchema, type NavbarLinkInput } from "@/lib/schemas/navbar-schema";

interface NavbarLinkFormProps {
  action: (prevState: unknown, data: NavbarLinkInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    name: string;
    href: string;
    iconClass: string;
    iconFontSizeClass: string | null;
  };
  submitLabel: string;
}

function NavbarLinkForm({ action, defaultValues, submitLabel }: NavbarLinkFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<NavbarLinkInput>({
    resolver: zodResolver(navbarLinkSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      href: defaultValues?.href ?? "",
      iconClass: defaultValues?.iconClass ?? "",
      iconFontSizeClass: defaultValues?.iconFontSizeClass ?? "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link (href)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon class</FormLabel>
              <FormControl>
                <Input placeholder="icon-home" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconFontSizeClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon font size class (optional)</FormLabel>
              <FormControl>
                <Input placeholder="text-3xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}

export default NavbarLinkForm;
