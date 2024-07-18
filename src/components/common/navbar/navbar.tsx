"use client";
import { useState } from "react";
import useIsMounted from "@/hooks/use-is-mounted";
import Logo from "./navbar-logo";
import SearchBox from "./search-box";
import NavbarActions from "./navbar-actions";

export default function Navbar({ isUserAdmin }: { isUserAdmin?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <header className="flex flex-wrap w-full bg-white text-sm py-6">
      <div className="container bg-white">
        <nav className="flex justify-between sm:grid sm:grid-cols-[240px,1fr,auto] items-center gap-5">
          <Logo />
          <div className="hidden sm:block max-w-screen-sm">
            <SearchBox />
          </div>
          <NavbarActions
            isUserAdmin={isUserAdmin}
            onSearchClick={() => setIsSearchOpen((o) => !o)}
          />
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
