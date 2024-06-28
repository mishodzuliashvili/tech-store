import getCurrentUser from "@/actions/users/get-current-user";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import LogoutButton from "@/components/ui/logout-button";
import getThreeLevelCategoryTree from "@/actions/categories/get-three-level-category-tree";

export default async function Home() {
  const response = await getCurrentUser();

  if (response.success) {
    return (
      <main className="container">
        <h3>{response.data.givenName}</h3>
        <LogoutButton variant="secondary">Logout</LogoutButton>
      </main>
    );
  }

  // maybe get root categories and show them here
  const threeLevelCategoryTreeResponse = await getThreeLevelCategoryTree();

  if (!threeLevelCategoryTreeResponse.success) {
    return <main className="container">Categories not found</main>;
  }

  return (
    <main className="container">
      {/* <h1 className="text-lg font-bold mb-2">კატეგორია</h1> */}
      <NavigationMenuDemo categoryTree={threeLevelCategoryTreeResponse.data} />
      {/* in json format */}
      <pre>{JSON.stringify(threeLevelCategoryTreeResponse.data, null, 2)}</pre>
      {/* <LoginWithGoogleButton>Login with Google</LoginWithGoogleButton> */}
    </main>
  );
}
