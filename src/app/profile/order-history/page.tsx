import getCurrentUser from "@/actions/users/get-current-user";
import db from "@/lib/db";
import { notFound } from "next/navigation";

type OrderHistoryPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function OrderHistoryPage({
  params,
  searchParams,
}: OrderHistoryPageProps) {
  const user = await getCurrentUser();
  if (!user.success) notFound();

  const orders = await db.userPayment.findMany({
    where: {
      userId: user.data.id,
    },
    include: {
      paymentDetails: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  return (
    <section className="relative">
      <div className="">
        <h2 className="text-3xl font-bold mb-6">Payment History</h2>

        {orders.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center flex-wrap">
                <div>
                  <p className="font-semibold">
                    Order ID:{" "}
                    <span className="text-primary">{order.orderID}</span>
                  </p>
                  <p className=" mt-2">
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {order.paymentDetails.map((payment) => (
              <div
                key={payment.id}
                className="p-6 border-b flex items-center flex-wrap"
              >
                <img
                  src={payment.product.images[0]?.url}
                  alt={payment.product.title}
                  className="w-20 h-20 object-cover rounded-md mr-6"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-2">
                    {payment.product.title}
                  </h3>
                  <div className="flex justify-between items-center flex-wrap">
                    <p className="">
                      Price:{" "}
                      <span className="text-primary">${payment.price}</span>
                    </p>
                    <p className=" px-3 py-1 rounded-full text-sm">
                      Quantity: {payment.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-6 text-right">
              <p className="font-semibold text-lg">
                Total Price:{" "}
                <span className="text-primary">${order.amount.toFixed(2)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
