import Link from "next/link";

type FooterLinkSectionProps = {
  title: string;
  links: { name: string; href: string }[];
};

export default function FooterLinkSection({
  title,
  links,
}: FooterLinkSectionProps) {
  return (
    <div className="col-span-1">
      <h4 className="font-semibold">{title}</h4>
      <div className="mt-3 grid space-y-3">
        {links.map((link) => (
          <p key={link.name}>
            <Link href={link.href} className="inline-flex gap-x-2">
              {link.name}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
