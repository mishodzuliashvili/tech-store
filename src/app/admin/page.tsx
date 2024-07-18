import db from "@/lib/db";
import RevenueChart from "./revenue-chart";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getCurrentUser from "@/actions/users/get-current-user";
import { notFound } from "next/navigation";

type AdminPageProps = {};

export default async function AdminPage({}: AdminPageProps) {
  const userResponse = await getCurrentUser();
  if (!userResponse.success) {
    notFound();
  }
  if (userResponse.data.role !== "ADMIN") {
    notFound();
  }

  const reveune =
    (
      await db.userPayment.aggregate({
        _sum: {
          amount: true,
        },
      })
    )._sum.amount || 0;

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const prevRevenue =
    (
      await db.userPayment.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          createdAt: {
            lte: oneDayAgo,
          },
        },
      })
    )._sum.amount || 0;

  const rawData = await db.userPayment.findMany({
    select: {
      createdAt: true,
      amount: true,
    },
  });

  const revenueByDates = rawData.reduce(
    (acc, payment) => {
      const _date = new Date(payment.createdAt);
      const date = `${_date.getUTCFullYear()}-${_date.getUTCDate()}`;

      if (!acc[date]) {
        acc[date] = { date, Revenue: 0 };
      }

      acc[date].Revenue += payment.amount;
      return acc;
    },
    {} as {
      [key: string]: {
        date: string;
        Revenue: number;
      };
    }
  );

  const groupedRevenue = Object.values(revenueByDates).toSorted((a, b) =>
    a.date > b.date ? 1 : -1
  );

  const topProducts = await db.product.findMany({
    take: 5,
    orderBy: {
      PaymentDetail: {
        _count: "desc",
      },
    },
    include: {
      PaymentDetail: true,
      images: true,
    },
  });

  return (
    <div className="container">
      <div></div>
      <div>
        <Breadcrumb
          path={[
            {
              id: 1,
              name: "Admin Dashboard",
              parentCategoryId: 0,
            },
          ]}
        />
        <article className="flex gap-4 justify-between items-start rounded-lg border-gray-300 border p-6">
          <div>
            <strong className="block text-sm font-medium "> Revenue </strong>

            <p>
              <span className=" font-semibold text-3xl">${reveune}</span>{" "}
              <span className="text-xs ">from ${prevRevenue}</span>
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="font-medium">
              {(((reveune - prevRevenue) / prevRevenue) * 100 - 100).toFixed(2)}
              %{" "}
            </span>
          </div>
        </article>
        <div className="mt-4 grid md:grid-cols-2 gap-4 items-start">
          <div>
            <div className="border border-gray-300 rounded-lg p-6">
              <RevenueChart data={groupedRevenue} />
            </div>
            <div className="mt-4 space-y-4">
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300"
              >
                <Link href="/admin/create-category">Add New Category</Link>
              </Button>
              <Button asChild variant="default" className="w-full">
                <Link href="/admin/create-product">Add New Product</Link>
              </Button>
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Products
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <li
                  key={product.id}
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <img
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                    src={
                      (product.images && product.images[0]?.url) ||
                      "/placeholder-image.jpg"
                    }
                    alt={product.title}
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Product ID: {product.id}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {product.PaymentDetail.length}
                    </span>
                    {/* <svg
                      className="w-4 h-4 ml-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
