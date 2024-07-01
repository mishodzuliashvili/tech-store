const PRODUCTS_PAGE = {
  pageSize: 10,
};

export const SORT_OPTIONS = [
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
  {
    value: "price-desc",
    label: "Price: High to Low",
  },
  {
    value: "discount-desc",
    label: "Discount",
  },
  {
    value: "newest",
    label: "Newest",
  },
] as const;

export const SORT_OPTIONS_VALUES = SORT_OPTIONS.map((option) => option.value);

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export default PRODUCTS_PAGE;
