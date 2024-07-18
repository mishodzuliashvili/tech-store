"use server";

import db from "@/lib/db";
import { createProductSchema } from "@/lib/schemas/create-product-schema";
import { Product } from "@prisma/client";
import { z } from "zod";

export default async function createProduct(
  values: z.infer<typeof createProductSchema>
): Promise<ServiceResponse<Product>> {
  try {
    const product = await db.product.create({
      data: {
        categoryId: values.categoryId,
        title: values.title,
        price: values.price,
        discount: values.discount,
        description: values.description,
        images: { create: values.images.map((image) => ({ url: image })) },
        stock: 0,
        attributes: { create: values.attributes },
      },
    });

    return {
      message: "Product created successfully",
      success: true,
      data: product,
    };
  } catch (error) {
    return {
      message: "Failed to create product",
      success: false,
    };
  }
}
