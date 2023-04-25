import { type Order } from "~/models/Order";
import { makeGetRequest } from ".";
import { getProduct } from "./products";
import { type Product } from "~/models/Product";

interface InternalOrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface InternalOrder {
  id: string;
  date: string;
  status: string;
}

export async function getOrderInternalProducts(
  orderId: string
): Promise<InternalOrderProduct[]> {
  const response = await makeGetRequest<InternalOrderProduct[]>(
    `/orders/${orderId}/products`
  );

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error("Failed to fetch order products");
}

export async function getOrderProducts(orderId: string): Promise<Product[]> {
  return Promise.all(
    (await getOrderInternalProducts(orderId)).map(async (internalProduct) => {
      const product = await getProduct(internalProduct.id);
      return {
        ...product,
        name: internalProduct.name,
        price: internalProduct.price,
        quantity: internalProduct.quantity,
      } as Product;
    })
  );
}

export async function getOrders(): Promise<Order[]> {
  const response = await makeGetRequest<InternalOrder[]>("/orders");

  if (response.status === 200 && response.data) {
    return Promise.all(
      response.data.map(
        async (order) =>
          ({
            ...order,
            products: await getOrderProducts(order.id),
          } as Order)
      )
    );
  }

  throw new Error("Failed to fetch orders");
}
