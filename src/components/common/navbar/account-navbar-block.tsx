"use client";
import { FiLogIn, FiUser } from "react-icons/fi";
import LoginWithGoogleButton from "../../ui/login-with-google-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type AccountNavbarBlockProps = {
  isUserAdmin?: boolean;
};

export default function AccountNavbarBlock({
  isUserAdmin,
}: AccountNavbarBlockProps) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon">
        <AiOutlineLoading3Quarters className="animate-spin" size={22} />
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="outline-none">
            <FiUser size={22} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999]" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/profile`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          {isUserAdmin && (
            <Link href={`/admin`}>
              <DropdownMenuItem>Admin</DropdownMenuItem>
            </Link>
          )}
          <Link href={`/api/auth/logout`}>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <LoginWithGoogleButton variant="ghost" size="icon">
        <FiLogIn size={22} />
      </LoginWithGoogleButton>
    );
  }
}
