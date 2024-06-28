import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function getCategory(categoryId: number): Promise<
  ServiceResponse<
    Prisma.CategoryGetPayload<{
      include: { subcategories: true };
    }>
  >
> {
  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: { subcategories: true },
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    return { data: category, message: "Category found", success: true };
  } catch (error) {
    return { success: false, message: "Category not found" };
  }
}
