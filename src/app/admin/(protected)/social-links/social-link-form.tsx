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
import { socialLinkSchema, type SocialLinkInput } from "@/lib/schemas/social-link-schema";

interface SocialLinkFormProps {
  action: (prevState: unknown, data: SocialLinkInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    name: string;
    href: string;
    iconClass: string;
    hoverColorClass: string | null;
  };
  submitLabel: string;
}

function SocialLinkForm({ action, defaultValues, submitLabel }: SocialLinkFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<SocialLinkInput>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      href: defaultValues?.href ?? "",
      iconClass: defaultValues?.iconClass ?? "",
      hoverColorClass: defaultValues?.hoverColorClass ?? "",
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
                <Input placeholder="icon-facebook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hoverColorClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hover color class (optional)</FormLabel>
              <FormControl>
                <Input placeholder="hover:text-facebook" {...field} />
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

export default SocialLinkForm;
