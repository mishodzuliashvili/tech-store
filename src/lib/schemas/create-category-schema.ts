import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3).max(255),
  parentCategoryId: z.number().optional(),
});
