"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./add-to-cart-button";

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      attributes: true;
      images: true;
    };
  }>;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative border-2 bg-white overflow-hidden group rounded-lg p-4">
      {/* <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600"></span> */}

      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]?.url}
            alt={product.title}
            width={300}
            height={180}
            className="h-[180px] w-full object-cover hover:scale-105 duration-200"
          />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-nowrap font-bold text-md">
              {((product.price * (100 - product.discount)) / 100).toFixed(2)} $
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-nowrap font-medium text-sm text-secondary-70 line-through">
                  {product.price} $
                </span>
                <span className="bg-[#F93A3A] ml-auto text-white font-bold py-[2px] px-[5px] text-sm rounded-lg">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-gray-600">
            Pay{" "}
            <span>
              {((product.price * (100 - product.discount)) / 100 / 24).toFixed(
                2
              )}
            </span>{" "}
            $ Every Month
          </p>
          <h5 className="mt-1 line-clamp-2 min-h-9 font-medium text-sm">
            {product.title}
          </h5>
        </Link>
        <div className="ease-in-out bottom-0 bg-white py-2 transition-transform delay-75 duration-300 absolute w-full translate-y-full group-hover:-translate-y-0">
          <AddToCartButton product={product} className="w-full" />
        </div>
      </div>
    </div>
  );
}
