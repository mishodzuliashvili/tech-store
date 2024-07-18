import { usePagination } from "@/hooks/use-pagination";
import { PreviousButton } from "./previous-button";
import { NextButton } from "./next-button";
import { PageNumbers } from "./page-numbers";

type PaginationProps = {
  numberOfPages: number;
  startTransition?: React.TransitionStartFunction;
};

export default function Pagination({
  numberOfPages,
  startTransition,
}: PaginationProps) {
  const { currentPage, goToNextPage, goToPreviousPage, goToPage } =
    usePagination({ startTransition });

  return (
    <div className="flex items-center gap-3 mt-5 justify-between md:justify-normal">
      <PreviousButton onClick={goToPreviousPage} disabled={currentPage <= 1} />
      <div className="items-center gap-3 hidden md:flex">
        <PageNumbers
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          onPageClick={goToPage}
        />
      </div>
      <NextButton
        onClick={goToNextPage}
        disabled={currentPage >= numberOfPages}
      />
    </div>
  );
}
