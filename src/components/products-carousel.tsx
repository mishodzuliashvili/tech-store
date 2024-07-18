"use client";
import { Prisma } from "@prisma/client";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./product-card";

type ProductsCarouselProps = {
  products: Prisma.ProductGetPayload<{
    include: {
      attributes: true;
      images: true;
    };
  }>[];
  title: string;
};

export default function ProductsCarousel({
  products,
  title,
}: ProductsCarouselProps) {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
