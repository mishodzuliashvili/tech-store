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
import toast from "react-hot-toast";
import { createProductSchema } from "@/lib/schemas/create-product-schema";
import createProduct from "@/actions/products/create-product";

export function CreateProductForm({
  allCategories,
}: {
  allCategories: Category[];
}) {
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      discount: 0,
      categoryId: 10,
      description: "",
      images: [],
      attributes: [],
    },
  });

  function onSubmit(values: z.infer<typeof createProductSchema>) {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await createProduct(values);
          form.reset();
          resolve("success");
        } catch (error) {
          reject(error);
        }
      }),
      {
        error: "Failed to create product",
        loading: "Creating product...",
        success: "Product created successfully",
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Of Prodcut</FormLabel>
              <FormControl>
                <Input placeholder="Apple macbook" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the product that will be displayed to the
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: Number(e.target.value) },
                    });
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the price of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: Number(e.target.value) },
                    });
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the discount of the product
              </FormDescription>
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
                <Input placeholder="This is a great product" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(v: any) => {
                  field.onChange({ target: { value: Number(v) } });
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
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
                This is the category of the category you are creating
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <div className="flex gap-3 flex-col items-start">
                  {field.value.map((image, index) => (
                    <div
                      key={index}
                      className="flex gap-2 w-full flex-col sm:flex-row"
                    >
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={field.value[index]}
                        onChange={(e) => {
                          field.onChange(
                            field.value.map((v, i) =>
                              i === index ? e.target.value : v
                            )
                          );
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      field.onChange([...field.value, ""]);
                    }}
                  >
                    Add Image
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                This is the images of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attributes</FormLabel>
              <FormControl>
                <div className="flex gap-3 flex-col items-start">
                  {field.value.map((attr, index) => (
                    <div
                      key={index}
                      className="flex gap-2 w-full flex-col sm:flex-row"
                    >
                      <Input
                        placeholder="Name"
                        value={attr.name}
                        onChange={(e) => {
                          field.onChange(
                            field.value.map((v, i) =>
                              i === index ? { ...v, name: e.target.value } : v
                            )
                          );
                        }}
                      />
                      <Input
                        key={index}
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) => {
                          field.onChange(
                            field.value.map((v, i) =>
                              i === index ? { ...v, value: e.target.value } : v
                            )
                          );
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Remove Attribute
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      field.onChange([
                        ...field.value,
                        {
                          name: "",
                          Value: "",
                        },
                      ]);
                    }}
                  >
                    Add Attribute
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                This is the attributes of the product
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
