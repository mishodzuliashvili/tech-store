"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

type FilterProps = {
  filter: {
    id: number;
    name: string;
    options: string[];
  };
};

export default function Filter({ filter }: FilterProps) {
  const [chosenOptions, setChosenOptions] = useQueryState(
    filter.name,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
    })
  );

  return filter.options.map((option) => (
    <div key={option} className="flex items-center gap-2">
      <Checkbox
        key={option}
        checked={chosenOptions.includes(option)}
        onCheckedChange={(checked: boolean) => {
          setChosenOptions((oldQuery) => {
            if (oldQuery.includes(option)) {
              return oldQuery.filter((o) => o !== option);
            } else {
              return [...oldQuery, option];
            }
          });
        }}
      />
      <span>{option}</span>
    </div>
  ));
}
