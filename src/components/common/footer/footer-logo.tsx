import Link from "next/link";
import COMPANY from "@/constants/company";

export default function FooterLogo() {
  return (
    <div className="col-span-full lg:col-span-1">
      <Link
        href="/"
        className="flex-none text-xl font-semibold"
        aria-label="Brand"
      >
        {COMPANY.title}
      </Link>
    </div>
  );
}
