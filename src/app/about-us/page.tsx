import Link from "next/link";
import Image from "next/image";
import { FEATURES } from "@/constants/about-us";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";

type AboutUsPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function AboutUsPage({
  params,
  searchParams,
}: AboutUsPageProps) {
  return (
    <div className="container">
      <Breadcrumb
        path={[
          {
            id: 1,
            name: "About Us",
            parentCategoryId: null,
          },
        ]}
      />
      <section className="overflow-hidden bg-white ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <AboutUsContent />
          <AboutUsImage />
        </div>
      </section>
    </div>
  );
}

function AboutUsContent() {
  return (
    <div className="lg:pr-8 lg:pt-4">
      <div className="lg:max-w-lg">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          Your Tech Partner
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cutting-Edge Tech Store
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {`  We're your one-stop shop for all the latest and greatest in
          technology, offering a curated selection of high-quality devices and
          gadgets.`}
        </p>
        <FeatureList />
      </div>
      <CallToAction />
    </div>
  );
}

function FeatureList() {
  return (
    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
      {FEATURES.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </dl>
  );
}

function FeatureItem({ icon: Icon, title, description }: any) {
  return (
    <div className="relative pl-9">
      <dt className="inline font-semibold text-gray-900">
        <Icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
        {title}
      </dt>
      <dd className="inline"> {description}</dd>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="mt-10 flex items-center gap-x-6">
      <Button asChild>
        <Link href="/contact-us">Contact Us</Link>
      </Button>
    </div>
  );
}

function AboutUsImage() {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Tech store showcase"
        className="w-[48rem] h-[700px] object-cover max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
        width={2432}
        height={1442}
      />
    </div>
  );
}
