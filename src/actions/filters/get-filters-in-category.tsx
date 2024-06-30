import { getAllAttributesAndNumberOfProductsInCategory } from "../attributes/get-all-attibutes-and-number-of-products-in-category";
import { cache } from "react";

export default cache(getFiltersOfCategory);

async function getFiltersOfCategory(categoryId: number): Promise<
  ServiceResponse<
    {
      id: number;
      name: string;
      options: string[];
    }[]
  >
> {
  // const cachedResponse = getCache(getCacheKey(categoryId));
  // if (cachedResponse) {
  //   return cachedResponse;
  // }

  try {
    const response = await getAllAttributesAndNumberOfProductsInCategory(
      categoryId
    );

    if (!response.success) {
      return {
        success: false,
        message: "Filters not found",
      };
    }

    const {
      data: [attributes, numberOfProducts],
    } = response;

    const commonAttributes = Array.from(
      new Set(
        attributes
          .map((a) => a.name)
          .filter(
            (name) =>
              attributes.filter((a) => a.name === name).length ===
              numberOfProducts
          )
      )
    );

    const filters = commonAttributes.map((attributeName, index) => {
      const uniqueValues = Array.from(
        new Set(
          attributes.filter((a) => a.name === attributeName).map((a) => a.value)
        )
      );

      return {
        id: index,
        name: attributeName,
        options: uniqueValues,
      };
    });

    const result = {
      data: filters,
      message: "Filters found",
      success: true,
    };

    // setCache(getCacheKey(categoryId), result);

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Filters not found",
    };
  }
}
