import { notFound } from "next/navigation";
import React from "react";

import getCategory from "@/actions/categories/get-category";
import getPathToRootByCategoryId from "@/actions/categories/get-path-to-root";
import getFiltersOfCategory from "@/actions/filters/get-filters-in-category";
import getProductsInCategory from "@/actions/products/get-products-in-category";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { SORT_OPTIONS_VALUES } from "@/constants/products-page";
import { ProductsPage } from "@/components/common";

type ProductsPageNextProps = {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductNextsPage({
  params,
  searchParams,
}: ProductsPageNextProps) {
  const categoryId = parseInt(params.categoryId);
  if (isNaN(categoryId)) {
    notFound();
  }

  const categoryResponse = await getCategory(categoryId);
  if (!categoryResponse.success) {
    notFound();
  }

  const pathResponse = await getPathToRootByCategoryId(categoryId);
  if (!pathResponse.success) {
    notFound();
  }

  const filtersResponse = await getFiltersOfCategory(categoryId);
  if (!filtersResponse.success) {
    notFound();
  }

  const { name: categoryName, subcategories } = categoryResponse.data;
  const path = pathResponse.data;

  const filters = filtersResponse.data;

  const myPassedFilters = Object.keys(searchParams).reduce((acc, key) => {
    if (filters.find((filter) => filter.name === key)) {
      if (searchParams[key] && Array.isArray(searchParams[key])) {
        acc[key] = searchParams[key] as string[];
      } else if (typeof searchParams[key] === "string") {
        acc[key] = [searchParams[key] as string];
      }
      acc[key] = parseAsArrayOf(parseAsString)
        .withDefault([])
        .parseServerSide(acc[key]);
    }
    return acc;
  }, {} as Record<string, string[]>);

  const productsResponse = await getProductsInCategory(
    categoryId,
    parseAsBoolean.withDefault(false).parseServerSide(searchParams.hasDiscount),
    myPassedFilters,
    parseAsInteger.parseServerSide(searchParams.fromPrice),
    parseAsInteger.parseServerSide(searchParams.toPrice),
    Math.max(
      1,
      parseAsInteger.withDefault(1).parseServerSide(searchParams.page)
    ),
    parseAsStringLiteral(SORT_OPTIONS_VALUES).parseServerSide(searchParams.sort)
  );
  if (!productsResponse.success) {
    notFound();
  }

  const { products, numberOfPages, totalProducts } = productsResponse.data;

  return (
    <ProductsPage
      categoryName={categoryName}
      subcategories={subcategories}
      path={path}
      filters={filters}
      products={products}
      numberOfPages={numberOfPages}
      totalProducts={totalProducts}
    />
  );
}
