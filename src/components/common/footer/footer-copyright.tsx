import COMPANY from "@/constants/company";

export default function FooterCopyright() {
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm">
        © {new Date().getFullYear()} {COMPANY.title}. All rights reserved.
      </p>
    </div>
  );
}
