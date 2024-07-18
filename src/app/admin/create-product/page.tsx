import getAllCategories from "@/actions/categories/get-all-categories";
import { CreateProductForm } from "./form";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";

type CreateProductPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CreateProductPage({
  params,
  searchParams,
}: CreateProductPageProps) {
  const allCategories = await getAllCategories();

  if (!allCategories.success) {
    notFound();
  }

  return (
    <div className="container">
      <Breadcrumb
        urls={[
          {
            name: "Admin",
            url: "/admin",
          },
          {
            name: "Create Product",
            url: "/admin/create-product",
          },
        ]}
      />
      <CreateProductForm allCategories={allCategories.data} />
    </div>
  );
}
