"use client";

import { useActionState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageUploadField from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { projectSchema, type ProjectInput } from "@/lib/schemas/project-schema";

interface ProjectFormProps {
  action: (prevState: unknown, data: ProjectInput) => Promise<{ error?: string } | undefined>;
  defaultValues?: {
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    previewUrl: string | null;
  };
  submitLabel: string;
}

function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      slug: defaultValues?.slug ?? "",
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      thumbnailUrl: defaultValues?.thumbnailUrl ?? "",
      previewUrl: defaultValues?.previewUrl ?? "",
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
              <FormLabel>Slug (used as its identifier - lowercase, hyphens)</FormLabel>
              <FormControl>
                <Input placeholder="my-project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="thumbnailUrl"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <ImageUploadField
                label="Thumbnail"
                value={field.value}
                onChange={field.onChange}
                folder="portfolio"
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="previewUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preview link (optional)</FormLabel>
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

export default ProjectForm;
