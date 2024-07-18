import Link from "next/link";
import { Button, ButtonProps } from "./button";

type LoginWithGoogleButtonProps = Omit<ButtonProps, "asChild" | "children"> & {
  children?: React.ReactNode;
};

export default function LoginWithGoogleButton({
  children,
  ...props
}: LoginWithGoogleButtonProps) {
  return (
    <Button {...props} asChild>
      <Link
        href={`/api/auth/register?connection_id=${process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE}`}
      >
        {children}
      </Link>
    </Button>
  );
}
