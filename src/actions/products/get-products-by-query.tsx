import db from "@/lib/db";
import getAllSubtreeCategoryIds from "../categories/get-all-subtree-category-ids";
import { Prisma } from "@prisma/client";
import PRODUCTS_PAGE from "@/constants/products-page";

export default async function getProductsByQuery(
  query: string,
  hasDiscount: boolean,
  filters?: Record<string, string[]>,
  priceFrom?: number | null,
  priceTo?: number | null,
  page?: number | null
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
  const products = await db.product.findMany({
    where: {
      title: {
        contains: query,
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
    take: PRODUCTS_PAGE.pageSize,
    include: {
      attributes: true,
      images: true,
    },
  });

  try {
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