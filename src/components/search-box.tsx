type SearchBoxProps = {};

export default function SearchBox({}: SearchBoxProps) {
  return (
    <form className="w-[300px] relative">
      <div className="relative w-full">
        <input
          type="search"
          className="block py-2.5 px-4 w-full z-20 placeholder-primary text-sm rounded-xl bg-primary-100"
          placeholder="Search tech..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 end-0 px-4 text-sm font-medium h-full text-primary"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}