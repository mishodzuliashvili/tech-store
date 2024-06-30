"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";

export function NavigationMenuDemo({
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
    <NavigationMenu>
      <NavigationMenuList>
        {categoryTree.map((cat) => (
          <NavigationMenuItem key={cat.id}>
            <NavigationMenuTrigger>{cat.name}</NavigationMenuTrigger>
            <NavigationMenuContent className="pt-0">
              <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-3 justify-between">
                {cat.subcategories.map((subcat) => (
                  <div key={subcat.id} className="">
                    <Button
                      asChild
                      className="font-bold text-wrap h-fit w-full justify-start"
                      variant="ghost"
                    >
                      <Link href={`${subcat.id}`}>{subcat.name}</Link>
                    </Button>
                    {subcat.subcategories.map((subsubcat) => (
                      <Button
                        key={subsubcat.id}
                        asChild
                        className="text-wrap h-fit w-full justify-start"
                        variant="ghost"
                      >
                        <Link href={`${subsubcat.id}`}>{subsubcat.name}</Link>
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
  );
}
