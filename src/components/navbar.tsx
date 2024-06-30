"use client";
import COMPANY from "@/constants/company";
import SearchBox from "./search-box";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { Button } from "./ui/button";
import AccountNavbarBlock from "./account-navbar-block";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import useIsMounted from "@/hooks/is-mounted";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { count } = useCartStore();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <header className="flex flex-wrap w-full bg-white text-sm py-6">
      <div className="container  bg-white">
        <nav className="flex justify-between sm:grid sm:grid-cols-[240px,1fr,auto] items-center gap-5">
          <Link
            className="flex items-center gap-x-2 text-xl font-semibold"
            href="/"
          >
            <div className="rounded bg-primary h-[40px] w-[40px] flex items-center justify-center text-primary-foreground">
              {COMPANY.title[0]}
            </div>
            <span className="hidden sm:block whitespace-nowrap">
              {COMPANY.title}
            </span>
          </Link>
          <div className="hidden sm:block max-w-screen-sm">
            <SearchBox />
          </div>
          <div className="flex gap-5 items-center justify-end">
            <Button
              onClick={() => {
                setIsSearchOpen((o) => !o);
              }}
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
            <AccountNavbarBlock />
          </div>
        </nav>
        {isSearchOpen && (
          <div className="mt-4 relative w-full sm:hidden">
            <SearchBox />
          </div>
        )}
      </div>
    </header>
  );
}
