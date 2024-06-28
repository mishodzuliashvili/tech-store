import db from "@/lib/db";
import getAllSubtreeCategoryIds from "../categories/get-all-subtree-category-ids";
import { ProductAttributes } from "@prisma/client";

export async function getAllAttributesAndNumberOfProductsInCategory(
  categoryId: number
): Promise<ServiceResponse<[ProductAttributes[], number]>> {
  try {
    const allSubtreeCategoryIdsResponse = await getAllSubtreeCategoryIds(
      categoryId
    );

    if (!allSubtreeCategoryIdsResponse.success) {
      return {
        success: false,
        message: "Attributes not found",
      };
    }
    const allCategoryIds = allSubtreeCategoryIdsResponse.data;
    allCategoryIds.push(categoryId);

    const products = await db.product.findMany({
      where: {
        categoryId: {
          in: allCategoryIds,
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
