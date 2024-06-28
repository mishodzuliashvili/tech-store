import COMPANY from "@/constants/company";
import SearchBox from "./search-box";

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
  return (
    <header className="flex flex-wrap w-full bg-white text-sm py-4">
      <div className="container">
        <nav className="w-full sm:flex sm:items-center gap-5">
          <div className="flex items-center justify-between">
            <a
              className="inline-flex w-[240px] items-center gap-x-2 text-xl font-semibold"
              href="#"
            >
              <div className="rounded bg-primary h-[40px] w-[40px] flex items-center justify-center text-white">
                {COMPANY.title[0]}
              </div>
              <span className="whitespace-nowrap">{COMPANY.title}</span>
            </a>
          </div>
          <div className="w-full">
            <SearchBox />
          </div>
          <div className="hidden overflow-hidden transition-all duration-300 sm:block">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-primary"
                href="#"
                aria-current="page"
              >
                Landing
              </a>
              <a className="font-medium" href="#">
                Account
              </a>
              <a className="font-medium" href="#">
                Work
              </a>
              <a className="font-medium" href="#">
                Blog
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
