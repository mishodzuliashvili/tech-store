export default function Features() {
  return (
    <div className="pt-10">
      <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-6">
            <div className="col-span-4">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80"
                alt="Image Description"
              />
            </div>

            <div className="col-span-3">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="Image Description"
              />
            </div>

            <div className="col-span-5">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="Image Description"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-10 lg:col-span-5 lg:mt-0">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-3xl font-bold text-gray-800 lg:text-4xl">
                Discover the Latest Tech
              </h2>
              <p className="">
                Explore our curated selection of cutting-edge technology for
                your home and office.
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-4">
              <li className="flex space-x-3">
                <span className="text-primary bg-primary/10 mt-0.5 flex size-5 items-center justify-center rounded-full">
                  <svg
                    className="size-3.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span className="text-sm  sm:text-base">
                  <span className="font-bold">Save time</span> – more flexible
                </span>
              </li>

              <li className="flex space-x-3">
                <span className="text-primary bg-primary/10 mt-0.5 flex size-5 items-center justify-center rounded-full">
                  <svg
                    className="size-3.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span className="text-sm  sm:text-base">A lot of Tech</span>
              </li>

              <li className="flex space-x-3">
                <span className="text-primary bg-primary/10 mt-0.5 flex size-5 items-center justify-center rounded-full">
                  <svg
                    className="size-3.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span className="text-sm  sm:text-base">
                  Spend money <span className="font-bold">efficiently</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
