import getFiltersByQuery from "@/actions/filters/get-filters-by-query";
import getProductsByQuery from "@/actions/products/get-products-by-query";
import { notFound } from "next/navigation";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import ProductCard from "../[categoryId]/product-card";

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
    notFound();
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
    )
  );

  if (!productsResponse.success) {
    notFound();
  }

  return (
    <div className="container">
      <h1>Search</h1>
      <p>Results for {query}</p>
      <p>Filters: {JSON.stringify(filters)}</p>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {productsResponse.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
