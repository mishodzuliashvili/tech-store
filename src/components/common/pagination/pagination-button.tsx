import { Button } from "@/components/ui/button";

type PaginationButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  variant?: "ghost" | "default";
  children: React.ReactNode;
};

export function PaginationButton({
  onClick,
  disabled,
  variant = "ghost",
  children,
}: PaginationButtonProps) {
  return (
    <Button disabled={disabled} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
}
