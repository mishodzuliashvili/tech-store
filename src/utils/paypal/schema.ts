import { z } from "zod";

export const orderDataSchema = z.union([
  z.object({
    type: z.literal("default"),
  }),
  z.object({
    type: z.literal("buyProducts"),
    data: z.object({
      userId: z.string(),
      products: z.array(
        z.object({
          productId: z.number(),
          quantity: z.number(),
          price: z.number(),
        })
      ),
    }),
  }),
]);

export type OrderData = z.infer<typeof orderDataSchema>;
