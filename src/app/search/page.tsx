import getFiltersByQuery from "@/actions/filters/get-filters-by-query";
import getProductsByQuery from "@/actions/products/get-products-by-query";
import { notFound } from "next/navigation";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { SORT_OPTIONS_VALUES } from "@/constants/products-page";
import { ProductsPage } from "@/components/common";

type SearchPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const query = parseAsString.parseServerSide(searchParams.q);

  if (!query) {
    return (
      <main className="container text-xl font-bold">No query provided</main>
    );
  }

  const filtersResponse = await getFiltersByQuery(query);

  if (!filtersResponse.success) {
    notFound();
  }

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

  const productsResponse = await getProductsByQuery(
    query,
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
      filters={filters}
      products={products}
      numberOfPages={numberOfPages}
      totalProducts={totalProducts}
    />
  );
}
