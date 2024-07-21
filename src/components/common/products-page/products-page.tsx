"use client";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import SortController from "@/components/sort-controller";
import { Sidebar } from "./sidebar";
import { ProductGrid } from "./product-grid";
import { Category, Prisma, Product } from "@prisma/client";
import { useTransition } from "react";
import { Pagination } from "../pagination";

type ProductsPageProps = {
  path?: Category[];
  categoryName?: string;
  subcategories?: {
    id: number;
    name: string;
    parentCategoryId: number | null;
  }[];
  filters: {
    id: number;
    name: string;
    options: string[];
  }[];
  totalProducts: number;
  products: Prisma.ProductGetPayload<{
    include: {
      attributes: true;
      images: true;
    };
  }>[];
  numberOfPages: number;
};

export function ProductsPage({
  path,
  categoryName,
  subcategories,
  filters,
  totalProducts,
  products,
  numberOfPages,
}: ProductsPageProps) {
  const [isLoading, startTransition] = useTransition();

  return (
    <div className="container">
      <div className="grid md:grid-cols-[240px,auto] pt-5 gap-5">
        <Sidebar
          categoryName={categoryName}
          subcategories={subcategories}
          parentCategoryId={
            path && path.length > 1 ? path[path.length - 2].id.toString() : null
          }
          filters={filters}
          startTransition={startTransition}
        />
        <div>
          {path && <Breadcrumb path={path} />}
          <div className="flex items-center justify-between pt-5">
            <div>{totalProducts} Products Found</div>
            <div>
              <SortController startTransition={startTransition} />
            </div>
          </div>
          <div className="pt-5">
            <h1 className="text-3xl font-bold">{categoryName}</h1>
            <ProductGrid products={products} isLoading={isLoading} />
            <Pagination
              startTransition={startTransition}
              numberOfPages={numberOfPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
