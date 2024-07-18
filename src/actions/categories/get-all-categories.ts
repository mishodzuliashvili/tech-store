import db from "@/lib/db";
import { Category } from "@prisma/client";

async function getAllSubCategories(
  categoryId: number
): Promise<ServiceResponse<Category[]>> {
  try {
    const subcategories = await db.category.findMany({
      where: {
        parentCategoryId: categoryId,
      },
    });

    for (const subcategory of subcategories) {
      const allSubtreeCategoryIdsResponse = await getAllSubCategories(
        subcategory.id
      );
      if (allSubtreeCategoryIdsResponse.success) {
        subcategories.push(...allSubtreeCategoryIdsResponse.data);
      }
    }

    return {
      data: subcategories,
      message: "Subtree category IDs found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Subtree category IDs not found",
    };
  }
}

export default async function getAllCategories(): Promise<
  ServiceResponse<Category[]>
> {
  try {
    const rootCategories = await db.category.findMany({
      where: {
        parentCategoryId: null,
      },
    });

    const result: Category[] = [...rootCategories];

    for (const category of rootCategories) {
      const allSubtreeCategoryIdsResponse = await getAllSubCategories(
        category.id
      );
      if (allSubtreeCategoryIdsResponse.success) {
        result.push(...allSubtreeCategoryIdsResponse.data);
      }
    }

    const uniqueResult = result.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as Category[]);

    return {
      data: uniqueResult,
      message: "All categories found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "All categories not found",
    };
  }
}
