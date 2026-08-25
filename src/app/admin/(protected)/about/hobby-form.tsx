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
import { hobbySchema, type HobbyInput } from "@/lib/schemas/about-schema";

interface HobbyFormProps {
  action: (prevState: unknown, data: HobbyInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    label: string;
    iconClass: string;
  };
  submitLabel: string;
}

function HobbyForm({ action, defaultValues, submitLabel }: HobbyFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<HobbyInput>({
    resolver: zodResolver(hobbySchema),
    defaultValues: {
      label: defaultValues?.label ?? "",
      iconClass: defaultValues?.iconClass ?? "",
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
                <Input placeholder="icon-game" {...field} />
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

export default HobbyForm;
