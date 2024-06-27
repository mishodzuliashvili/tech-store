import getCurrentUser from "@/actions/user/current/get";
import { Button } from "@/components/ui/button";
import LoginWithGoogleButton from "@/components/ui/login-with-google-button";
import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import LogoutButton from "@/components/ui/logout-button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="container">
      <h3>{user?.givenName}</h3>
      <LoginWithGoogleButton>Loign with Google</LoginWithGoogleButton>
      <LogoutButton variant="secondary">Logout</LogoutButton>
    </main>
  );
}
