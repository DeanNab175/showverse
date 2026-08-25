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
import { skillCategorySchema, type SkillCategoryInput } from "@/lib/schemas/skill-category-schema";

interface CategoryFormProps {
  action: (prevState: unknown, data: SkillCategoryInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    slug: string;
    labelText: string;
    labelClass: string | null;
    itemsWrapperClass: string | null;
  };
  submitLabel: string;
}

function CategoryForm({ action, defaultValues, submitLabel }: CategoryFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<SkillCategoryInput>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: {
      slug: defaultValues?.slug ?? "",
      labelText: defaultValues?.labelText ?? "",
      labelClass: defaultValues?.labelClass ?? "",
      itemsWrapperClass: defaultValues?.itemsWrapperClass ?? "",
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
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Slug (used as this category&apos;s DOM id - see note above about
                animation selectors)
              </FormLabel>
              <FormControl>
                <Input placeholder="web-developer-category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Web developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label class (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemsWrapperClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items wrapper class (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
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

export default CategoryForm;
