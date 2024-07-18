import Link from "next/link";
import COMPANY from "@/constants/company";

export default function Logo() {
  return (
    <Link className="flex items-center gap-x-2 text-xl font-semibold" href="/">
      <div className="rounded bg-primary h-[40px] w-[40px] flex items-center justify-center text-primary-foreground">
        {COMPANY.title[0]}
      </div>
      <span className="hidden sm:block whitespace-nowrap">{COMPANY.title}</span>
    </Link>
  );
}
