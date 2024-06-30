import db from "@/lib/db";
import { ProductAttribute } from "@prisma/client";

export async function getAllAttributesAndNumberOfProductsByQuery(
  query: string
): Promise<ServiceResponse<[ProductAttribute[], number]>> {
  try {
    const products = await db.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      select: {
        attributes: true,
      },
    });

    const attributes = products.flatMap((product) => product.attributes);

    return {
      data: [attributes, products.length],
      message: "Attributes found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Attributes not found",
    };
  }
}
