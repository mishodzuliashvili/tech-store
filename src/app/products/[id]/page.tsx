import getPathToRootByCategoryId from "@/actions/categories/get-path-to-root";
import getProduct from "@/actions/products/get-product";
import AddToCartButton from "@/components/add-to-cart-button";
import BuyNowButton from "@/components/buy-now-button";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShoppingCart } from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";

type ProductPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductPage({
  params: { id },
  searchParams,
}: ProductPageProps) {
  const response = await getProduct(parseInt(id));
  if (!response.success) {
    notFound();
  }

  const pathResponse = await getPathToRootByCategoryId(
    response.data.category.id
  );
  if (!pathResponse.success) {
    notFound();
  }

  const path = pathResponse.data;

  const { title, images, price, discount, attributes, description } =
    response.data;

  return (
    <section className=" bg-white  dark:bg-gray-900 antialiased">
      <div className="container pt-4">
        <Breadcrumb path={path} />
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="flex justify-center overflow-hidden w-full">
            <Carousel className="w-full max-w-sm">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img src={image.url} alt="" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {title}
            </h1>
            <div className="mt-4 items-center gap-4 flex flex-wrap">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {((price * (100 - discount)) / 100).toFixed(2)} $
              </p>
              {discount > 0 && (
                <>
                  <span className="text-nowrap font-medium text-sm text-secondary-70 line-through">
                    {price} $
                  </span>
                  <span className="bg-[#F93A3A] text-white font-bold py-[2px] px-[5px] text-sm rounded-lg">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 gap-4 sm:items-center flex flex-col sm:flex-row">
              <AddToCartButton product={response.data} />
              <BuyNowButton product={response.data} />
            </div>
            <Button
              className="mt-4 flex items-center gap-1 w-full sm:w-auto"
              variant="secondary"
            >
              Pay{" "}
              <span>{((price * (100 - discount)) / 100 / 24).toFixed()}</span> $
              Every Month
            </Button>
            {/* <p className="mt-4 line-clamp-1 text-sm text-gray-600">
              Pay <span>{Math.round(price / 24)}</span> GEL Every Month
            </p> */}
            <hr className="my-6 border-gray-200 dark:border-gray-800" />
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Attributes:
            </h2>
            <div className="flow-root">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="font-medium text-gray-900">{attr.name}</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {attr.value}
                    </dd>
                  </div>
                ))}

                {description && (
                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Desscription</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {description}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
