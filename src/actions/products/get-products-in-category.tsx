import db from "@/lib/db";
import getAllSubtreeCategoryIds from "../categories/get-all-subtree-category-ids";
import { Prisma } from "@prisma/client";

export default async function getProductsInCategory(
  categoryId: number,
  filters?: Record<string, string[]>
): Promise<
  ServiceResponse<
    Prisma.ProductGetPayload<{
      include: {
        attributes: true;
        images: true;
      };
    }>[]
  >
> {
  try {
    const allSubtreeCategoryIdsResponse = await getAllSubtreeCategoryIds(
      categoryId
    );

    if (!allSubtreeCategoryIdsResponse.success) {
      return {
        success: false,
        message: "Products not found",
      };
    }
    const allCategoryIds = allSubtreeCategoryIdsResponse.data;
    allCategoryIds.push(categoryId);

    const products = await db.product.findMany({
      where: {
        categoryId: {
          in: allCategoryIds,
        },
        ...(filters &&
          Object.keys(filters).length > 0 && {
            AND: Object.entries(filters).map(([name, values]) => ({
              attributes: {
                some: {
                  name,
                  value: {
                    in: values,
                  },
                },
              },
            })),
          }),
      },
      include: {
        attributes: true,
        images: true,
      },
    });

    return {
      data: products,
      message: "Products found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Products not found",
    };
  }
}
