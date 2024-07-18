"use client";
import { useCartStore } from "@/store/cart";
import { Button, ButtonProps } from "./ui/button";
import { Prisma } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/cn";

type Product = Prisma.ProductGetPayload<{
  include: {
    attributes: true;
    images: true;
  };
}>;

type AddToCartButtonProps = Omit<ButtonProps, "onClick"> & {
  product: Product;
};

export default function AddToCartButton({
  product,
  ...props
}: AddToCartButtonProps) {
  const { add } = useCartStore();
  return (
    <Button
      {...props}
      onClick={() => add(product)}
      className={cn("flex items-center gap-2", props.className)}
    >
      <ShoppingCart size={18} /> Add to Cart
    </Button>
  );
}
