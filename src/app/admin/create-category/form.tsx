"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCategorySchema } from "@/lib/schemas/create-category-schema";
import toast from "react-hot-toast";
import createCategory from "@/actions/categories/create-category";

export function CreateCategoryForm({
  allCategories,
}: {
  allCategories: Category[];
}) {
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      parentCategoryId: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof createCategorySchema>) {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await createCategory(values);
          form.reset();
          resolve("Category created successfully");
        } catch (error) {
          reject(error);
        }
      }),
      {
        error: "Failed to create category",
        loading: "Creating category...",
        success: "Category created successfully",
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Of Category</FormLabel>
              <FormControl>
                <Input placeholder="Notebooks" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the category that will be displayed to the
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* select of parent category */}
        <FormField
          control={form.control}
          name="parentCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category</FormLabel>
              <Select
                onValueChange={(v: any) => {
                  field.onChange({ target: { value: Number(v) } });
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the parent category of the category you are creating
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
