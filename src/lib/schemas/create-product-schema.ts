import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.number(),
  title: z.string().min(3).max(255),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  description: z.string().min(3).max(255),
  images: z.array(z.string()),
  attributes: z.array(
    z.object({
      name: z.string().min(3).max(255),
      value: z.string().min(3).max(255),
    })
  ),
});
