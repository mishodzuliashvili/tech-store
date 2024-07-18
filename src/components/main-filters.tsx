"use client";

import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs";

type MainFiltersProps = {
  startTransition?: React.TransitionStartFunction;
};

export default function MainFilters({ startTransition }: MainFiltersProps) {
  const [fromPrice, setFromPrice] = useQueryState("fromPrice", parseAsInteger);
  const [toPrice, setToPrice] = useQueryState("toPrice", parseAsInteger);
  const [hasDiscount, setHasDiscount] = useQueryState(
    "hasDiscount",
    parseAsBoolean.withDefault(false).withOptions({
      shallow: false,
      startTransition,
    })
  );
  const handlePriceChange =
    (setter: (value: number | null) => void) => (e: any) => {
      const value = e.target.value;
      if (value === "" || /^[0-9]*$/.test(value)) {
        setter(value === "" ? null : parseInt(value));
      } else {
        setter(null);
      }
    };

  return (
    <Accordion type="multiple" defaultValue={["priceFilter", "discounts"]}>
      <AccordionItem value={"discounts"}>
        <AccordionTrigger>Discounts</AccordionTrigger>
        <AccordionContent className="grid grid-cols-[60px,60px,auto] gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={hasDiscount}
              onCheckedChange={(checked: boolean) => {
                setHasDiscount(checked);
              }}
            />
            <div className="whitespace-nowrap">With Discount</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={"priceFilter"}>
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent className="grid grid-cols-[60px,60px,auto] gap-3">
          <Input
            value={fromPrice === null ? "" : fromPrice.toString()}
            onChange={handlePriceChange(setFromPrice)}
            placeholder="From"
          />
          <Input
            value={toPrice === null ? "" : toPrice.toString()}
            onChange={handlePriceChange(setToPrice)}
            placeholder="To"
          />
          <Button
            onClick={() => {
              setFromPrice((from) => from, {
                shallow: false,
              });
            }}
            variant="secondary"
          >
            Apply
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
