import getCurrentUser from "@/actions/users/get-current-user";
import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const res = await getCurrentUser();
  if (!res.success) {
    notFound();
  }

  return (
    <div className="container grid md:grid-cols-[200px,1fr] pt-6 gap-6">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
