import { Category } from "@prisma/client";

type CategoryLinkProps = {
  categories: Category[];
};

export default function CategoryLink({ categories }: CategoryLinkProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div key={category.id} className="p-4 border rounded-lg shadow-sm">
          <a href={`/category/${category.id}`} className="block text-center">
            <div className="mb-2 h-32 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for image */}
              <span className="text-gray-500">Image</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {category.name}
            </h2>
          </a>
        </div>
      ))}
    </div>
  );
}
