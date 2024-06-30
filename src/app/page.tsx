import getCurrentUser from "@/actions/users/get-current-user";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import LogoutButton from "@/components/ui/logout-button";
import getThreeLevelCategoryTree from "@/actions/categories/get-three-level-category-tree";
import LoginWithGoogleButton from "@/components/ui/login-with-google-button";

export default async function Home() {
  const response = await getCurrentUser();

  const threeLevelCategoryTreeResponse = await getThreeLevelCategoryTree();

  if (!threeLevelCategoryTreeResponse.success) {
    return <main className="container">Categories not found</main>;
  }

  return (
    <main className="container">
      <NavigationMenuDemo categoryTree={threeLevelCategoryTreeResponse.data} />
    </main>
  );
}
