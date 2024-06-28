"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type FiltersProps = {
  filters: {
    id: number;
    name: string;
    options: string[];
  };
};

export default function Filters({ filters }: FiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const checked = searchParams.getAll(filters.name);

  const createQueryString = useCallback(
    (value: string, remove: boolean = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (remove) {
        params.delete(filters.name);
        checked
          .filter((c) => c !== value)
          .forEach((c) => {
            params.append(filters.name, c);
          });
      } else {
        params.append(filters.name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  // use react query here can be better solution or custom react hook
  // maybe change happen faster, like debounce

  return filters.options.map((option) => (
    <div key={option} className="flex items-center gap-2">
      <Checkbox
        key={option}
        checked={checked.includes(option)}
        onCheckedChange={(c: boolean) => {
          router.push(pathname + "?" + createQueryString(option, !c));
        }}
      />
      <span>{option}</span>
    </div>
  ));
}
