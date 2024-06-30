"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

type PaginationProps = {
  numberOfPages: number;
};

export default function Pagination({ numberOfPages }: PaginationProps) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    })
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex items-center gap-3 mt-5">
      <Button
        disabled={currentPage <= 1}
        variant="ghost"
        onClick={goToPreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>
      {[...Array(numberOfPages)].map((_, index) => (
        <Button
          key={index}
          variant={index + 1 === currentPage ? "default" : "ghost"}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        disabled={currentPage >= numberOfPages}
        variant="ghost"
        onClick={goToNextPage}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
