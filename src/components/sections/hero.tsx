import Link from "next/link";
import getThreeLevelCategoryTree from "@/actions/categories/get-three-level-category-tree";
import { FEATURED_PRODUCTS } from "@/constants/products";
import { CategoryMenu } from "@/components/category-menu";
import getAllCategories from "@/actions/categories/get-all-categories";
import db from "@/lib/db";

export async function Hero() {
  const threeLevelCategoryTreeResponse = await getThreeLevelCategoryTree();

  if (!threeLevelCategoryTreeResponse.success) {
    return <main className="container">Categories not found</main>;
  }

  return (
    <>
      <Header />
      <CategoryMenu categoryTree={threeLevelCategoryTreeResponse.data} />
      <ProductSection />
    </>
  );
}

function Header() {
  return (
    <header className="py-8 pb-5">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Discover the Latest Tech
      </h1>
      <p className="mt-4 max-w-3xl">
        Explore our curated selection of cutting-edge technology for your home
        and office.
      </p>
    </header>
  );
}

function ProductSection() {
  return (
    <div className="pt-5">
      <ProductSectionHeader />
      <ProductGrid />
    </div>
  );
}

function ProductSectionHeader() {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
        Different Categories
      </h2>
      <p className="mt-1 text-gray-600">
        See our curated selection of products from different categories
      </p>
    </div>
  );
}

async function ProductGrid() {
  const products = await db.product.findMany({
    include: {
      images: true,
      category: true,
    },
    distinct: ["categoryId"],
    take: 3,
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          imageUrl={product.images[0]?.url}
          link={`/category/${product.categoryId}`}
          linkText="View Category"
          title={product.category.name}
        />
      ))}
    </div>
  );
}

function ProductCard({
  imageUrl,
  title,
  linkText,
  link,
}: {
  imageUrl: string;
  title: string;
  linkText: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="group rounded-xl transition border-2 p-5 group"
    >
      <div>
        <img
          className="w-full h-[300px] object-cover rounded-xl group-hover:scale-105 duration-200"
          src={imageUrl}
          alt={title}
        />
      </div>
      <h3 className="mt-5 text-xl text-gray-800">{title}</h3>
      <p className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800">
        {linkText}
        <ArrowIcon />
      </p>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
