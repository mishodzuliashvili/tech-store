"use client";
import { Button } from "@/components/ui/button";
import useIsMounted from "@/hooks/use-is-mounted";
import { useCartStore } from "@/store/cart";
import { PaypalButtons } from "@/utils/paypal/buttons";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

type CartPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CartPage({ params, searchParams }: CartPageProps) {
  const { count, cart, remove, removeAtOnce, add, removeAll } = useCartStore();
  const isMounted = useIsMounted();
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  if (!isMounted) return null;

  return (
    <section className="container">
      <div className="grid lg:grid-cols-[1fr,300px] gap-10">
        <div>
          <div className="flex justify-between py-5">
            <h3 className="text-xl font-bold">Shopping Cart</h3>
            <p>{count()} Items</p>
          </div>
          <div className="grid grid-cols-[1fr,50px] items-center md:grid-cols-[1fr,200px,200px,50px] border-b pb-5">
            <p>Product Details</p>
            <p className="md:flex justify-center hidden">Quantity</p>
            <p className="md:flex justify-center hidden">Total</p>
            <div>
              <Button size="icon" onClick={() => removeAll()} variant="ghost">
                <TrashIcon className="text-red-500" />
              </Button>
            </div>
          </div>
          {cart.length === 0 && (
            <div className="mt-5">
              <h4>Your cart is empty</h4>
            </div>
          )}
          {cart.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-2 md:grid-cols-[1fr,200px,200px,50px] items-center border-b mt-5 pb-5 gap-5"
            >
              <div className="flex md:items-center gap-2 flex-col md:flex-row col-span-2 md:col-span-1">
                <Image
                  src={product.images[0]?.url || ""}
                  alt="product"
                  width={100}
                  height={100}
                  className="h-[200px] mr-2 rounded-lg object-cover w-full md:h-[100px] md:w-[100px]"
                />
                <div className="space-y-2">
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-nowrap font-bold text-md">
                      {(
                        (product.price * (100 - product.discount)) /
                        100
                      ).toFixed(2)}{" "}
                      $
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
                    Pay <span>{Math.round(product.price / 24)}</span> $ Every
                    Month
                  </p>
                  <h5 className="mt-1 line-clamp-2 min-h-9 font-medium text-sm">
                    {product.title}
                  </h5>
                </div>
              </div>
              <p className="flex items-center flex-row justify-center gap-4">
                <Button
                  disabled={product.count === 1}
                  onClick={() => remove(product.id)}
                  variant="outline"
                >
                  -
                </Button>
                <span>{product.count}</span>
                <Button onClick={() => add(product)} variant="outline">
                  +
                </Button>
              </p>
              <p className="flex items-center flex-col justify-center">
                {product.discount <= 0 && (
                  <span>{product.count * product.price} $</span>
                )}
                {product.discount > 0 && (
                  <>
                    <span>
                      {(product.count *
                        (product.price * (100 - product.discount))) /
                        100}{" "}
                      $
                    </span>
                    <span className="text-nowrap font-medium text-sm text-secondary-70 line-through">
                      {product.count * product.price} $
                    </span>
                  </>
                )}
              </p>
              <div className="flex items-center col-span-2 md:col-span-1">
                <Button
                  size="icon"
                  className="w-full border md:border-0 md:w-fit"
                  onClick={() => removeAtOnce(product.id)}
                  variant="ghost"
                >
                  <TrashIcon className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="p-5 bg-gray-100 rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-bold">Total</h3>
              <span>
                {cart
                  .reduce(
                    (acc, product) =>
                      acc +
                      (product.count *
                        (product.price * (100 - product.discount))) /
                        100,
                    0
                  )
                  .toFixed(2)}{" "}
                $
              </span>
            </div>
            <div className="mt-5"></div>

            <PaypalButtons
              isDisabled={cart.length === 0 || !isAuthenticated}
              orderData={{
                type: "buyProducts",
                data: {
                  userId: user?.id || "",
                  products: cart.map((product) => ({
                    productId: product.id,
                    quantity: product.count,
                    price: (product.price * (100 - product.discount)) / 100,
                  })),
                },
              }}
              onSuccess={(message) => {
                removeAll();
                toast.success(message);
              }}
              onError={(message) => {
                toast.error(message);
              }}
            />
            {cart.length === 0 && (
              <h3 className="mt-3 text-center">Your products to purchase</h3>
            )}
            {cart.length > 0 && !isLoading && !isAuthenticated && (
              <h3 className="mt-3 text-center">
                Please login to purchase products
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
