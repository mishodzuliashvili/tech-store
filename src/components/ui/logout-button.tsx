import Link from "next/link";
import { Button, ButtonProps } from "./button";

type LoginWithGoogleButtonProps = Omit<ButtonProps, "asChild" | "children"> & {
  children?: React.ReactNode;
};

export default function LogoutButton({
  children,
  ...props
}: LoginWithGoogleButtonProps) {
  return (
    <Button {...props} asChild>
      <Link href={`/api/auth/logout`}>{children}</Link>
    </Button>
  );
}
