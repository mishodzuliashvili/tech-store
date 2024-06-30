"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { Prisma } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      attributes: true;
      images: true;
    };
  }>;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { add: handleAddToCart } = useCartStore();

  return (
    <div className="relative overflow-hidden group">
      <Image
        src={product.images[0].url}
        alt={product.title}
        width={300}
        height={180}
        className="h-[180px] w-full object-cover"
      />
      <div className="mt-3 flex items-center gap-2">
        <span className="text-nowrap font-bold text-md">{product.price} ₾</span>
        {product.discount > 0 && (
          <>
            <span className="text-nowrap font-medium text-sm text-secondary-70 line-through">
              {(product.price * (100 - product.discount)) / 100} ₾
            </span>
            <span className="bg-[#F93A3A] ml-auto text-white font-bold py-[2px] px-[5px] text-sm rounded-lg">
              -{product.discount}%
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Pay <span>{Math.round(product.price / 24)}</span> GEL Every Month
      </p>
      <h5 className="mt-1 line-clamp-2 min-h-9 font-medium text-sm">
        {product.title}
      </h5>
      <div className="ease-in-out bottom-0 bg-white py-2 transition-transform delay-75 duration-300 absolute w-full translate-y-full group-hover:-translate-y-0">
        <Button
          onClick={() => {
            // toast
            handleAddToCart(product);
          }}
          className="w-full flex items-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
