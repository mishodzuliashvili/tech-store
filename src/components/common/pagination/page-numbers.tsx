import { PaginationButton } from "./pagination-button";

type PageNumbersProps = {
  numberOfPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
};

export function PageNumbers({
  numberOfPages,
  currentPage,
  onPageClick,
}: PageNumbersProps) {
  return (
    <>
      {[...Array(numberOfPages)].map((_, index) => (
        <PaginationButton
          key={index}
          variant={index + 1 === currentPage ? "default" : "ghost"}
          onClick={() => onPageClick(index + 1)}
        >
          {index + 1}
        </PaginationButton>
      ))}
    </>
  );
}
