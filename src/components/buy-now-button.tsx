"use client";
import { useCartStore } from "@/store/cart";
import { Button, ButtonProps } from "./ui/button";
import { Prisma } from "@prisma/client";
import { Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type Product = Prisma.ProductGetPayload<{
  include: {
    attributes: true;
    images: true;
  };
}>;

type BuyNowButtonProps = Omit<ButtonProps, "onClick"> & {
  product: Product;
};

export default function BuyNowButton({ product, ...props }: BuyNowButtonProps) {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <Button
      {...props}
      onClick={() => toast.success(`You successfuly bought ${product.title}!`)}
      className={cn("flex items-center gap-2", props.className)}
      disabled={!isAuthenticated}
      variant="outline"
    >
      <Sparkles size={18} />
      Buy now
    </Button>
  );
}
