import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback } from "react";

export function usePagination(options?: {
  startTransition?: React.TransitionStartFunction;
}) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
      startTransition: options?.startTransition,
    })
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
