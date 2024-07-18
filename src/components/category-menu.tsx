"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";

export function CategoryMenu({
  categoryTree,
}: {
  categoryTree: Prisma.CategoryGetPayload<{
    include: {
      subcategories: {
        include: {
          subcategories: true;
        };
      };
    };
  }>[];
}) {
  return (
    <>
      <div className="md:hidden flex flex-wrap gap-2">
        {categoryTree.map((cat) => (
          <AlertDialog key={cat.id}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{cat.name}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{cat.name}</AlertDialogTitle>
                <AlertDialogDescription>
                  <ul className="grid grid-cols-1 w-full gap-3 p-4 sm:grid-cols-3 justify-between text-black">
                    {cat.subcategories.map((subcat) => (
                      <div key={subcat.id} className="w-full">
                        <Button
                          asChild
                          className="font-bold text-wrap h-fit w-full justify-center sm:justify-start"
                          variant="ghost"
                        >
                          <Link href={`category/${subcat.id}`}>
                            {subcat.name}
                          </Link>
                        </Button>
                        {subcat.subcategories.map((subsubcat) => (
                          <Button
                            key={subsubcat.id}
                            asChild
                            className="text-wrap h-fit w-full justify-center sm:justify-start"
                            variant="ghost"
                          >
                            <Link href={`category/${subsubcat.id}`}>
                              {subsubcat.name}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="flex items-center">
          {categoryTree.map((cat) => (
            <NavigationMenuItem key={cat.id}>
              <NavigationMenuTrigger className="border">
                {cat.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="pt-0">
                <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-3 justify-between">
                  {cat.subcategories.map((subcat) => (
                    <div key={subcat.id} className="">
                      <Button
                        asChild
                        className="font-bold text-wrap h-fit w-full justify-start"
                        variant="ghost"
                      >
                        <Link href={`category/${subcat.id}`}>
                          {subcat.name}
                        </Link>
                      </Button>
                      {subcat.subcategories.map((subsubcat) => (
                        <Button
                          key={subsubcat.id}
                          asChild
                          className="text-wrap h-fit w-full justify-start"
                          variant="ghost"
                        >
                          <Link href={`category/${subsubcat.id}`}>
                            {subsubcat.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
