import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Prisma } from "@prisma/client";

type ProductGridProps = {
  products: Prisma.ProductGetPayload<{
    include: {
      attributes: true;
      images: true;
    };
  }>[];
  isLoading: boolean;
};

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 h-[284px]">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-gray-600 mt-5">No products found</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
