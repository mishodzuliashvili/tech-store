import { getAllAttributesAndNumberOfProductsByQuery } from "../attributes/get-all-attibutes-and-number-of-products-by-query";

export default async function getFiltersByQuery(query: string): Promise<
  ServiceResponse<
    {
      id: number;
      name: string;
      options: string[];
    }[]
  >
> {
  try {
    const response = await getAllAttributesAndNumberOfProductsByQuery(query);

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

    return {
      data: filters,
      message: "Filters found",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Filters not found",
    };
  }
}
