import { SOCIAL_LINKS } from "@/constants/footer";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div>
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.name}
          className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
          href={link.href}
          aria-label={link.name}
        >
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d={link.icon} />
          </svg>
        </Link>
      ))}
    </div>
  );
}
