import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getCategory from "@/actions/categories/get-category";
import getPathToRootByCategoryId from "@/actions/categories/get-path-to-root";
import { getFiltersOfCategory } from "@/actions/filters/get-filters-in-category";
import getProductsInCategory from "@/actions/products/get-products-in-category";
import Filter from "./filter";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import MainFilters from "./main-filters";
import Pagination from "./pagination";
import ProductCard from "./product-card";

type ProductsPageProps = {
  params: {
    categoryId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
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
    )
  );
  if (!productsResponse.success) {
    notFound();
  }

  const { numberOfPages, products } = productsResponse.data;

  return (
    <div className="container">
      <div className="grid grid-cols-[240px,auto] pt-5 gap-5">
        <div className="">
          <Link
            href={`/${path.length > 1 ? path[path.length - 2].id : ""}`}
            className="font-bold text-lg grid grid-cols-[20px_1fr] items-start justify-start gap-2"
          >
            <IoIosArrowBack className="text-xl relative" />

            <div className="m-0 p-0 relative -top-2">{categoryName}</div>
          </Link>
          <ul className="flex flex-col gap-2 pt-4 text-sm">
            {subcategories.map((subcategory) => (
              <li key={subcategory.id}>
                <Link href={`/${subcategory.id}`}>{subcategory.name}</Link>
              </li>
            ))}
          </ul>
          <Accordion
            type="multiple"
            defaultValue={[
              ...filters.map((filter) => filter.name),
              "priceFilter",
              "discounts",
            ]}
          >
            <MainFilters />
            {filters.map((filter) => (
              <AccordionItem key={filter.id} value={filter.name}>
                <AccordionTrigger>{filter.name}</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <Filter filter={filter} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link href={`/`}>Home</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              {path.map((category, i) => (
                <React.Fragment key={category.id}>
                  <BreadcrumbItem>
                    {i < path.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={`/${category.id}`}>{category.name}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{category.name}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {i < path.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="pt-5">
            <h1 className="text-3xl font-bold">{categoryName}</h1>
            {products.length === 0 && (
              <p className="text-gray-600 mt-5">No products found</p>
            )}
            {products.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <Pagination numberOfPages={numberOfPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
