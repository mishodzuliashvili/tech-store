import ProductsCarousel from "@/components/products-carousel";
import { Hero } from "@/components/sections/hero";
import db from "@/lib/db";

export default async function Home() {
  const discountedProducts = await db.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    take: 5,
    include: {
      images: true,
      attributes: true,
    },
  });

  const newProducts = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      images: true,
      attributes: true,
    },
  });

  const notebooks = await db.product.findMany({
    where: {
      categoryId: 13,
    },
    take: 5,
    include: {
      images: true,
      attributes: true,
    },
  });

  return (
    <main className="container">
      <Hero />
      {/* <section className="mt-10">
        <div className="">
          <div className="max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Testimonials
            </h2>
            <p className="mb-8 font-light sm:text-xl">
              Explore the whole collection of open-source web components and
              elements built with the utility classes from Tailwind
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <figure className="flex flex-col justify-between items-start  border-gray-200  dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Speechless with how easy this was to integrate
                </h3>
                <p className="my-4">
                  {` "I recently got my hands on Flowbite Pro, and holy crap, I'm
                  speechless with how easy this was to integrate within my
                  application. Most templates are a pain, code is scattered, and
                  near impossible to theme.`}
                </p>
                <p className="my-4">
                  {` Flowbite has code in one place and I'm not joking when I say
                  it took me a matter of minutes to copy the code, customise it
                  and integrate within a Laravel + Vue application.`}
                </p>
                <p className="my-4">
                  {`                  If you care for your time, I hands down would go with this."
`}{" "}
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Bonnie Green</div>
                  <div className="text-sm font-light dark:text-gray-400">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col justify-between items-start  border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="mx-auto mb-8 max-w-2xl dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Solid foundation for any project
                </h3>
                <p className="my-4">
                  {` "FlowBite provides a robust set of design tokens and
                  components based on the popular Tailwind CSS framework. From
                  the most used UI components like forms and navigation bars to
                  the whole app screens designed both for desktop and mobile,
                  this UI kit provides a solid foundation for any project.`}
                </p>
                <p className="my-4">
                  {`Designing with Figma components that can be easily translated
                  to the utility classes of Tailwind CSS is a huge timesaver!"`}
                </p>
              </blockquote>
              <figcaption className="flex justify-center items-center space-x-3">
                <img
                  className="w-9 h-9 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left">
                  <div>Roberta Casas</div>
                  <div className="text-sm font-light dark:text-gray-400">
                    Lead designer at Dropbox
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section> */}
      {/* <section className="py-24 relative">
        <div className="">
          <div className="grid grid-cols-10 gap-8">
            <div
              className="col-span-10 lg:col-span-4 bg-cover bg-center h-[273px] rounded-xl flex flex-col justify-end p-6 lg:items-start items-center"
              style={{
                backgroundImage:
                  "url(https://pagedone.io/asset/uploads/1701234796.png)",
              }}
            >
              <h4 className="font-medium text-xl leading-8 text-white mb-4">
                Launch your business in Simple way
              </h4>
              <form className="form flex flex-col md:flex-row gap-4">
                <div className="flex items-center rounded-[100px] border border-gray-300 bg-transparent py-[10px] px-4 gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-gray-300"
                      d="M2.56636 5.05771L3.3574 4.93833L3.35732 4.93783L2.56636 5.05771ZM15.7966 18.2737L15.6263 19.0553L15.6268 19.0554L15.7966 18.2737ZM16.2599 13.7333L16.5447 12.9857H16.5447L16.2599 13.7333ZM7.22847 4.71562L6.47965 4.99715V4.99715L7.22847 4.71562ZM7.77827 6.93605L6.99182 6.78942L7.77827 6.93605ZM7.69133 5.94673L8.44016 5.66519L8.44016 5.66519L7.69133 5.94673ZM7.50947 10.0275L8.22992 9.6797L7.50947 10.0275ZM7.39174 9.00921L8.17819 9.15584L7.39174 9.00921ZM12.0495 13.5547L11.8973 12.7693L12.0495 13.5547ZM10.8746 13.3806L10.4858 14.0798L10.8746 13.3806ZM14.0123 13.1744L14.1645 13.9597L14.0123 13.1744ZM15.0221 13.2617L14.7372 14.0093L15.0221 13.2617ZM12.6309 1.60033C12.1923 1.54724 11.7936 1.85978 11.7406 2.2984C11.6875 2.73703 12 3.13565 12.4386 3.18874L12.6309 1.60033ZM17.437 8.10964C17.4969 8.54738 17.9004 8.85366 18.3381 8.79373C18.7758 8.7338 19.0821 8.33035 19.0222 7.89261L17.437 8.10964ZM12.4153 4.66728C11.9766 4.61499 11.5785 4.92825 11.5262 5.36697C11.4739 5.8057 11.7872 6.20374 12.2259 6.25604L12.4153 4.66728ZM14.372 8.36884C14.4311 8.80669 14.834 9.11371 15.2719 9.05457C15.7097 8.99543 16.0167 8.59254 15.9576 8.15469L14.372 8.36884ZM13.8601 12.389L11.8973 12.7693L12.2017 14.3401L14.1645 13.9597L13.8601 12.389ZM11.2634 12.6815C9.77612 11.8544 8.83849 10.9404 8.22992 9.6797L6.78902 10.3753C7.57402 12.0014 8.78472 13.1338 10.4858 14.0798L11.2634 12.6815ZM8.17819 9.15584L8.56471 7.08268L6.99182 6.78942L6.6053 8.86259L8.17819 9.15584ZM8.44016 5.66519L7.9773 4.43408L6.47965 4.99715L6.94251 6.22826L8.44016 5.66519ZM5.49821 2.71763H3.95597V4.31763H5.49821V2.71763ZM3.95597 2.71763C2.67168 2.71763 1.56701 3.80277 1.77539 5.1776L3.35732 4.93783C3.31141 4.63489 3.54293 4.31763 3.95597 4.31763V2.71763ZM1.77532 5.1771C2.09946 7.32491 3.06648 11.3313 5.97539 14.2402L7.10676 13.1088C4.56407 10.5661 3.66524 6.97816 3.3574 4.93833L1.77532 5.1771ZM5.97539 14.2402C9.00538 17.2702 13.3176 18.5524 15.6263 19.0553L15.9669 17.492C13.7373 17.0063 9.80222 15.8043 7.10676 13.1088L5.97539 14.2402ZM15.6268 19.0554C17.0475 19.364 18.2503 18.2434 18.2503 16.8833H16.6503C16.6503 17.3183 16.2987 17.5641 15.9664 17.4919L15.6268 19.0554ZM18.2503 16.8833V15.4607H16.6503V16.8833H18.2503ZM16.5447 12.9857L15.3069 12.5141L14.7372 14.0093L15.9751 14.4809L16.5447 12.9857ZM18.2503 15.4607C18.2503 15.1704 18.2514 14.8874 18.225 14.6494C18.1964 14.3915 18.1293 14.1116 17.9458 13.8454L16.6283 14.7533C16.6081 14.7238 16.6226 14.7165 16.6348 14.826C16.6491 14.9554 16.6503 15.1347 16.6503 15.4607H18.2503ZM15.9751 14.4809C16.2797 14.597 16.4469 14.6619 16.5627 14.7214C16.6607 14.7717 16.6486 14.7827 16.6283 14.7533L17.9458 13.8454C17.7623 13.5791 17.5247 13.4168 17.2939 13.2982C17.0809 13.1888 16.816 13.0891 16.5447 12.9857L15.9751 14.4809ZM7.9773 4.43408C7.87466 4.16108 7.77573 3.89469 7.66674 3.68043C7.54866 3.44829 7.3866 3.20908 7.11966 3.02426L6.20887 4.33973C6.17933 4.31928 6.19043 4.30713 6.24063 4.40583C6.29993 4.52241 6.36441 4.69065 6.47965 4.99715L7.9773 4.43408ZM5.49821 4.31763C5.82567 4.31763 6.00583 4.31878 6.13582 4.33326C6.24588 4.34552 6.23842 4.36019 6.20887 4.33973L7.11966 3.02426C6.85273 2.83945 6.57179 2.77193 6.31295 2.7431C6.07404 2.71649 5.78987 2.71763 5.49821 2.71763V4.31763ZM8.56471 7.08268C8.60382 6.87292 8.6574 6.62237 8.63455 6.36233L7.04069 6.50238C7.03944 6.48823 7.04226 6.4891 7.03653 6.53267C7.02961 6.5853 7.01678 6.65553 6.99182 6.78942L8.56471 7.08268ZM6.94251 6.22826C6.99044 6.35575 7.01532 6.42267 7.03131 6.47328C7.04456 6.51518 7.04193 6.51653 7.04069 6.50238L8.63455 6.36233C8.6117 6.10228 8.51525 5.86492 8.44016 5.66519L6.94251 6.22826ZM8.22992 9.6797C8.20345 9.62488 8.18387 9.58426 8.1674 9.54876C8.15121 9.51385 8.14177 9.49183 8.13578 9.4766C8.13023 9.46251 8.12882 9.45716 8.1288 9.45709C8.12876 9.45693 8.12883 9.45717 8.12889 9.45748C8.12895 9.45778 8.12883 9.45727 8.12861 9.45559L6.54267 9.66729C6.58224 9.96372 6.6988 10.1884 6.78902 10.3753L8.22992 9.6797ZM6.6053 8.86259C6.56274 9.09085 6.50257 9.36686 6.54267 9.66729L8.12861 9.45559C8.13008 9.46666 8.12713 9.46622 8.13191 9.42583C8.13824 9.37232 8.15117 9.30078 8.17819 9.15584L6.6053 8.86259ZM11.8973 12.7693C11.7306 12.8016 11.6452 12.8177 11.5814 12.8255C11.5309 12.8316 11.5304 12.8274 11.5456 12.8298L11.2938 14.4099C11.6255 14.4628 11.9406 14.3907 12.2017 14.3401L11.8973 12.7693ZM10.4858 14.0798C10.7032 14.2007 10.9642 14.3574 11.2938 14.4099L11.5456 12.8298C11.5551 12.8313 11.554 12.8343 11.5177 12.8175C11.4672 12.7942 11.401 12.758 11.2634 12.6815L10.4858 14.0798ZM14.1645 13.9597C14.3011 13.9333 14.3728 13.9197 14.4266 13.9123C14.4711 13.9061 14.472 13.9091 14.4575 13.9078L14.5954 12.3138C14.3298 12.2908 14.0741 12.3475 13.8601 12.389L14.1645 13.9597ZM15.3069 12.5141C15.1032 12.4365 14.8611 12.3368 14.5954 12.3138L14.4575 13.9078C14.443 13.9066 14.4444 13.9038 14.4872 13.9175C14.5389 13.934 14.6072 13.9598 14.7372 14.0093L15.3069 12.5141ZM12.4386 3.18874C15.1145 3.5126 17.0714 5.43918 17.437 8.10964L19.0222 7.89261C18.5579 4.50156 16.0288 2.01159 12.6309 1.60033L12.4386 3.18874ZM12.2259 6.25604C13.3789 6.39347 14.2166 7.21811 14.372 8.36884L15.9576 8.15469C15.7045 6.28104 14.2927 4.89105 12.4153 4.66728L12.2259 6.25604Z"
                      fill="#111827"
                    />
                  </svg>
                  <input
                    type="text"
                    name="text"
                    id=""
                    placeholder="Enter 10 digit here...."
                    className="w-3/5	outline-none border-none font-normal text-base py-[1px] text-gray-400 bg-transparent"
                  />
                </div>
                <button className="bg-indigo-600 rounded-[100px] py-[13px] px-6 font-semibold text-sm text-white whitespace-nowrap focus-within:outline-0 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                  Get Incentive
                </button>
              </form>
            </div>
            <div className="col-span-10 lg:col-span-6 w-full">
              <div className="box flex h-full justify-center flex-col">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black mb-14 lg:text-left text-center">
                  Best support for our client
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 w-full">
                  <div className="box flex flex-col items-center">
                    <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                      >
                        <path
                          d="M4.5 9.5V26C4.5 28.8284 4.5 30.2426 5.37868 31.1213C6.25736 32 7.67157 32 10.5 32H25.5C28.3284 32 29.7426 32 30.6213 31.1213C31.5 30.2426 31.5 28.8284 31.5 26V18.5C31.5 15.6716 31.5 14.2574 30.6213 13.3787C29.7426 12.5 28.3284 12.5 25.5 12.5H11.7426C10.0121 12.5 9.14685 12.5 8.34053 12.2702C7.89759 12.1439 7.47066 11.9671 7.06818 11.7431C6.3355 11.3355 5.72367 10.7237 4.5 9.5ZM4.5 9.5C4.5 8.10218 4.5 7.40326 4.72836 6.85195C5.03284 6.11687 5.61687 5.53284 6.35195 5.22836C6.90326 5 7.60218 5 9 5H24M27 22.25C27 23.4926 25.9926 24.5 24.75 24.5C23.5074 24.5 22.5 23.4926 22.5 22.25C22.5 21.0074 23.5074 20 24.75 20C25.9926 20 27 21.0074 27 22.25Z"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 w-[92px] text-center font-medium text-sm text-black">
                      {" "}
                      7* day Payment{" "}
                    </p>
                  </div>
                  <div className="box flex flex-col items-center">
                    <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                      >
                        <path
                          d="M8.88892 7.54889C13.6781 2.15037 22.3219 2.15037 27.1111 7.54889C30.963 11.8909 30.963 18.2981 27.1111 22.6401L19.8935 30.776C19.3805 31.3543 19.1241 31.6434 18.8418 31.7923C18.3172 32.0692 17.6828 32.0692 17.1582 31.7923C16.8759 31.6434 16.6195 31.3543 16.1065 30.776L8.88892 22.6401C5.03703 18.2981 5.03703 11.8909 8.88892 7.54889Z"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                        />
                        <path
                          d="M21.5122 14.2461C21.5122 16.1203 19.9397 17.6396 18 17.6396C16.0603 17.6396 14.4878 16.1203 14.4878 14.2461C14.4878 12.3719 16.0603 10.8526 18 10.8526C19.9397 10.8526 21.5122 12.3719 21.5122 14.2461Z"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 w-[92px] text-center font-medium text-sm text-black">
                      {" "}
                      Pan - India delivery{" "}
                    </p>
                  </div>
                  <div className="box flex flex-col items-center">
                    <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                      >
                        <path
                          d="M25.5 32L30.4923 24.5115C30.9925 23.7613 31.2426 23.3862 31.3713 22.961C31.5 22.5359 31.5 22.085 31.5 21.1833V14.75C31.5 13.5074 30.4926 12.5 29.25 12.5C28.0074 12.5 27 13.5074 27 14.75V19.5C27 20.4912 27 20.9868 26.846 21.4487C26.6921 21.9105 26.3947 22.307 25.8 23.1L24.75 24.5M10.5 32L5.5077 24.5115C5.00753 23.7613 4.75745 23.3862 4.62872 22.961C4.5 22.5359 4.5 22.085 4.5 21.1833V14.75C4.5 13.5074 5.50736 12.5 6.75 12.5C7.99264 12.5 9 13.5074 9 14.75V19.5C9 20.4912 9 20.9868 9.15395 21.4487C9.3079 21.9105 9.60527 22.307 10.2 23.1L11.25 24.5M21 32V26.1847C21 24.0551 21 22.9903 21.4479 22.2655C21.8244 21.656 22.4066 21.2015 23.0892 20.984C23.901 20.7253 24.184 20.9833 26.25 21.4998M15 32V26.1847C15 24.0551 15 22.9903 14.5521 22.2654C14.1756 21.656 13.5934 21.2014 12.9108 20.9839C12.099 20.7252 11.816 20.9833 9.75 21.4998M13.2744 11.1311L18.0141 15.8006L22.9612 10.9268M18 6.01298C19.3709 4.66234 21.5987 4.66234 22.9697 6.01298C24.3406 7.36806 24.3406 9.5584 22.9742 10.9135M17.9979 6.01298C16.6269 4.66234 14.3992 4.66234 13.0282 6.01298C11.6573 7.36361 11.6573 9.55839 13.0282 10.909M13.0282 10.909L13.0398 10.9204M13.0282 10.909L13.2717 11.1267"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 w-[92px] text-center font-medium text-sm text-black">
                      {" "}
                      500000+ Seller{" "}
                    </p>
                  </div>
                  <div className="box flex flex-col items-center">
                    <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                      >
                        <path
                          d="M30.8 26C30.8 25.5582 30.4418 25.2 30 25.2C29.5582 25.2 29.2 25.5582 29.2 26H30.8ZM6.8 26C6.8 25.5582 6.44183 25.2 6 25.2C5.55817 25.2 5.2 25.5582 5.2 26H6.8ZM7.5 10.3H28.5V8.7H7.5V10.3ZM30.7 12.5V18.5H32.3V12.5H30.7ZM5.3 18.5V12.5H3.7V18.5H5.3ZM28.5 20.7H21V22.3H28.5V20.7ZM15 20.7H7.5V22.3H15V20.7ZM3.7 18.5C3.7 20.5987 5.40132 22.3 7.5 22.3V20.7C6.28497 20.7 5.3 19.715 5.3 18.5H3.7ZM30.7 18.5C30.7 19.715 29.715 20.7 28.5 20.7V22.3C30.5987 22.3 32.3 20.5987 32.3 18.5H30.7ZM28.5 10.3C29.715 10.3 30.7 11.285 30.7 12.5H32.3C32.3 10.4013 30.5987 8.7 28.5 8.7V10.3ZM7.5 8.7C5.40132 8.7 3.7 10.4013 3.7 12.5H5.3C5.3 11.285 6.28497 10.3 7.5 10.3V8.7ZM29.2 26V29H30.8V26H29.2ZM27 31.2H9V32.8H27V31.2ZM6.8 29V26H5.2V29H6.8ZM9 31.2C7.78497 31.2 6.8 30.215 6.8 29H5.2C5.2 31.0987 6.90132 32.8 9 32.8V31.2ZM29.2 29C29.2 30.215 28.215 31.2 27 31.2V32.8C29.0987 32.8 30.8 31.0987 30.8 29H29.2ZM16.5 19.3H19.5V17.7H16.5V19.3ZM20.2 20V23H21.8V20H20.2ZM19.5 23.7H16.5V25.3H19.5V23.7ZM15.8 23V20H14.2V23H15.8ZM16.5 23.7C16.1134 23.7 15.8 23.3866 15.8 23H14.2C14.2 24.2703 15.2297 25.3 16.5 25.3V23.7ZM20.2 23C20.2 23.3866 19.8866 23.7 19.5 23.7V25.3C20.7703 25.3 21.8 24.2703 21.8 23H20.2ZM19.5 19.3C19.8866 19.3 20.2 19.6134 20.2 20H21.8C21.8 18.7297 20.7703 17.7 19.5 17.7V19.3ZM16.5 17.7C15.2297 17.7 14.2 18.7297 14.2 20H15.8C15.8 19.6134 16.1134 19.3 16.5 19.3V17.7ZM15 5.8H21V4.2H15V5.8ZM21.7 6.4997V8.35742H23.3V6.4997H21.7ZM14.3 8.35742V6.4997H12.7V8.35742H14.3ZM21 5.8C21.3868 5.8 21.7 6.11331 21.7 6.4997H23.3C23.3 5.22924 22.27 4.2 21 4.2V5.8ZM15 4.2C13.73 4.2 12.7 5.22924 12.7 6.4997H14.3C14.3 6.11331 14.6132 5.8 15 5.8V4.2Z"
                          fill="#4F46E5"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 w-[92px] text-center font-medium text-sm text-black">
                      {" "}
                      Account Management{" "}
                    </p>
                  </div>
                  <div className="box flex flex-col items-center">
                    <button className="rounded-full p-3 flex items-center justify-center mx-auto bg-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-50 hover:shadow-indigo-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="37"
                        viewBox="0 0 36 37"
                        fill="none"
                      >
                        <path
                          d="M27 5V9.71405M27 5H21.9785M27 5L15.0389 15.6321C14.5876 16.0332 14.362 16.2338 14.1198 16.3311C13.7326 16.4867 13.298 16.4739 12.9205 16.2958C12.6845 16.1845 12.471 15.971 12.0441 15.5441C11.5939 15.0939 11.3688 14.8688 11.1218 14.7563C10.7268 14.5763 10.2732 14.5763 9.87819 14.7563C9.63123 14.8688 9.40613 15.0939 8.95592 15.5441L6 18.5M6 32H9C9.82843 32 10.5 31.3284 10.5 30.5V26C10.5 25.1716 9.82843 24.5 9 24.5H6C5.17157 24.5 4.5 25.1716 4.5 26V30.5C4.5 31.3284 5.17157 32 6 32ZM16.5 32H19.5C20.3284 32 21 31.3284 21 30.5V21.5C21 20.6716 20.3284 20 19.5 20H16.5C15.6716 20 15 20.6716 15 21.5V30.5C15 31.3284 15.6716 32 16.5 32ZM27 32H30C30.8284 32 31.5 31.3284 31.5 30.5V15.5C31.5 14.6716 30.8284 14 30 14H27C26.1716 14 25.5 14.6716 25.5 15.5V30.5C25.5 31.3284 26.1716 32 27 32Z"
                          stroke="#4F46E5"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 w-[92px] text-center font-medium text-sm text-black">
                      {" "}
                      100+ Startups{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <ProductsCarousel
        title="Discounted Products"
        products={discountedProducts}
      />
      <ProductsCarousel title="News" products={newProducts} />
      {/* <ProductsCarousel title="Notebooks" products={notebooks} /> */}
    </main>
  );
}
