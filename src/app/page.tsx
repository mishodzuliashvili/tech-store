import getThreeLevelCategoryTree from "@/actions/categories/get-three-level-category-tree";
import { CategoryMenu } from "./category-menu";

export default async function Home() {
  const threeLevelCategoryTreeResponse = await getThreeLevelCategoryTree();

  if (!threeLevelCategoryTreeResponse.success) {
    return <main className="container">Categories not found</main>;
  }

  return (
    <main className="container">
      <CategoryMenu categoryTree={threeLevelCategoryTreeResponse.data} />
    </main>
  );
}
