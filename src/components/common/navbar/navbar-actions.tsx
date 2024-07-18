import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import AccountNavbarBlock from "./account-navbar-block";
import { useCartStore } from "@/store/cart";

type NavbarActionsProps = {
  onSearchClick: () => void;
  isUserAdmin?: boolean;
};

export default function NavbarActions({
  onSearchClick,
  isUserAdmin,
}: NavbarActionsProps) {
  const { count } = useCartStore();

  return (
    <div className="flex gap-5 items-center justify-end">
      <Button
        onClick={onSearchClick}
        variant="ghost"
        size="icon"
        className="sm:hidden"
      >
        <FiSearch size={22} />
      </Button>
      <Button asChild variant="ghost" size="icon">
        <Link className="font-medium relative" href="/cart">
          <FiShoppingCart size={22} />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-primary-foreground bg-primary border-2 border-background rounded-full -top-1 -end-1">
            {count()}
          </div>
        </Link>
      </Button>
      <AccountNavbarBlock isUserAdmin={isUserAdmin} />
    </div>
  );
}
