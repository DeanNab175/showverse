"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AnimationsJsonFields from "@/components/admin/animations-json-fields";
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
import { skillsCategoriesSectionSchema } from "@/lib/schemas/skill-category-schema";

import { updateSkillsCategoriesSection } from "./actions";

const formSchema = skillsCategoriesSectionSchema.extend({
  entryAnimationsJson: z.string(),
  scrollAnimationsJson: z.string(),
});

type FormValues = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

interface SectionFormProps {
  defaultValues: {
    headingText: string;
    headingLevel: number | "";
    entryAnimations: unknown;
    scrollAnimations: unknown;
  };
}

function SectionForm({ defaultValues }: SectionFormProps) {
  const [state, formAction, isActionPending] = useActionState(
    updateSkillsCategoriesSection,
    undefined
  );
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<FormValues, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headingText: defaultValues.headingText,
      headingLevel: defaultValues.headingLevel || undefined,
      entryAnimationsJson: JSON.stringify(defaultValues.entryAnimations ?? [], null, 2),
      scrollAnimationsJson: JSON.stringify(defaultValues.scrollAnimations ?? [], null, 2),
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md mb-8">
        <FormField
          control={form.control}
          name="headingText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headingLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading level (1-6)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  {...field}
                  value={(field.value as number | string | undefined) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AnimationsJsonFields />
        <p className="text-xs text-body-txt/60 -mt-2">
          These animations target categories by slug (e.g. &quot;#web-developer-category
          .category-item&quot;) - renaming a category&apos;s slug won&apos;t update these
          selectors automatically.
        </p>

        {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? "Saving..." : "Save section settings"}
        </Button>
      </form>
    </Form>
  );
}

export default SectionForm;
