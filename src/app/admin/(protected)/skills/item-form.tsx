"use client";

import { useActionState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUploadField from "@/components/admin/image-upload-field";
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
import { skillItemSchema, type SkillItemInput } from "@/lib/schemas/skill-category-schema";

interface ItemFormProps {
  action: (prevState: unknown, data: SkillItemInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    name: string;
    iconUrl: string;
  };
  submitLabel: string;
}

function ItemForm({ action, defaultValues, submitLabel }: ItemFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<SkillItemInput>({
    resolver: zodResolver(skillItemSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      iconUrl: defaultValues?.iconUrl ?? "",
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
                <Input placeholder="React" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="iconUrl"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <ImageUploadField
                label="Icon"
                value={field.value}
                onChange={field.onChange}
                folder="skill-icons"
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
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

export default ItemForm;
