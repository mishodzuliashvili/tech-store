import "server-only";
import { OrderData } from "./schema";
import db from "@/lib/db";

export async function paypalCreateOrderDB(orderID: string, data: OrderData) {
  switch (data.type) {
    case "buyProducts":
      const { userId, products } = data.data;
      await db.userPayment.create({
        data: {
          amount: products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          ),
          orderID,
          userId,
          paymentDetails: {
            create: products.map((product) => ({
              quantity: product.quantity,
              price: product.price,
              productId: product.productId,
            })),
          },
        },
      });
      break;
    default:
      break;
  }
}

export function getOrderPriceByData(data: OrderData) {
  switch (data.type) {
    case "buyProducts":
      return data.data.products
        .reduce((acc, product) => acc + product.price * product.quantity, 0)
        .toFixed(2);
    default:
      return "0";
  }
}
