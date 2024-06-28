import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function getThreeLevelCategoryTree(): Promise<
  ServiceResponse<
    Prisma.CategoryGetPayload<{
      include: {
        subcategories: {
          include: {
            subcategories: true;
          };
        };
      };
    }>[]
  >
> {
  try {
    const categories = await db.category.findMany({
      where: {
        parentCategoryId: null, // Top-level categories
      },
      include: {
        subcategories: {
          include: {
            subcategories: true,
          },
        },
      },
    });

    return {
      data: categories,
      message: "Three-level category tree found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Three-level category tree not found",
    };
  }
}
