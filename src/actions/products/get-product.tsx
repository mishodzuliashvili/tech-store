import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function getProduct(productId: number): Promise<
  ServiceResponse<
    Prisma.ProductGetPayload<{
      include: {
        attributes: true;
        images: true;
        category: true;
      };
    }>
  >
> {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { attributes: true, images: true, category: true },
    });
    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }
    return {
      data: product,
      message: "Product found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Product not found",
    };
  }
}
