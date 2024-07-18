"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {};

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      <li>
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-primary-100",
            {
              "bg-primary-100 text-primary": pathname === "/profile",
            }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="text-sm font-medium"> General </span>
        </Link>
      </li>

      <li>
        <Link
          href="/profile/order-history"
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-primary-100",
            {
              "bg-primary-100 text-primary":
                pathname === "/profile/order-history",
            }
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>

          <span className="text-sm font-medium"> Order History </span>
        </Link>
      </li>
    </ul>
  );
}
