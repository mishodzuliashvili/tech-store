import db from "@/lib/db";

export default async function getAllSubtreeCategoryIds(
  categoryId: number
): Promise<ServiceResponse<number[]>> {
  try {
    const subcategories = await db.category.findMany({
      where: {
        parentCategoryId: categoryId,
      },
      select: {
        id: true,
      },
    });

    const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

    for (const subcategoryId of subcategoryIds) {
      const allSubtreeCategoryIdsResponse = await getAllSubtreeCategoryIds(
        subcategoryId
      );
      if (allSubtreeCategoryIdsResponse.success) {
        subcategoryIds.push(...allSubtreeCategoryIdsResponse.data);
      }
    }

    return {
      data: subcategoryIds,
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
