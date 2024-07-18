import db from "@/lib/db";
import getAllSubtreeCategoryIds from "../categories/get-all-subtree-category-ids";
import { Prisma } from "@prisma/client";
import PRODUCTS_PAGE, { SortOption } from "@/constants/products-page";

export default async function getProductsInCategory(
  categoryId: number,
  hasDiscount: boolean,
  filters?: Record<string, string[]>,
  priceFrom?: number | null,
  priceTo?: number | null,
  page?: number | null,
  sort?: SortOption | null
): Promise<
  ServiceResponse<{
    products: Prisma.ProductGetPayload<{
      include: {
        attributes: true;
        images: true;
      };
    }>[];
    numberOfPages: number;
    totalProducts: number;
  }>
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
        price: {
          ...(priceFrom && {
            gte: priceFrom,
          }),
          ...(priceTo && {
            lte: priceTo,
          }),
        },
        discount: {
          ...(hasDiscount && {
            gt: 0,
          }),
        },
        ...(filters &&
          Object.keys(filters).length > 0 && {
            AND: Object.entries(filters)
              .filter(([_, values]) => values.length > 0)
              .map(([name, values]) => ({
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
      ...(page && {
        skip: (page - 1) * PRODUCTS_PAGE.pageSize,
      }),
      orderBy: (() => {
        switch (sort) {
          case "price-asc":
            return {
              price: "asc",
            };
          case "price-desc":
            return {
              price: "desc",
            };
          case "discount-desc":
            return {
              discount: "desc",
            };
          case "newest":
            return {
              createdAt: "desc",
            };
          default:
            return { createdAt: "desc" };
        }
      })(),
      take: PRODUCTS_PAGE.pageSize,
      include: {
        attributes: true,
        images: true,
      },
    });

    const totalProducts = await db.product.count({
      where: {
        categoryId: {
          in: allCategoryIds,
        },
        price: {
          ...(priceFrom && {
            gte: priceFrom,
          }),
          ...(priceTo && {
            lte: priceTo,
          }),
        },
        discount: {
          ...(hasDiscount && {
            gt: 0,
          }),
        },
        ...(filters &&
          Object.keys(filters).length > 0 && {
            AND: Object.entries(filters)
              .filter(([_, values]) => values.length > 0)
              .map(([name, values]) => ({
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
    });

    const numberOfPages = Math.ceil(totalProducts / PRODUCTS_PAGE.pageSize);

    return {
      data: { products, numberOfPages, totalProducts },
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
