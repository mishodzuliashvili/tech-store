import db from "@/lib/db";
import { Category, Prisma } from "@prisma/client";

export default async function getPathToRootByCategoryId(
  categoryId: number
): Promise<ServiceResponse<Category[]>> {
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    const pathToRoot = [category];
    let currentCategory = category;

    while (currentCategory.parentCategoryId) {
      const parentCategory = await db.category.findUnique({
        where: {
          id: currentCategory.parentCategoryId,
        },
      });

      if (!parentCategory) {
        break;
      }

      pathToRoot.unshift(parentCategory);
      currentCategory = parentCategory;
    }

    return {
      data: pathToRoot,
      message: "Path to root found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Category not found",
    };
  }
}
