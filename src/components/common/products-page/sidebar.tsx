import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import MainFilters from "@/components/main-filters";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Filter from "@/components/filter";

type SidebarProps = {
  categoryName?: string;
  parentCategoryId: string | null;
  subcategories?: {
    id: number;
    name: string;
    parentCategoryId: number | null;
  }[];
  filters: {
    id: number;
    name: string;
    options: string[];
  }[];
  startTransition: React.TransitionStartFunction;
};

export function Sidebar({
  categoryName,
  parentCategoryId,
  subcategories,
  filters,
  startTransition,
}: SidebarProps) {
  return (
    <div>
      {categoryName && (
        <Link
          href={parentCategoryId ? `/category/${parentCategoryId}` : "/"}
          className="font-bold text-lg grid grid-cols-[20px_1fr] items-start justify-start gap-2"
        >
          <IoIosArrowBack className="text-xl relative" />
          <div className="m-0 p-0 relative -top-2">{categoryName}</div>
        </Link>
      )}
      {subcategories && (
        <ul className="flex flex-col gap-2 pt-4 text-sm">
          {subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <Link href={`/category/${subcategory.id}`}>
                {subcategory.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <MainFilters startTransition={startTransition} />
      <Accordion
        type="multiple"
        defaultValue={filters.map((filter) => filter.name)}
      >
        {filters.map((filter) => (
          <AccordionItem key={filter.id} value={filter.name}>
            <AccordionTrigger>{filter.name}</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <Filter filter={filter} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
