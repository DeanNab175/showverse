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
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/schemas/settings-schema";

import { updateSiteSettings } from "./actions";

interface SettingsFormProps {
  defaultContactEmail: string;
}

function SettingsForm({ defaultContactEmail }: SettingsFormProps) {
  const [state, formAction, isActionPending] = useActionState(updateSiteSettings, undefined);
  const [isDispatching, startTransition] = useTransition();
  const form = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      contactEmail: defaultContactEmail,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });
  const isPending = isActionPending || isDispatching;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
