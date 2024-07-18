"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS, SORT_OPTIONS_VALUES } from "@/constants/products-page";
import { parseAsStringLiteral, useQueryState } from "nuqs";

type SortControllerProps = {
  startTransition?: React.TransitionStartFunction;
};

export default function SortController({
  startTransition,
}: SortControllerProps) {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(SORT_OPTIONS_VALUES).withOptions({
      shallow: false,
      startTransition,
    })
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {SORT_OPTIONS.find((option) => option.value === sort)?.label ||
            "Sort"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuRadioGroup
          value={sort || undefined}
          onValueChange={(v) => setSort(v as any)}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
