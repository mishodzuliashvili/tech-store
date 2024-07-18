import { ChevronLeft } from "lucide-react";
import { PaginationButton } from "./pagination-button";

type PreviousButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export function PreviousButton({ onClick, disabled }: PreviousButtonProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled}>
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationButton>
  );
}
