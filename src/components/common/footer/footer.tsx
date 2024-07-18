import FooterLogo from "./footer-logo";
import FooterLinkSection from "./footer-link-section";
import FooterCopyright from "./footer-copyright";
import SocialLinks from "./social-links";
import { PRODUCT_LINKS, COMPANY_LINKS } from "@/constants/footer";

export default function Footer() {
  return (
    <footer className="text-sm">
      <div className="container py-10 lg:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
          <FooterLogo />
          <FooterLinkSection title="Product" links={PRODUCT_LINKS} />
          <FooterLinkSection title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
          <FooterCopyright />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
