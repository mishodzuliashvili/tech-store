"use server";

import db from "@/lib/db";
import { createCategorySchema } from "@/lib/schemas/create-category-schema";
import { Category } from "@prisma/client";
import { z } from "zod";

export default async function createCategory(
  values: z.infer<typeof createCategorySchema>
): Promise<ServiceResponse<Category>> {
  try {
    createCategorySchema.parse(values);
    const result = await db.category.create({
      data: {
        name: values.name,
        parentCategoryId: values.parentCategoryId || null,
      },
    });
    return {
      data: result,
      message: "Category created",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Category not created",
    };
  }
}
