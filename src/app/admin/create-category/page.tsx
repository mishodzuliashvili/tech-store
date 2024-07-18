import getAllCategories from "@/actions/categories/get-all-categories";
import { CreateCategoryForm } from "./form";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";

type CreateCategoryPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CreateCategoryPage({
  params,
  searchParams,
}: CreateCategoryPageProps) {
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
            name: "Create Category",
            url: "/admin/create-category",
          },
        ]}
      />
      <CreateCategoryForm allCategories={allCategories.data} />
    </div>
  );
}
