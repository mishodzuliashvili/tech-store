import { ChevronRight } from "lucide-react";
import { PaginationButton } from "./pagination-button";

type NextButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export function NextButton({ onClick, disabled }: NextButtonProps) {
  return (
    <PaginationButton onClick={onClick} disabled={disabled}>
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationButton>
  );
}
